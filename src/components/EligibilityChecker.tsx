"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { schemes, Scheme } from '@/data/schemes';
import { statesAndUTs } from '@/data/states';
import { ChevronRight, Filter, Search, Award, Mic, MicOff, Sparkles, Send } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eligibilitySchema, EligibilityFormData } from "@/lib/validations/eligibility";

declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
    }
}

export default function EligibilityChecker() {
    const t = useTranslations();
  const language = useLocale();
    
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors }
    } = useForm<EligibilityFormData>({
        resolver: zodResolver(eligibilitySchema),
        defaultValues: {
            age: '',
            gender: 'All',
            occupation: 'All',
            income: '',
            category: 'All',
            state: 'All'
        }
    });

    const currentFormValues = watch();

    const [results, setResults] = useState<Scheme[] | null>(null);
    const [isListening, setIsListening] = useState(false);
    const [smartInput, setSmartInput] = useState('');
    const recognitionRef = useRef<any>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

            if (SpeechRecognition) {
                try {
                    recognitionRef.current = new SpeechRecognition();
                    recognitionRef.current.continuous = false;
                    recognitionRef.current.interimResults = true;
                    recognitionRef.current.lang = 'en-IN';

                    recognitionRef.current.onresult = (event: any) => {
                        let finalTranscript = '';
                        let interimTranscript = '';

                        for (let i = event.resultIndex; i < event.results.length; i++) {
                            const transcript = event.results[i][0].transcript;
                            if (event.results[i].isFinal) {
                                finalTranscript += transcript;
                            } else {
                                interimTranscript += transcript;
                            }
                        }

                        if (finalTranscript || interimTranscript) {
                            setSmartInput(prev => {
                                const newText = finalTranscript ?
                                    (prev ? prev + ' ' + finalTranscript : finalTranscript) :
                                    (prev ? prev : interimTranscript);

                                if (finalTranscript) {
                                    processSmartInput(newText);
                                }
                                return newText;
                            });
                        }
                    };

                    recognitionRef.current.onerror = (event: any) => {
                        console.error("Speech recognition error:", event.error);
                        if (event.error === 'not-allowed') {
                            setIsListening(false);
                            alert("Microphone access was denied. Please allow microphone permissions in your browser URL bar.");
                        } else if (event.error === 'network') {
                            setIsListening(false);
                            alert("Network issue detected with Speech Recognition. Please check your internet connection or try typing.");
                        } else if (event.error === 'no-speech') {
                            console.log("No speech detected, continuing to listen if not aborted...");
                        } else if (event.error === 'aborted') {
                            setIsListening(false);
                        } else {
                            setIsListening(false);
                            console.log(`Microphone stopped due to: ${event.error}`);
                        }
                    };

                    recognitionRef.current.onend = () => {
                        setIsListening(false);
                    };
                } catch (e) {
                    console.error("Error initializing speech recognition:", e);
                }
            }
        }

        return () => {
            if (recognitionRef.current) {
                try {
                    recognitionRef.current.stop();
                } catch (e) { }
            }
        };
    }, []);

    const toggleListening = () => {
        if (isListening) {
            if (recognitionRef.current) {
                try {
                    recognitionRef.current.stop();
                } catch (e) { }
            }
            setIsListening(false);
        } else {
            if (recognitionRef.current) {
                try {
                    setSmartInput('');
                    recognitionRef.current.start();
                    setIsListening(true);
                } catch (e) {
                    console.error("Error starting recognition", e);
                    setIsListening(false);
                    alert("Could not start microphone. Please try again or ensure no other tab is using it.");
                }
            } else {
                alert("Speech recognition is not supported in this browser. Please use Google Chrome or Microsoft Edge, or try typing.");
            }
        }
    };

    const handleSmartInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSmartInput(e.target.value);
    };

    const handleSmartInputSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        processSmartInput(smartInput);
    };

    const [isProcessing, setIsProcessing] = useState(false);

    const processSmartInput = async (text: string) => {
        if (!text.trim()) return;
        
        setIsProcessing(true);
        try {
            const res = await fetch('/api/smart-parse', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ transcript: text })
            });
            
            if (res.ok) {
                const parsedData = await res.json();
                
                // Update form values with AI extracted data
                if (parsedData.age !== undefined && parsedData.age !== "") {
                    setValue("age", String(parsedData.age), { shouldValidate: true });
                }
                if (parsedData.gender && ["Male", "Female", "Other", "All"].includes(parsedData.gender)) {
                    setValue("gender", parsedData.gender as any);
                }
                if (parsedData.occupation && parsedData.occupation !== "") {
                    setValue("occupation", parsedData.occupation);
                }
                if (parsedData.income !== undefined && parsedData.income !== "") {
                    setValue("income", String(parsedData.income), { shouldValidate: true });
                }
                if (parsedData.category && ["General", "SC", "ST", "OBC", "Minority", "All"].includes(parsedData.category)) {
                    setValue("category", parsedData.category as any);
                }
                if (parsedData.state && parsedData.state !== "All" && parsedData.state !== "") {
                    // Try to match the state string
                    const matchedState = statesAndUTs.find(s => 
                        s.name.toLowerCase().includes(parsedData.state.toLowerCase()) || 
                        parsedData.state.toLowerCase().includes(s.name.toLowerCase())
                    );
                    if (matchedState) {
                        setValue("state", matchedState.name);
                    }
                }

                // Automatically trigger search after form fills
                setTimeout(() => {
                    handleSubmit(performCheck)();
                }, 300);
            } else {
                console.error("Smart parse API error:", await res.text());
                alert("Smart Search is currently unavailable or API key is missing. Please type manually.");
            }
        } catch (error) {
            console.error("Failed to process smart input:", error);
            alert("Connection error while processing Smart Search.");
        } finally {
            setIsProcessing(false);
        }
    };

    const performCheck = (data: EligibilityFormData) => {
        const ageNum = parseInt(data.age || '');
        const hasAge = !isNaN(ageNum) && data.age?.trim() !== '';
        const incomeNum = parseInt(data.income || '');
        const hasIncome = !isNaN(incomeNum) && data.income?.trim() !== '';

        const matched = schemes.filter(scheme => {
            if (hasAge) {
                if (scheme.eligibility.minAge && ageNum < scheme.eligibility.minAge) return false;
                if (scheme.eligibility.maxAge && ageNum > scheme.eligibility.maxAge) return false;
            }

            if (data.gender !== 'All' && scheme.eligibility.gender && scheme.eligibility.gender !== 'All' && scheme.eligibility.gender !== data.gender) {
                return false;
            }

            if (data.occupation !== 'All' && !scheme.eligibility.occupations.includes('All') && !scheme.eligibility.occupations.includes(data.occupation)) {
                return false;
            }

            if (hasIncome && scheme.eligibility.maxIncome && incomeNum > scheme.eligibility.maxIncome) {
                return false;
            }

            if (data.category !== 'All' && !scheme.eligibility.categories.includes('All') && !scheme.eligibility.categories.includes(data.category)) {
                return false;
            }

            if (data.state !== 'All' && !scheme.eligibility.states.includes('All') && !scheme.eligibility.states.includes(data.state)) {
                return false;
            }

            return true;
        });

        setResults(matched);
    };

    return (
        <div className="bg-gradient-to-br from-indigo-50 to-blue-100 rounded-2xl border border-blue-200 p-6 sm:p-8 mt-12 mb-12 shadow-sm">
            <div className="mb-8">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-emerald-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -z-10 opacity-70"></div>

                    <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="h-5 w-5 text-emerald-500" />
                        <h3 className="text-lg font-bold text-gray-900">Smart Search</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                        Type or speak sentences about yourself (e.g. "I am a 25 year old female farmer from Maharashtra making 2 lakhs a year"). We will auto-fill the form!
                    </p>

                    <form onSubmit={handleSmartInputSubmit} className="flex gap-2">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                value={smartInput}
                                onChange={handleSmartInputChange}
                                placeholder="Describe yourself to find schemes..."
                                className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50/50"
                            />
                            <button
                                type="button"
                                onClick={toggleListening}
                                className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-colors ${isListening ? 'bg-red-100 text-red-600 animate-pulse' : 'hover:bg-gray-200 text-gray-500'
                                    }`}
                                title={isListening ? "Stop listening" : "Start typing by voice"}
                            >
                                {isListening ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
                            </button>
                        </div>
                        <button
                            type="submit"
                            disabled={isProcessing}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 rounded-xl transition-colors font-medium flex items-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
                        >
                            {isProcessing ? (
                                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <Send className="h-4 w-4" /> 
                            )}
                            <span className="hidden sm:inline">{isProcessing ? "Processing..." : "Process"}</span>
                        </button>
                    </form>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/3 space-y-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="p-2 bg-blue-600 rounded-lg text-white">
                                <Filter className="h-5 w-5" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">Eligibility Filters</h2>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(performCheck)} className="space-y-4 bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                            <Input
                                type="number"
                                {...register("age")}
                                placeholder="e.g. 25"
                                min="0"
                                max="120"
                                className={`w-full ${errors.age ? 'border-red-500' : ''} ${smartInput && currentFormValues.age ? 'border-emerald-300 bg-emerald-50' : ''}`}
                            />
                            {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                            <select
                                {...register("gender")}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 ${errors.gender ? 'border-red-500' : ''} ${smartInput && currentFormValues.gender !== 'All' ? 'border-emerald-300 bg-emerald-50' : 'border-gray-300 bg-white'}`}
                            >
                                <option value="All">All / Prefer not to say</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                            {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Occupation</label>
                            <select
                                {...register("occupation")}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 ${errors.occupation ? 'border-red-500' : ''} ${smartInput && currentFormValues.occupation !== 'All' ? 'border-emerald-300 bg-emerald-50' : 'border-gray-300 bg-white'}`}
                            >
                                <option value="All">Any</option>
                                <option value="Farmer">Farmer</option>
                                <option value="Student">Student</option>
                                <option value="Business">Business</option>
                                <option value="Unemployed">Unemployed</option>
                            </select>
                            {errors.occupation && <p className="text-red-500 text-xs mt-1">{errors.occupation.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Annual Income (₹)</label>
                            <Input
                                type="number"
                                {...register("income")}
                                placeholder="e.g. 250000"
                                min="0"
                                className={`w-full ${errors.income ? 'border-red-500' : ''} ${smartInput && currentFormValues.income ? 'border-emerald-300 bg-emerald-50' : ''}`}
                            />
                            {errors.income && <p className="text-red-500 text-xs mt-1">{errors.income.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select
                                {...register("category")}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 ${errors.category ? 'border-red-500' : ''} ${smartInput && currentFormValues.category !== 'All' ? 'border-emerald-300 bg-emerald-50' : 'border-gray-300 bg-white'}`}
                            >
                                <option value="All">General / All</option>
                                <option value="SC">SC</option>
                                <option value="ST">ST</option>
                                <option value="OBC">OBC</option>
                                <option value="Minority">Minority</option>
                            </select>
                            {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">State / UT</label>
                            <select
                                {...register("state")}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 ${errors.state ? 'border-red-500' : ''} ${smartInput && currentFormValues.state !== 'All' ? 'border-emerald-300 bg-emerald-50' : 'border-gray-300 bg-white'}`}
                            >
                                <option value="All">All States (Central Schemes)</option>
                                {statesAndUTs.map((state: any) => (
                                    <option key={state.id} value={state.name}>{state.name}</option>
                                ))}
                            </select>
                            {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>}
                        </div>

                        <button
                            id="check-eligibility-btn"
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow transition-colors flex justify-center items-center gap-2 mt-2"
                        >
                            <Search className="w-5 h-5" />
                            Check Eligibility
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                reset();
                                setSmartInput('');
                                setResults(null);
                            }}
                            className="w-full text-gray-500 font-medium py-2 hover:underline text-sm"
                        >
                            Clear Filters
                        </button>
                    </form>
                </div>

                <div className="w-full md:w-2/3">
                    {results === null ? (
                        <div className="h-full min-h-[400px] flex flex-col items-center justify-center bg-white/50 border border-blue-200/50 rounded-2xl border-dashed p-6">
                            <Award className="w-16 h-16 text-blue-300 mb-4" />
                            <h3 className="text-xl font-semibold text-gray-700">Ready to find your schemes</h3>
                            <p className="text-gray-500 text-center max-w-sm mt-2">
                                Use the <span className="font-semibold text-emerald-600 outline-emerald-100">Smart Search</span> above to type or speak your details, or manually fill out the form on the left.
                            </p>
                        </div>
                    ) : results.length > 0 ? (
                        <div className="space-y-4">
                            <div className="flex justify-between items-end mb-2">
                                <h3 className="text-lg font-bold text-gray-900">
                                    <span className="text-blue-600">{results.length}</span> schemes found for you
                                </h3>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[700px] overflow-y-auto pr-2 pb-4 scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent">
                                {results.map(scheme => (
                                    <Link href={`/schemes/${scheme.id}`} key={scheme.id}>
                                        <div className="bg-white border border-gray-200 hover:border-blue-400 rounded-xl overflow-hidden cursor-pointer h-full transition-all hover:shadow-md">
                                            <div className="bg-blue-600 px-3 py-1.5 flex justify-between items-center">
                                                <span className="text-blue-50 text-[10px] font-bold uppercase tracking-wider">{scheme.category}</span>
                                                <span className="bg-white/20 text-white text-[10px] px-2 py-0.5 rounded-full">Match</span>
                                            </div>
                                            <div className="p-4 space-y-2">
                                                <h4 className="font-bold text-gray-900 text-sm leading-snug line-clamp-2" title={scheme.title[language as keyof typeof scheme.title]}>
                                                    {scheme.title[language as keyof typeof scheme.title]}
                                                </h4>
                                                <div className="pt-2 flex items-center justify-between mt-auto">
                                                    <span className="text-emerald-700 font-bold text-xs bg-emerald-50 border border-emerald-100 px-2 py-1 rounded-md line-clamp-1 truncate max-w-[140px]" title={scheme.benefitsAmount[language as keyof typeof scheme.benefitsAmount]}>
                                                        {scheme.benefitsAmount[language as keyof typeof scheme.benefitsAmount]}
                                                    </span>
                                                    <ChevronRight className="h-4 w-4 text-blue-400" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="h-full min-h-[400px] flex flex-col items-center justify-center bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                            <div className="p-4 bg-gray-50 rounded-full mb-4">
                                <Search className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-700">No matching schemes</h3>
                            <p className="text-gray-500 text-center max-w-sm mt-2">
                                We couldn't find any schemes matching those exact criteria. Try adjusting your income limit or changing categories to see more options.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
