"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { useSession, signOut } from "next-auth/react";
import { ShieldCheck, Search, Map, Headset, Globe, UserCircle, LogOut } from 'lucide-react';

export function Navbar() {
    const locale = useLocale();
    const t = useTranslations();
    const pathname = usePathname();
    const router = useRouter();
    
    const setLanguage = (lang: string) => {
        router.replace(pathname, { locale: lang });
    };

    const { data: session, status } = useSession();
    
    const isLoggedIn = status === "authenticated";

    const handleSignOut = async () => {
        await signOut({ redirect: false });
        router.push('/login');
    };

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="bg-emerald-600 text-white p-1.5 rounded-lg">
                                <ShieldCheck className="h-6 w-6" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-bold tracking-tight text-gray-900 leading-tight">
                                    {t('home.title')}
                                </span>
                                <span className="text-[10px] text-gray-500 font-medium leading-tight hidden sm:block">{t('nav.govIndia')}</span>
                            </div>
                        </Link>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-4">
                        <Link href="/schemes" className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-emerald-700 transition-colors px-3 py-1.5 rounded-md hover:bg-emerald-50">
                            <Search className="h-4 w-4" />
                            {t('nav.findSchemes')}
                        </Link>

                        <Link href="/states" className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-emerald-700 transition-colors px-3 py-1.5 rounded-md hover:bg-emerald-50">
                            <Map className="h-4 w-4" />
                            {t('nav.byState')}
                        </Link>

                        <Link href="/support" className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-emerald-700 transition-colors px-3 py-1.5 rounded-md hover:bg-emerald-50">
                            <Headset className="h-4 w-4" />
                            {t('nav.support')}
                        </Link>

                        <div className="relative flex items-center gap-1.5 bg-gray-50 rounded-lg p-1 border border-gray-200">
                            <Globe className="h-4 w-4 text-gray-500 ml-2" />
                            <select
                                value={locale}
                                onChange={(e) => setLanguage(e.target.value as any)}
                                className="bg-transparent text-sm font-medium text-gray-700 border-none focus:ring-0 py-1 pr-6 cursor-pointer"
                            >
                                <option value="en">English</option>
                                <option value="hi">हिंदी</option>
                                <option value="ta">தமிழ்</option>
                                <option value="te">తెలుగు</option>
                            </select>
                        </div>

                        {status === "loading" ? (
                            <div className="w-20 h-8 bg-gray-200 animate-pulse rounded-lg"></div>
                        ) : !isLoggedIn ? (
                            <Link href="/login" className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-lg transition-colors shadow-sm">
                                {t('nav.signIn')}
                            </Link>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link href="/profile" className="p-2 text-gray-500 hover:text-emerald-600 transition-colors flex items-center gap-2 bg-emerald-50 rounded-lg hover:bg-emerald-100">
                                    <UserCircle className="h-5 w-5" />
                                    <span className="hidden sm:inline font-medium text-sm text-emerald-700">{session?.user?.name || t('nav.profile')}</span>
                                </Link>
                                <button onClick={handleSignOut} className="p-2 text-gray-500 hover:text-red-600 transition-colors flex items-center gap-2 hover:bg-red-50 rounded-lg" title="Sign Out">
                                    <LogOut className="h-5 w-5" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
