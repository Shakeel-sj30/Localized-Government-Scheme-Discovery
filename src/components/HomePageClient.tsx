"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';
import { Scheme } from '@/data/schemes';
import { Tractor, GraduationCap, Users, Briefcase, FileText, Mic, Search, ArrowRight, ChevronRight, Star, Sparkles, UserCircle, Heart, Home, Landmark, Building2, Map, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import EligibilityChecker from '@/components/EligibilityChecker';

export default function HomePageClient({ initialSchemes }: { initialSchemes: Scheme[] }) {
  const t = useTranslations();
  const language = useLocale();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [recommended, setRecommended] = useState<Scheme[]>([]);
  const [hasProfile, setHasProfile] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const profileData = localStorage.getItem('yojana_profile');
    if (profileData) {
      const profile = JSON.parse(profileData);
      setHasProfile(true);
      setUserName(profile.name || '');

      const matched = initialSchemes.filter(scheme => {
        if (profile.age) {
          const age = parseInt(profile.age);
          if (scheme.eligibility.minAge && age < scheme.eligibility.minAge) return false;
          if (scheme.eligibility.maxAge && age > scheme.eligibility.maxAge) return false;
        }
        if (profile.gender && scheme.eligibility.gender && scheme.eligibility.gender !== 'All' && scheme.eligibility.gender !== profile.gender) return false;
        if (profile.occupation && !scheme.eligibility.occupations.includes('All') && !scheme.eligibility.occupations.includes(profile.occupation)) return false;
        if (profile.income && scheme.eligibility.maxIncome && parseInt(profile.income) > scheme.eligibility.maxIncome) return false;
        if (profile.category && !scheme.eligibility.categories.includes('All') && !scheme.eligibility.categories.includes(profile.category)) return false;
        return true;
      });
      setRecommended(matched);
    }
  }, [initialSchemes]);

  const categories = [
    { id: 'farmer', title: t('nav.farmer') || 'Farmer', icon: Tractor, color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200', count: initialSchemes.filter(s => s.category === 'farmer').length },
    { id: 'student', title: t('nav.student') || 'Student', icon: GraduationCap, color: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-200', count: initialSchemes.filter(s => s.category === 'student').length },
    { id: 'women', title: t('nav.women') || 'Women', icon: Users, color: 'text-purple-700', bg: 'bg-purple-50', border: 'border-purple-200', count: initialSchemes.filter(s => s.category === 'women').length },
    { id: 'business', title: t('nav.business') || 'Business', icon: Briefcase, color: 'text-orange-700', bg: 'bg-orange-50', border: 'border-orange-200', count: initialSchemes.filter(s => s.category === 'business').length },
    { id: 'health', title: 'Health', icon: Heart, color: 'text-red-700', bg: 'bg-red-50', border: 'border-red-200', count: initialSchemes.filter(s => s.category === 'health').length },
    { id: 'housing', title: 'Housing', icon: Home, color: 'text-indigo-700', bg: 'bg-indigo-50', border: 'border-indigo-200', count: initialSchemes.filter(s => s.category === 'housing').length },
    { id: 'financial', title: 'Financial', icon: Landmark, color: 'text-teal-700', bg: 'bg-teal-50', border: 'border-teal-200', count: initialSchemes.filter(s => s.category === 'financial').length },
    { id: 'employment', title: 'Employment', icon: Briefcase, color: 'text-cyan-700', bg: 'bg-cyan-50', border: 'border-cyan-200', count: initialSchemes.filter(s => s.category === 'employment').length },
    { id: 'infrastructure', title: 'Infrastructure', icon: Building2, color: 'text-slate-700', bg: 'bg-slate-50', border: 'border-slate-200', count: initialSchemes.filter(s => s.category === 'infrastructure').length },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/schemes?search=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push('/schemes');
    }
  };

  const popularSchemes = initialSchemes.slice(0, 3);

  return (
    <div className="space-y-0 -mt-8 -mx-4 sm:-mx-6 lg:-mx-8">
      {/* Hero Section */}
      <div className="hero-gradient text-white px-6 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            {t('home.title')}
          </h1>
          <p className="text-lg sm:text-xl text-emerald-100 max-w-2xl mx-auto font-medium">
            {t('home.subtitle')}
          </p>

          <form onSubmit={handleSearch} className="mt-8 max-w-2xl mx-auto">
            <div className="flex items-center bg-white rounded-full shadow-xl overflow-hidden">
              <div className="pl-5">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('home.searchPlaceholder')}
                className="flex-1 px-4 py-4 text-gray-800 placeholder-gray-400 focus:outline-none text-base"
              />
              <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-4 font-semibold transition-colors flex items-center gap-2">
                {t('home.search')} <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>

          <div className="flex justify-center mt-6">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-chatbot-voice'))}
              className="relative flex items-center gap-3 bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white px-8 py-3 rounded-full text-base font-semibold border border-white/30 transition-all hover:scale-105"
            >
              <span className="relative pulse-ring">
                <Mic className="h-5 w-5" />
              </span>
              {t('nav.askVoice')}
            </button>
          </div>
        </div>
      </div>



      {/* Categories */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{t('home.browseCategory')}</h2>
            <p className="text-gray-500 text-sm mt-1">{t('home.findRelevant')}</p>
          </div>
          <Link href="/schemes" className="text-emerald-600 hover:text-emerald-700 font-semibold text-sm flex items-center gap-1">
            {t('home.viewAll')} <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link href={`/schemes?category=${cat.id}`} key={cat.id}>
              <div className={`card-lift bg-white border ${cat.border} rounded-xl p-6 text-center cursor-pointer space-y-3`}>
                <div className={`mx-auto w-14 h-14 rounded-full ${cat.bg} flex items-center justify-center`}>
                  <cat.icon className={`h-7 w-7 ${cat.color}`} />
                </div>
                <h3 className="font-bold text-gray-900 text-sm">{cat.title}</h3>
                <span className="inline-block bg-gray-100 text-gray-600 text-xs font-semibold px-2.5 py-1 rounded-full">
                  {cat.count} {t('home.schemesCount')}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Interactive Eligibility Checker */}
      <div className="max-w-5xl mx-auto px-6">
        <EligibilityChecker />
      </div>

      {/* State & UT Schemes Highlight */}
      <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 border-y border-blue-400">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 text-white">
              <div className="flex items-center gap-2 mb-4">
                <Map className="h-8 w-8" />
                <span className="text-sm font-bold bg-white/20 px-3 py-1 rounded-full">{t('home.newFeature')}</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">{t('home.findByState')}</h2>
              <p className="text-blue-100 text-lg mb-6">
                {t('home.stateSubtitle')}
              </p>
              <Link href="/states">
                <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-blue-50 transition-all hover:scale-105 flex items-center gap-2">
                  {t('home.exploreStates')}
                  <ArrowRight className="h-5 w-5" />
                </button>
              </Link>
            </div>
            <div className="flex-shrink-0">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 space-y-3">
                <div className="flex items-center gap-3 text-white">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <span className="font-semibold">28 {t('home.states')}</span>
                </div>
                <div className="flex items-center gap-3 text-white">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <span className="font-semibold">8 {t('home.unionTerritories')}</span>
                </div>
                <div className="flex items-center gap-3 text-white">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <FileText className="h-5 w-5" />
                  </div>
                  <span className="font-semibold">{initialSchemes.length}+ {t('home.schemesCount')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended for You */}
      <div className="bg-gradient-to-b from-emerald-50 to-white border-t border-emerald-100">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <Sparkles className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {hasProfile ? `${t('home.eligibleSchemesFor')} ${userName || t('nav.profile')}` : t('home.eligibleSchemes')}
                </h2>
                <p className="text-gray-500 text-sm mt-0.5">
                  {hasProfile ? `${t('home.eligibleCount')} ${recommended.length} ${t('home.basedOnProfile')}` : t('home.completeProfilePrompt')}
                </p>
              </div>
            </div>
            {hasProfile && (
              <Link href="/schemes" className="text-emerald-600 hover:text-emerald-700 font-semibold text-sm flex items-center gap-1">
                {t('home.viewAll')} <ChevronRight className="h-4 w-4" />
              </Link>
            )}
          </div>

          {!hasProfile ? (
            <Link href="/profile">
              <div className="card-lift bg-white border-2 border-dashed border-emerald-300 rounded-xl p-8 text-center cursor-pointer space-y-3">
                <UserCircle className="h-12 w-12 text-emerald-400 mx-auto" />
                <h3 className="font-bold text-gray-900 text-lg">{t('home.completeProfile')}</h3>
                <p className="text-gray-500 text-sm max-w-md mx-auto">{t('home.profileHint')}</p>
                <span className="inline-flex items-center gap-1 bg-emerald-600 text-white px-5 py-2 rounded-lg font-semibold text-sm mt-2">
                  {t('home.fillProfile')} <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ) : recommended.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {recommended.slice(0, 6).map((scheme) => (
                <Link href={`/schemes/${scheme.id}`} key={scheme.id}>
                  <div className="card-lift bg-white border border-emerald-200 rounded-xl overflow-hidden cursor-pointer h-full">
                    <div className="bg-emerald-600 px-4 py-2 flex items-center justify-between">
                      <span className="text-emerald-100 text-xs font-semibold uppercase tracking-wider">{scheme.category}</span>
                      <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full font-medium">Eligible</span>
                    </div>
                    <div className="p-5 space-y-3">
                      <h3 className="font-bold text-gray-900 text-base leading-snug">
                        {scheme.title[language as keyof typeof scheme.title]}
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {scheme.shortDescription[language as keyof typeof scheme.shortDescription]}
                      </p>
                      <div className="pt-2 flex items-center justify-between">
                        <span className="text-emerald-700 font-bold text-sm bg-emerald-50 px-3 py-1 rounded-full">
                          {scheme.benefitsAmount[language as keyof typeof scheme.benefitsAmount]}
                        </span>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
              <p className="text-gray-500">{t('home.noMatching')}</p>
              <Link href="/profile" className="text-emerald-600 hover:underline font-medium text-sm mt-2 inline-block">{t('home.updateProfile')}</Link>
            </div>
          )}
        </div>
      </div>

      {/* Popular Schemes */}
      <div className="bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{t('home.popularSchemes')}</h2>
              <p className="text-gray-500 text-sm mt-1">{t('home.popularSubtitle')}</p>
            </div>
            <Link href="/schemes" className="text-emerald-600 hover:text-emerald-700 font-semibold text-sm flex items-center gap-1">
              {t('home.viewAll')} <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {popularSchemes.map((scheme) => (
              <Link href={`/schemes/${scheme.id}`} key={scheme.id}>
                <div className="card-lift bg-white border border-gray-200 rounded-xl overflow-hidden cursor-pointer h-full">
                  <div className="bg-emerald-600 px-4 py-2">
                    <span className="text-emerald-100 text-xs font-semibold uppercase tracking-wider">{scheme.category}</span>
                  </div>
                  <div className="p-5 space-y-3">
                    <h3 className="font-bold text-gray-900 text-base leading-snug">
                      {scheme.title[language as keyof typeof scheme.title]}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {scheme.shortDescription[language as keyof typeof scheme.shortDescription]}
                    </p>
                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-emerald-700 font-bold text-sm bg-emerald-50 px-3 py-1 rounded-full">
                        {scheme.benefitsAmount[language as keyof typeof scheme.benefitsAmount]}
                      </span>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* My Applications Link */}
      <div className="max-w-5xl mx-auto px-6 pb-12">
        <Link href="/profile/applications">
          <div className="card-lift bg-white border border-gray-200 rounded-xl p-5 flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-100 rounded-full">
                <FileText className="h-6 w-6 text-gray-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{t('nav.applications')}</h3>
                <p className="text-sm text-gray-500">{t('home.trackApplications')}</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>
        </Link>
      </div>
    </div>
  );
}
