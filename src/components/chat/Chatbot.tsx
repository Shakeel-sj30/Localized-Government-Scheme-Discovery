"use client";

import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Mic, MicOff } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

type Message = { id: string; role: 'user' | 'ai'; content: string };

export function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const t = useTranslations();
  const language = useLocale();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const getMockResponse = (query: string) => {
        const q = query.toLowerCase();
        if (q.includes('farmer') || q.includes('kisan') || q.includes('விவசாயி') || q.includes('రైతు') || q.includes('किसान')) {
            return "Farmers can apply for PM Kisan Samman Nidhi. It provides ₹6000 per year. You need Aadhaar and Land proof to apply. Would you like me to open the application form?";
        }
        if (q.includes('student') || q.includes('scholarship') || q.includes('छात्र') || q.includes('உதவித்தொகை')) {
            return "Students from minority/backward classes can apply for National Scholarship Portal (NSP). You need your previous year marksheet and an income certificate.";
        }
        if (q.includes('women') || q.includes('female') || q.includes('maternity') || q.includes('महिला')) {
            return "Pregnant women can get ₹5000 under PM Matru Vandana Yojana for their first child.";
        }
        return "I am the Localized Government Scheme Discovery assistant. I can help answer questions about government schemes like PM Kisan, Scholarships, and Stand-Up India. How can I help you today?";
    };

    const handleSendAction = (text: string) => {
        if (!text.trim()) return;

        const newMsg: Message = { id: Date.now().toString(), role: 'user', content: text };
        setMessages(prev => [...prev, newMsg]);
        setInput('');
        setIsListening(false);

        setTimeout(() => {
            const reply = getMockResponse(text);
            setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'ai', content: reply }]);
        }, 1000);
    };

    const handleSend = () => {
        handleSendAction(input);
    };

    const startListening = () => {
        if (typeof window === 'undefined') return;

        // @ts-ignore
        const SpeechRecognitionApi = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognitionApi) {
            alert("Your browser doesn't support speech recognition. Please use Google Chrome or Edge.");
            return;
        }

        const recognition = new SpeechRecognitionApi();

        recognition.lang = language === 'en' ? 'en-IN' : language === 'hi' ? 'hi-IN' : language === 'ta' ? 'ta-IN' : 'te-IN';
        recognition.continuous = false;
        recognition.interimResults = true; // Show words as they are spoken

        recognition.onstart = () => {
            setIsListening(true);
            setErrorMsg('');
            setInput(''); // Clear input when starting to listen
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognition.onerror = (e: any) => {
            setIsListening(false);
            if (e.error === 'not-allowed') {
                setErrorMsg("Microphone disabled.");
            } else if (e.error === 'network') {
                setErrorMsg("Voice recognition block (check VPN/browser).");
            } else {
                setErrorMsg(`Mic error: ${e.error}`);
            }
        };

        recognition.onresult = (event: any) => {
            let interimText = '';
            let finalText = '';

            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    finalText += event.results[i][0].transcript;
                } else {
                    interimText += event.results[i][0].transcript;
                }
            }

            if (finalText) {
                setInput(finalText);
                setTimeout(() => handleSendAction(finalText), 300);
            } else {
                setInput(interimText);
            }
        };

        try {
            recognition.start();
        } catch (e) {
            console.error("Failed to start speech recognition:", e);
        }
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isOpen]);

    useEffect(() => {
        const handleOpenVoice = () => {
            setIsOpen(true);
            setTimeout(() => {
                startListening();
            }, 300); // Small delay to let UI open before requesting mic
        };
        window.addEventListener('open-chatbot-voice', handleOpenVoice);
        return () => window.removeEventListener('open-chatbot-voice', handleOpenVoice);
    });

    return (
        <>
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 bg-emerald-600 text-white p-4 rounded-full shadow-2xl hover:bg-emerald-700 hover:scale-105 transition-transform z-50 flex items-center justify-center"
                >
                    <MessageCircle className="h-8 w-8" />
                </button>
            )}

            {isOpen && (
                <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col z-50 overflow-hidden text-gray-900">
                    <div className="bg-emerald-600 p-4 text-white flex justify-between items-center shadow-sm">
                        <h3 className="font-bold flex items-center gap-2 text-lg">
                            <MessageCircle className="h-5 w-5" /> Scheme Discovery Assistant
                        </h3>
                        <button onClick={() => setIsOpen(false)} className="hover:bg-emerald-700 p-1.5 rounded-full transition-colors"><X className="h-5 w-5" /></button>
                    </div>

                    <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
                        {messages.length === 0 && (
                            <div className="text-center text-gray-500 mt-10 space-y-4">
                                <p>Hello! Ask me about government schemes.</p>
                                <button onClick={startListening} className="mt-4 flex flex-col items-center justify-center mx-auto text-emerald-600 hover:text-emerald-800 transition-colors">
                                    <div className="p-4 bg-emerald-100 rounded-full mb-2">
                                        <Mic className="h-8 w-8" />
                                    </div>
                                    <span className="text-sm font-medium">Tap mic to speak</span>
                                </button>
                            </div>
                        )}
                        {messages.map((m) => (
                            <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] rounded-2xl p-3 ${m.role === 'user' ? 'bg-emerald-600 text-white rounded-tr-sm' : 'bg-gray-200 text-gray-800 rounded-tl-sm'}`}>
                                    {m.content}
                                </div>
                            </div>
                        ))}
                        {errorMsg && (
                            <div className="flex justify-center">
                                <span className="bg-red-100 text-red-600 text-xs py-1 px-3 rounded-full">{errorMsg}</span>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="p-3 bg-white border-t border-gray-200 flex items-center gap-2">
                        <button
                            onClick={startListening}
                            className={`p-2.5 rounded-full transition-colors ${isListening ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                        >
                            {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                        </button>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Ask anything..."
                            className="flex-1 bg-gray-100 rounded-full px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                        />
                        <button
                            onClick={handleSend}
                            disabled={!input.trim()}
                            className="p-2.5 bg-emerald-600 text-white rounded-full disabled:opacity-50 hover:bg-emerald-700 transition-colors"
                        >
                            <Send className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
