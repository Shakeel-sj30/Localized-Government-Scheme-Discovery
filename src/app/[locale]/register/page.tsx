"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from '@/i18n/routing';
import { ShieldCheck, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterFormData } from "@/lib/validations/auth";

export default function RegisterPage() {
    const router = useRouter();
    const t = useTranslations();
    const language = useLocale();
    const isHi = language === 'hi';
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: '',
            mobile: '',
            password: '',
            confirmPassword: ''
        }
    });

    const onSubmit = async (data: RegisterFormData) => {
        setError('');
        setIsLoading(true);

        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: data.name,
                    phone: data.mobile,
                    password: data.password,
                }),
            });

            if (res.ok) {
                // Redirect to login after successful registration
                // (NextAuth signIn removed to fix build error)
                router.push('/login');
            } else {
                const resData = await res.json();
                setError(resData.message || (isHi ? 'पंजीकरण विफल' : 'Registration failed'));
                setIsLoading(false);
            }
        } catch (err) {
            setError(isHi ? 'कुछ गलत हो गया' : 'Something went wrong');
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Panel - Branding */}
            <div className="hidden lg:flex lg:w-1/2 hero-gradient text-white flex-col justify-center items-center p-12 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-300 rounded-full blur-3xl"></div>
                </div>
                <div className="relative z-10 text-center space-y-8 max-w-md">
                    <div className="flex items-center justify-center gap-3">
                        <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                            <ShieldCheck className="h-10 w-10" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight">Localized Government Scheme Discovery</h1>
                    <p className="text-emerald-100 text-lg leading-relaxed">
                        {isHi ? 'लाखों नागरिकों के साथ जुड़ें जो अपने लिए पात्र सरकारी योजनाएँ खोज रहे हैं।' : 'Join millions of citizens discovering government schemes they are eligible for.'}
                    </p>
                    <div className="grid grid-cols-3 gap-4 pt-4">
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                            <p className="text-2xl font-bold">10+</p>
                            <p className="text-xs text-emerald-200 mt-1">Schemes</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                            <p className="text-2xl font-bold">4</p>
                            <p className="text-xs text-emerald-200 mt-1">Languages</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                            <p className="text-2xl font-bold">36</p>
                            <p className="text-xs text-emerald-200 mt-1">States</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Panel - Register Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
                <div className="w-full max-w-md space-y-8">
                    <div className="lg:hidden flex items-center justify-center gap-2 mb-4">
                        <div className="bg-emerald-600 text-white p-2 rounded-lg">
                            <ShieldCheck className="h-6 w-6" />
                        </div>
                        <span className="text-xl font-bold text-gray-900">Localized Government Scheme Discovery</span>
                    </div>

                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-extrabold text-gray-900">{isHi ? 'खाता बनाएं' : 'Create Account'}</h2>
                        <p className="text-gray-500 mt-2">{isHi ? 'पात्र योजनाएँ खोजने के लिए रजिस्टर करें' : 'Register to discover eligible schemes'}</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium border border-red-200">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-gray-700">{isHi ? 'पूरा नाम' : 'Full Name'}</label>
                            <input
                                type="text"
                                placeholder={isHi ? 'अपना पूरा नाम दर्ज करें' : 'Enter your full name'}
                                {...register("name")}
                                className={`w-full px-4 py-3.5 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 text-sm bg-white transition-colors`}
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-gray-700">{isHi ? 'मोबाइल नंबर' : 'Mobile Number'}</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium text-sm">+91</span>
                                <input
                                    type="tel"
                                    maxLength={10}
                                    placeholder={isHi ? '10 अंकों का मोबाइल नंबर दर्ज करें' : 'Enter 10-digit mobile number'}
                                    {...register("mobile")}
                                    className={`w-full pl-14 pr-4 py-3.5 border ${errors.mobile ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 text-sm bg-white transition-colors`}
                                />
                            </div>
                            {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile.message}</p>}
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-gray-700">{isHi ? 'पासवर्ड' : 'Password'}</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder={isHi ? 'पासवर्ड बनाएं' : 'Create a password'}
                                    {...register("password")}
                                    className={`w-full px-4 py-3.5 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 text-sm bg-white pr-12 transition-colors`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-gray-700">{isHi ? 'पासवर्ड की पुष्टि करें' : 'Confirm Password'}</label>
                            <input
                                type="password"
                                placeholder={isHi ? 'अपना पासवर्ड पुनः दर्ज करें' : 'Confirm your password'}
                                {...register("confirmPassword")}
                                className={`w-full px-4 py-3.5 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 text-sm bg-white transition-colors`}
                            />
                            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-emerald-200 mt-2"
                        >
                            {isLoading ? (
                                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <>{isHi ? 'खाता बनाएं' : 'Create Account'} <ArrowRight className="h-4 w-4" /></>
                            )}
                        </button>
                    </form>

                    <div className="text-center">
                        <p className="text-sm text-gray-500">
                            {isHi ? 'पहले से खाता है?' : 'Already have an account?'}{' '}
                            <Link href="/login" className="text-emerald-600 hover:text-emerald-700 font-semibold">
                                {isHi ? 'साइन इन' : 'Sign In'}
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
