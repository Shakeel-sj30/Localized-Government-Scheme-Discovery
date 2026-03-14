"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Scheme, SchemeCategory } from '@/data/schemes';
import { useLocale, useTranslations } from 'next-intl';
import { Filter, ChevronRight, FileText, Search, X, Sparkles, MapPin } from 'lucide-react';

export default function SchemeListClient({ initialSchemes }: { initialSchemes: Scheme[] }) {
    const t = useTranslations();
  const language = useLocale();
    const searchParams = useSearchParams();
    const categoryParam = searchParams.get('category');
    const searchParam = searchParams.get('search');

    const [filteredSchemes, setFilteredSchemes] = useState<Scheme[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'all' | SchemeCategory>('all');
    const [filterGender, setFilterGender] = useState('All');
    const [filterCategory, setFilterCategory] = useState('All');
    const [filterOccupation, setFilterOccupation] = useState('All');
    const [filterStatus, setFilterStatus] = useState('active');
    const [searchText, setSearchText] = useState(searchParam || '');
    const [eligibleSchemes, setEligibleSchemes] = useState<Scheme[]>([]);
    const [hasProfile, setHasProfile] = useState(false);
    const [profileName, setProfileName] = useState('');
    const [profileState, setProfileState] = useState('');

    useEffect(() => {
        if (categoryParam) {
            setActiveTab(categoryParam as SchemeCategory);
        }
    }, [categoryParam]);

    useEffect(() => {
        const profileData = localStorage.getItem('yojana_profile');
        let userProfile: any = null;
        if (profileData) {
            userProfile = JSON.parse(profileData);
            setHasProfile(true);
            setProfileName(userProfile.name || '');
            setProfileState(userProfile.state || '');
        } else {
            setHasProfile(false);
            setProfileName('');
            setProfileState('');
        }

        const isEligibleByProfile = (scheme: Scheme, profile: any) => {
            if (!profile) return false;

            if (profile.age && scheme.eligibility.minAge && parseInt(profile.age) < scheme.eligibility.minAge) return false;
            if (profile.age && scheme.eligibility.maxAge && parseInt(profile.age) > scheme.eligibility.maxAge) return false;
            if (profile.income && scheme.eligibility.maxIncome && parseInt(profile.income) > scheme.eligibility.maxIncome) return false;
            if (profile.income && scheme.eligibility.minIncome && parseInt(profile.income) < scheme.eligibility.minIncome) return false;

            if (profile.gender && scheme.eligibility.gender && scheme.eligibility.gender !== 'All' && scheme.eligibility.gender !== profile.gender) return false;
            if (profile.occupation && profile.occupation !== 'All' && !scheme.eligibility.occupations.includes('All') && !scheme.eligibility.occupations.includes(profile.occupation)) return false;
            if (profile.category && profile.category !== 'All' && !scheme.eligibility.categories.includes('All') && !scheme.eligibility.categories.includes(profile.category)) return false;

            if (profile.state && profile.state !== 'All' && !scheme.eligibility.states.includes('All') && !scheme.eligibility.states.includes(profile.state)) return false;
            if (profile.district && scheme.eligibility.districts && scheme.eligibility.districts.length > 0 && !scheme.eligibility.districts.includes(profile.district)) return false;

            if (scheme.status !== 'active') return false;
            return true;
        };

        const matchedEligible = initialSchemes.filter((scheme) => isEligibleByProfile(scheme, userProfile)).slice(0, 8);
        setEligibleSchemes(matchedEligible);

        let matched = initialSchemes.filter(scheme => {
            if (filterStatus !== 'all' && scheme.status !== filterStatus) return false;
            if (activeTab !== 'all' && scheme.category !== activeTab) return false;

            if (searchText.trim()) {
                const q = searchText.toLowerCase();
                const titleMatch = Object.values(scheme.title).some((v: any) => v.toLowerCase().includes(q));
                const descMatch = Object.values(scheme.shortDescription).some((v: any) => v.toLowerCase().includes(q));
                if (!titleMatch && !descMatch) return false;
            }

            if (filterGender !== 'All' && scheme.eligibility.gender && scheme.eligibility.gender !== 'All' && scheme.eligibility.gender !== filterGender) return false;
            if (filterCategory !== 'All' && !scheme.eligibility.categories.includes('All') && !scheme.eligibility.categories.includes(filterCategory)) return false;
            if (filterOccupation !== 'All' && !scheme.eligibility.occupations.includes('All') && !scheme.eligibility.occupations.includes(filterOccupation)) return false;

            if (userProfile) {
                if (userProfile.age && scheme.eligibility.minAge && parseInt(userProfile.age) < scheme.eligibility.minAge) return false;
                if (userProfile.age && scheme.eligibility.maxAge && parseInt(userProfile.age) > scheme.eligibility.maxAge) return false;
                if (userProfile.income && scheme.eligibility.maxIncome && parseInt(userProfile.income) > scheme.eligibility.maxIncome) return false;
                if (userProfile.state && userProfile.state !== 'All' && !scheme.eligibility.states.includes('All') && !scheme.eligibility.states.includes(userProfile.state)) return false;
                if (userProfile.district && scheme.eligibility.districts && scheme.eligibility.districts.length > 0 && !scheme.eligibility.districts.includes(userProfile.district)) return false;
            }

            return true;
        });

        setFilteredSchemes(matched);
        setLoading(false);
    }, [activeTab, searchText, filterGender, filterCategory, filterOccupation, filterStatus, initialSchemes]);

    const clearFilters = () => {
        setFilterGender('All');
        setFilterCategory('All');
        setFilterOccupation('All');
        setFilterStatus('active');
        setSearchText('');
        setActiveTab('all');
    };

    if (loading) {
        return <div className="flex justify-center p-12"><div className="animate-spin h-8 w-8 border-4 border-emerald-600 border-t-transparent rounded-full"></div></div>;
    }

    const tabs = [
        { id: 'all' as const, label: t('schemes.all') },
        { id: 'farmer' as const, label: 'Farmer' },
        { id: 'student' as const, label: 'Student' },
        { id: 'women' as const, label: 'Women' },
        { id: 'business' as const, label: 'Business' },
        { id: 'health' as const, label: 'Health' },
        { id: 'housing' as const, label: 'Housing' },
        { id: 'financial' as const, label: 'Financial' },
        { id: 'employment' as const, label: 'Employment' },
        { id: 'infrastructure' as const, label: 'Infrastructure' },
    ];

    return (
        <div className="max-w-6xl mx-auto">
            {/* Search Header */}
            <div className="bg-emerald-600 -mx-4 sm:-mx-6 lg:-mx-8 -mt-8 px-6 py-8">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-2xl font-bold text-white mb-4">{t('schemes.title')}</h1>
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            placeholder={t('schemes.searchPlaceholder')}
                            className="w-full pl-12 pr-10 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-300 text-sm"
                        />
                        {searchText && (
                            <button onClick={() => setSearchText('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                <X className="h-4 w-4" />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 bg-white -mx-4 sm:-mx-6 lg:-mx-8 px-6">
                <div className="flex gap-0 overflow-x-auto">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-5 py-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${activeTab === tab.id
                                ? 'border-emerald-600 text-emerald-700'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Eligible For You */}
            <div className="mt-6 bg-white rounded-xl border border-emerald-200 overflow-hidden">
                <div className="px-5 py-4 bg-emerald-50 border-b border-emerald-100 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-emerald-600" />
                        <h2 className="text-lg font-bold text-emerald-900">Eligible For You</h2>
                    </div>
                    {profileState && profileState !== 'All' && (
                        <span className="text-xs font-semibold text-emerald-700 bg-white border border-emerald-200 px-2.5 py-1 rounded-full flex items-center gap-1">
                            <MapPin className="h-3 w-3" /> {profileState}
                        </span>
                    )}
                </div>

                {!hasProfile ? (
                    <div className="p-5 text-sm text-gray-600">
                        {t('eligible.completeProfile')}
                        <Link href="/profile" className="ml-2 text-emerald-700 font-semibold hover:underline">{t('eligible.setProfile')}</Link>
                    </div>
                ) : eligibleSchemes.length === 0 ? (
                    <div className="p-5 text-sm text-gray-600">
                        {t('eligible.noActive')}
                    </div>
                ) : (
                    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                        {eligibleSchemes.map((scheme) => (
                            <Link href={`/schemes/${scheme.id}`} key={`eligible-${scheme.id}`} className="block">
                                <div className="border border-emerald-100 rounded-lg p-4 hover:bg-emerald-50 transition-colors">
                                    <div className="flex items-start justify-between gap-2">
                                        <div>
                                            <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">{scheme.category}</p>
                                            <h3 className="text-sm font-bold text-gray-900 mt-1 line-clamp-2">{scheme.title[language as keyof typeof scheme.title]}</h3>
                                            <p className="text-xs text-gray-600 mt-1 line-clamp-2">{scheme.shortDescription[language as keyof typeof scheme.shortDescription]}</p>
                                        </div>
                                        <ChevronRight className="h-4 w-4 text-gray-400 shrink-0 mt-1" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            {/* Content: Sidebar + Results */}
            <div className="flex gap-6 mt-6">
                {/* Left Sidebar Filters */}
                <div className="hidden md:block w-60 shrink-0 space-y-5">
                    <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-5 sticky top-24">
                        <div className="flex items-center justify-between">
                            <h3 className="font-bold text-gray-900 flex items-center gap-2"><Filter className="h-4 w-4" /> Filters</h3>
                            <button onClick={clearFilters} className="text-xs text-emerald-600 hover:underline font-medium">{t('schemes.clearAll')}</button>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('schemes.gender')}</label>
                            <select value={filterGender} onChange={e => setFilterGender(e.target.value)} className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white">
                                <option value="All">All</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('schemes.socialCategory')}</label>
                            <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white">
                                <option value="All">All</option>
                                <option value="SC">SC</option>
                                <option value="ST">ST</option>
                                <option value="OBC">OBC</option>
                                <option value="Minority">Minority</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('schemes.occupation')}</label>
                            <select value={filterOccupation} onChange={e => setFilterOccupation(e.target.value)} className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white">
                                <option value="All">All</option>
                                <option value="Farmer">Farmer</option>
                                <option value="Student">Student</option>
                                <option value="Business">Business Owner</option>
                                <option value="Unemployed">Unemployed</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('schemes.status')}</label>
                            <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white">
                                <option value="active">{t('common.active')}</option>
                                <option value="upcoming">{t('common.upcoming')}</option>
                                <option value="expired">{t('common.expired')}</option>
                                <option value="all">{t('common.all')}</option>
                            </select>
                        </div>

                        <Link href="/profile">
                            <div className="mt-4 text-center bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg px-4 py-3 text-xs font-semibold hover:bg-emerald-100 transition-colors">
                                {t('schemes.updateProfilePersonalized')}
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Results */}
                <div className="flex-1 min-w-0 space-y-4">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500">{filteredSchemes.length} {t('schemes.found')}</p>
                    </div>

                    {filteredSchemes.map(scheme => (
                        <Link href={`/schemes/${scheme.id}`} key={scheme.id} className="block">
                            <div className="card-lift bg-white border border-gray-200 rounded-xl overflow-hidden">
                                <div className="p-5">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="space-y-2 flex-grow min-w-0">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <span className="inline-block bg-emerald-100 text-emerald-800 text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize">{scheme.category}</span>
                                                <span className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                                                    scheme.status === 'active' ? 'bg-green-100 text-green-800' :
                                                    scheme.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-gray-100 text-gray-700'
                                                }`}>
                                                    {scheme.status === 'active' ? t('common.active') : scheme.status === 'upcoming' ? t('common.upcoming') : scheme.status === 'expired' ? t('common.expired') : scheme.status}
                                                </span>
                                                {scheme.launchedBy && !scheme.launchedBy.includes('Central') && (
                                                    <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">State Scheme</span>
                                                )}
                                                {scheme.eligibility.districts && scheme.eligibility.districts.length > 0 && (
                                                    <span className="inline-block bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">District</span>
                                                )}
                                            </div>
                                            <h3 className="text-lg font-bold text-gray-900">{scheme.title[language as keyof typeof scheme.title]}</h3>
                                            <p className="text-sm text-gray-500 line-clamp-2">
                                                {scheme.shortDescription[language as keyof typeof scheme.shortDescription]}
                                            </p>
                                            {(scheme.startDate || scheme.endDate) && (
                                                <p className="text-xs text-gray-500">
                                                    {scheme.startDate ? `${language === 'hi' ? 'शुरुआत' : 'Starts'}: ${scheme.startDate}` : ''}
                                                    {scheme.startDate && scheme.endDate ? ' • ' : ''}
                                                    {scheme.endDate ? `${language === 'hi' ? 'समाप्ति' : 'Ends'}: ${scheme.endDate}` : ''}
                                                </p>
                                            )}
                                            <div className="flex items-center gap-3 pt-1 flex-wrap">
                                                <span className="text-emerald-700 font-bold text-sm bg-emerald-50 px-3 py-1 rounded-full">
                                                    {scheme.benefitsAmount[language as keyof typeof scheme.benefitsAmount]}
                                                </span>
                                                <span className="text-gray-400 text-xs flex items-center gap-1">
                                                    <FileText className="h-3 w-3" /> {scheme.requiredDocuments.length} {t('schemes.docsRequired')}
                                                </span>
                                            </div>
                                        </div>
                                        <ChevronRight className="h-5 w-5 text-gray-300 shrink-0 mt-2" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}

                    {filteredSchemes.length === 0 && (
                        <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
                            <p className="text-gray-400 text-lg mb-2">{t('schemes.noMatch')}</p>
                            <button onClick={clearFilters} className="text-emerald-600 hover:underline font-medium text-sm">{t('schemes.clearFilters')}</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
