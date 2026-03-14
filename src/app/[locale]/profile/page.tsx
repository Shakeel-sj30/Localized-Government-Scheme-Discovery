"use client";

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Card, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { buildDigiLockerAuthUrl } from '@/lib/digilocker';
import { CheckCircle2, ShieldCheck, Loader2, LogOut, UploadCloud, FileText } from 'lucide-react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema, ProfileFormData } from "@/lib/validations/profile";

function ProfileForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const t = useTranslations();
    const language = useLocale();
    const digiLockerStatus = searchParams.get('digilocker');
    
    const [isOcrProcessing, setIsOcrProcessing] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors }
    } = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: '',
            age: '',
            gender: 'All',
            occupation: 'All',
            income: '',
            state: 'All',
            district: '',
            category: 'All',
            digilockerVerified: false,
            digilockerVerifiedAt: '',
            digilockerReferenceId: ''
        }
    });

    const isVerified = watch('digilockerVerified');
    const verifiedAt = watch('digilockerVerifiedAt');
    const referenceId = watch('digilockerReferenceId');

    useEffect(() => {
        const saved = localStorage.getItem('yojana_profile');
        if (saved) {
            const parsed = JSON.parse(saved);
            Object.keys(parsed).forEach((key) => {
                setValue(key as keyof ProfileFormData, parsed[key]);
            });
        }
    }, [setValue]);

    const onSubmit = (data: ProfileFormData) => {
        localStorage.setItem('yojana_profile', JSON.stringify(data));
        alert(language === 'hi' ? 'प्रोफाइल सफलतापूर्वक सेव हो गई। अब हम आपके लिए पात्र योजनाएँ दिखाएंगे।' : 'Profile saved successfully! We will use this to find eligible schemes for you.');
        router.push('/schemes');
    };

    const handleDigiLockerVerify = () => {
        const state = Math.random().toString(36).slice(2);
        const url = buildDigiLockerAuthUrl(window.location.origin, state);
        window.location.href = url;
    };

    const handleSignOut = () => {
        if (window.confirm(language === 'hi' ? 'क्या आप वाकई साइन आउट करना चाहते हैं?' : 'Are you sure you want to sign out?')) {
            localStorage.removeItem('yojana_logged_in');
            localStorage.removeItem('yojana_user_mobile');
            localStorage.removeItem('yojana_profile');
            window.dispatchEvent(new Event('yojana_auth_change'));
            router.push('/login');
        }
    };

    const handleDocumentUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsOcrProcessing(true);
        try {
            const formData = new FormData();
            formData.append('file', file);

            const res = await fetch('/api/ocr', {
                method: 'POST',
                body: formData
            });

            if (res.ok) {
                const data = await res.json();
                if (data.parsed) {
                    const { name, age, gender, state } = data.parsed;
                    if (name) setValue("name", name, { shouldValidate: true });
                    if (age) setValue("age", String(age), { shouldValidate: true });
                    if (gender && ["Male", "Female", "Other", "All"].includes(gender)) setValue("gender", gender as any);
                    if (state && state !== "All") setValue("state", state);
                    alert(language === 'hi' ? 'दस्तावेज़ से जानकारी निकाल ली गई है।' : 'Details extracted from document!');
                } else {
                    alert(language === 'hi' ? 'दस्तावेज़ से जानकारी नहीं मिली।' : 'Could not extract details securely. Is GEMINI_API_KEY set?');
                }
            } else {
                alert('OCR Failed');
            }
        } catch (error) {
            console.error(error);
            alert('Error processing document');
        } finally {
            setIsOcrProcessing(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-gray-900">{language === 'hi' ? 'आपकी प्रोफाइल' : 'Your Profile'}</h1>
                    <p className="text-gray-600">{language === 'hi' ? 'अपनी जानकारी भरें ताकि हम आपके लिए सर्वोत्तम योजनाएँ खोज सकें।' : 'Enter your details so we can find the best schemes for you.'}</p>
                </div>
                <Button variant="ghost" type="button" onClick={handleSignOut} className="text-red-600 hover:text-red-700 hover:bg-red-50 flex items-center gap-2">
                    <LogOut className="h-4 w-4" /> {language === 'hi' ? 'साइन आउट' : 'Sign Out'}
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="h-full">
                    <CardContent className="p-4 flex items-start gap-4 h-full border border-emerald-200 bg-emerald-50 rounded-lg">
                        <div className="flex-1">
                            <h2 className="text-base font-bold text-emerald-900 flex items-center gap-2">
                                <ShieldCheck className="h-5 w-5" /> {language === 'hi' ? 'डिजीलॉकर सत्यापन' : 'DigiLocker Verification'}
                            </h2>
                            <p className="text-xs text-emerald-800 mt-1 mb-3">
                                {language === 'hi' ? 'तेज़ आवेदन प्रक्रिया के लिए डिजीलॉकर के माध्यम से पहचान दस्तावेज सत्यापित करें।' : 'Verify identity documents through DigiLocker.'}
                            </p>
                            {isVerified && (
                                <div className="mt-2 text-xs text-emerald-700">
                                    {language === 'hi' ? 'सत्यापित' : 'Verified'}{verifiedAt ? ` ${language === 'hi' ? 'तिथि' : 'on'} ${new Date(verifiedAt).toLocaleString()}` : ''}
                                </div>
                            )}
                            <div className="mt-auto">
                                {isVerified ? (
                                    <span className="inline-flex items-center gap-1 text-xs font-semibold bg-green-100 text-green-800 px-2.5 py-1 rounded-full">
                                        <CheckCircle2 className="h-3.5 w-3.5" /> Verified
                                    </span>
                                ) : (
                                    <Button variant="primary" type="button" className="w-full" onClick={handleDigiLockerVerify}>{language === 'hi' ? 'सत्यापित करें' : 'Verify with DigiLocker'}</Button>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="h-full">
                    <CardContent className="p-4 flex items-start gap-4 h-full border border-blue-200 bg-blue-50 rounded-lg">
                        <div className="flex-1">
                            <h2 className="text-base font-bold text-blue-900 flex items-center gap-2">
                                <FileText className="h-5 w-5" /> {language === 'hi' ? 'दस्तावेज़ स्कैन करें' : 'Autofill via Document'}
                            </h2>
                            <p className="text-xs text-blue-800 mt-1 mb-3">
                                {language === 'hi' ? 'आधार या पैन कार्ड अपलोड करके फॉर्म अपने आप भरें।' : 'Upload Aadhaar or PAN to magically extract and fill details.'}
                            </p>
                            
                            <div className="mt-auto">
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    className="hidden" 
                                    ref={fileInputRef} 
                                    onChange={handleDocumentUpload} 
                                />
                                <Button 
                                    variant="outline" 
                                    type="button" 
                                    className="w-full bg-white border-blue-300 text-blue-700 hover:bg-blue-100 flex items-center gap-2" 
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={isOcrProcessing}
                                >
                                    {isOcrProcessing ? (
                                        <><Loader2 className="h-4 w-4 animate-spin" /> Processing...</>
                                    ) : (
                                        <><UploadCloud className="h-4 w-4" /> {language === 'hi' ? 'अपलोड करें' : 'Upload Document'}</>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Card>
                    <CardContent className="space-y-4 pt-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{language === 'hi' ? 'पूरा नाम' : 'Full Name'}</label>
                            <Input 
                                {...register("name")} 
                                placeholder={language === 'hi' ? 'उदा. राहुल कुमार' : 'e.g. Rahul Kumar'} 
                                className={errors.name ? 'border-red-500' : ''} 
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{language === 'hi' ? 'उम्र' : 'Age'}</label>
                                <Input 
                                    type="number" 
                                    {...register("age")} 
                                    placeholder={language === 'hi' ? 'उदा. 35' : 'e.g. 35'} 
                                    className={errors.age ? 'border-red-500' : ''} 
                                />
                                {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{language === 'hi' ? 'लिंग' : 'Gender'}</label>
                                <select
                                    {...register("gender")}
                                    className="block w-full rounded-lg border-gray-300 border shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2 bg-white"
                                >
                                    <option value="All">{language === 'hi' ? 'न बताना चाहें' : 'Prefer not to say'}</option>
                                    <option value="Male">{language === 'hi' ? 'पुरुष' : 'Male'}</option>
                                    <option value="Female">{language === 'hi' ? 'महिला' : 'Female'}</option>
                                </select>
                                {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{language === 'hi' ? 'पेशा' : 'Occupation'}</label>
                            <select
                                {...register("occupation")}
                                className="block w-full rounded-lg border-gray-300 border shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2 bg-white"
                            >
                                <option value="All">{language === 'hi' ? 'कोई भी / नहीं' : 'Any / None'}</option>
                                <option value="Farmer">{language === 'hi' ? 'किसान' : 'Farmer'}</option>
                                <option value="Student">{language === 'hi' ? 'छात्र' : 'Student'}</option>
                                <option value="Business">{language === 'hi' ? 'व्यवसायी' : 'Business Owner'}</option>
                                <option value="Unemployed">{language === 'hi' ? 'बेरोजगार' : 'Unemployed'}</option>
                            </select>
                            {errors.occupation && <p className="text-red-500 text-xs mt-1">{errors.occupation.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{language === 'hi' ? 'वार्षिक आय (₹)' : 'Annual Income (₹)'}</label>
                            <Input 
                                type="number" 
                                {...register("income")} 
                                placeholder={language === 'hi' ? 'उदा. 150000' : 'e.g. 150000'}
                                className={errors.income ? 'border-red-500' : ''} 
                            />
                            {errors.income && <p className="text-red-500 text-xs mt-1">{errors.income.message}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{language === 'hi' ? 'राज्य' : 'State'}</label>
                                <select
                                    {...register("state")}
                                    className="block w-full rounded-lg border-gray-300 border shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2 bg-white"
                                >
                                    <option value="All">{language === 'hi' ? 'सभी राज्य' : 'All States'}</option>
                                    <option value="Tamil Nadu">Tamil Nadu</option>
                                    <option value="Maharashtra">Maharashtra</option>
                                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                                    <option value="Delhi">Delhi</option>
                                </select>
                                {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{language === 'hi' ? 'सामाजिक श्रेणी' : 'Social Category'}</label>
                                <select
                                    {...register("category")}
                                    className="block w-full rounded-lg border-gray-300 border shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2 bg-white"
                                >
                                    <option value="All">{language === 'hi' ? 'सामान्य' : 'General'}</option>
                                    <option value="SC">SC</option>
                                    <option value="ST">ST</option>
                                    <option value="OBC">OBC</option>
                                    <option value="Minority">Minority</option>
                                </select>
                                {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{language === 'hi' ? 'जिला (वैकल्पिक)' : 'District (Optional)'}</label>
                            <Input 
                                {...register("district")} 
                                placeholder={language === 'hi' ? 'उदा. पुणे, चेन्नई, हैदराबाद' : 'e.g. Pune, Chennai, Hyderabad'}
                                className={errors.district ? 'border-red-500' : ''} 
                            />
                            {errors.district && <p className="text-red-500 text-xs mt-1">{errors.district.message}</p>}
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-3">
                        <Button variant="ghost" type="button" onClick={() => router.back()}>{t('btn.cancel')}</Button>
                        <Button variant="primary" type="submit">{t('btn.saveContinue')}</Button>
                    </CardFooter>
                </Card>
            </form>
        </div>
    );
}

export default function ProfilePage() {
    return (
        <Suspense fallback={
            <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
                <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
                <p className="text-gray-500">Loading profile data...</p>
            </div>
        }>
            <ProfileForm />
        </Suspense>
    );
}
