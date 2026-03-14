"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { statesAndUTs, getStatesByType } from '@/data/states';
import { schemes, Scheme } from '@/data/schemes';
import { useLocale, useTranslations } from 'next-intl';
import { MapPin, ExternalLink, ChevronRight, FileText, Search, X, Building2, Map } from 'lucide-react';

export default function StatesSchemesPage() {
    const t = useTranslations();
  const language = useLocale();
    const isHi = language === 'hi';
    const [selectedState, setSelectedState] = useState<string | null>(null);
    const [searchText, setSearchText] = useState('');
    const [showType, setShowType] = useState<'all' | 'state' | 'union-territory'>('all');

    const states = getStatesByType('state');
    const unionTerritories = getStatesByType('union-territory');

    const filteredStatesAndUTs = statesAndUTs.filter(state => {
        if (showType !== 'all' && state.type !== showType) return false;
        if (searchText.trim()) {
            return state.name.toLowerCase().includes(searchText.toLowerCase());
        }
        return true;
    });

    const selectedStateData = selectedState ? statesAndUTs.find(s => s.id === selectedState) : null;

    // Filter schemes based on selected state - include national and state-specific schemes
    const stateSchemes = selectedState
        ? schemes.filter(scheme => {
            // Only show active schemes by default
          if (scheme.status !== 'active') return false;
            
            // Include if it's a national scheme (available in all states)
            if (scheme.eligibility.states.includes('All')) return true;
            
            // Include if state is specifically mentioned
            if (scheme.eligibility.states.includes(selectedStateData?.name || '')) return true;
            
            return false;
          }).sort((a, b) => {
            // Prioritize state-specific schemes over national schemes
            const aIsStateSpecific = a.launchedBy?.includes('Government') && !a.launchedBy?.includes('Central');
            const bIsStateSpecific = b.launchedBy?.includes('Government') && !b.launchedBy?.includes('Central');
            if (aIsStateSpecific && !bIsStateSpecific) return -1;
            if (!aIsStateSpecific && bIsStateSpecific) return 1;
            return 0;
          })
        : [];

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 -mx-4 sm:-mx-6 lg:-mx-8 -mt-8 px-6 py-12">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="flex items-center justify-center mb-4">
                        <Map className="h-8 w-8 text-white mr-3" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-3">{isHi ? 'राज्य एवं केंद्र शासित प्रदेश योजनाएँ' : 'State & UT Schemes'}</h1>
                    <p className="text-emerald-100 text-lg">
                        {isHi ? 'अपने क्षेत्र में उपलब्ध योजनाएँ देखने के लिए राज्य या केंद्र शासित प्रदेश चुनें' : 'Select your state or union territory to discover schemes available in your region'}
                    </p>
                </div>
            </div>

            <div className="mt-8 grid lg:grid-cols-3 gap-6">
                {/* Left Panel - States & UTs List */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden sticky top-24">
                        {/* Search & Filter */}
                        <div className="p-4 border-b border-gray-200 space-y-3">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <input
                                    type="text"
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                    placeholder={isHi ? 'राज्य या केंद्र शासित प्रदेश खोजें...' : 'Search state or UT...'}
                                    className="w-full pl-10 pr-8 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                />
                                {searchText && (
                                    <button 
                                        onClick={() => setSearchText('')}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                )}
                            </div>
                            
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setShowType('all')}
                                    className={`flex-1 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                                        showType === 'all'
                                            ? 'bg-emerald-600 text-white'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                >
                                    {isHi ? 'सभी' : 'All'}
                                </button>
                                <button
                                    onClick={() => setShowType('state')}
                                    className={`flex-1 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                                        showType === 'state'
                                            ? 'bg-emerald-600 text-white'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                >
                                    {isHi ? 'राज्य' : 'States'}
                                </button>
                                <button
                                    onClick={() => setShowType('union-territory')}
                                    className={`flex-1 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                                        showType === 'union-territory'
                                            ? 'bg-emerald-600 text-white'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                >
                                    {isHi ? 'केंद्र शासित प्रदेश' : 'UTs'}
                                </button>
                            </div>
                        </div>

                        {/* States/UTs List */}
                        <div className="overflow-y-auto max-h-[600px]">
                            {showType !== 'union-territory' && (
                                <div>
                                    <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
                                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                                            {isHi ? 'राज्य' : 'States'} ({filteredStatesAndUTs.filter(s => s.type === 'state').length})
                                        </h3>
                                    </div>
                                    {filteredStatesAndUTs.filter(s => s.type === 'state').map(state => (
                                        <button
                                            key={state.id}
                                            onClick={() => setSelectedState(state.id)}
                                            className={`w-full text-left px-4 py-3 border-b border-gray-100 hover:bg-emerald-50 transition-colors flex items-center justify-between ${
                                                selectedState === state.id ? 'bg-emerald-50 border-l-4 border-l-emerald-600' : ''
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <MapPin className={`h-4 w-4 ${selectedState === state.id ? 'text-emerald-600' : 'text-gray-400'}`} />
                                                <span className={`text-sm font-medium ${selectedState === state.id ? 'text-emerald-900' : 'text-gray-700'}`}>
                                                    {state.name}
                                                </span>
                                            </div>
                                            {selectedState === state.id && (
                                                <ChevronRight className="h-4 w-4 text-emerald-600" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {showType !== 'state' && (
                                <div>
                                    <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
                                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                                            {isHi ? 'केंद्र शासित प्रदेश' : 'Union Territories'} ({filteredStatesAndUTs.filter(s => s.type === 'union-territory').length})
                                        </h3>
                                    </div>
                                    {filteredStatesAndUTs.filter(s => s.type === 'union-territory').map(state => (
                                        <button
                                            key={state.id}
                                            onClick={() => setSelectedState(state.id)}
                                            className={`w-full text-left px-4 py-3 border-b border-gray-100 hover:bg-emerald-50 transition-colors flex items-center justify-between ${
                                                selectedState === state.id ? 'bg-emerald-50 border-l-4 border-l-emerald-600' : ''
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <Building2 className={`h-4 w-4 ${selectedState === state.id ? 'text-emerald-600' : 'text-gray-400'}`} />
                                                <span className={`text-sm font-medium ${selectedState === state.id ? 'text-emerald-900' : 'text-gray-700'}`}>
                                                    {state.name}
                                                </span>
                                            </div>
                                            {selectedState === state.id && (
                                                <ChevronRight className="h-4 w-4 text-emerald-600" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {filteredStatesAndUTs.length === 0 && (
                                <div className="p-8 text-center text-gray-400">
                                    <p className="text-sm">{isHi ? 'कोई परिणाम नहीं मिला' : 'No results found'}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Panel - Schemes */}
                <div className="lg:col-span-2">
                    {!selectedState ? (
                        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                            <Map className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{isHi ? 'एक राज्य या केंद्र शासित प्रदेश चुनें' : 'Select a State or Union Territory'}</h3>
                            <p className="text-gray-500">
                                {isHi ? 'उपलब्ध सरकारी योजनाएँ देखने के लिए सूची से अपना स्थान चुनें' : 'Choose your location from the list to view available government schemes'}
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {/* State Header */}
                            <div className="bg-white rounded-xl border border-gray-200 p-6">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <MapPin className="h-6 w-6 text-emerald-600" />
                                            <h2 className="text-2xl font-bold text-gray-900">{selectedStateData?.name}</h2>
                                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                                                selectedStateData?.type === 'state' 
                                                    ? 'bg-blue-100 text-blue-800' 
                                                    : 'bg-purple-100 text-purple-800'
                                            }`}>
                                                {selectedStateData?.type === 'state' ? (isHi ? 'राज्य' : 'State') : (isHi ? 'केंद्र शासित प्रदेश' : 'Union Territory')}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-4">
                                            {isHi ? `${selectedStateData?.name} में उपलब्ध ${stateSchemes.length} सरकारी योजनाएँ देखें` : `Browse ${stateSchemes.length} government schemes available in ${selectedStateData?.name}`}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <a
                                        href={selectedStateData?.officialWebsite}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
                                    >
                                        {isHi ? 'आधिकारिक वेबसाइट' : 'Official Website'} <ExternalLink className="h-4 w-4" />
                                    </a>
                                    <a
                                        href={selectedStateData?.schemePortal}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-emerald-600 text-emerald-600 text-sm font-semibold rounded-lg hover:bg-emerald-50 transition-colors"
                                    >
                                        {isHi ? 'योजना पोर्टल' : 'Scheme Portal'} <ExternalLink className="h-4 w-4" />
                                    </a>
                                </div>
                            </div>

                            {/* Schemes List */}
                            <div className="space-y-3">
                                <h3 className="text-lg font-bold text-gray-900 px-1">{isHi ? 'उपलब्ध योजनाएँ' : 'Available Schemes'}</h3>
                                
                                {stateSchemes.length === 0 ? (
                                    <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                                        <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                                        <p className="text-gray-500">{isHi ? 'इस क्षेत्र के लिए कोई योजना नहीं मिली' : 'No schemes found for this region'}</p>
                                    </div>
                                ) : (
                                    stateSchemes.map(scheme => (
                                        <div key={scheme.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                                            <div className="p-5">
                                                <div className="flex items-start justify-between gap-4">
                                                    <div className="space-y-2 flex-grow">
                                                        <div className="flex items-center gap-2 flex-wrap">
                                                            <span className="inline-block bg-emerald-100 text-emerald-800 text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize">
                                                                {scheme.category}
                                                            </span>
                                                            {scheme.launchedBy && !scheme.launchedBy.includes('Central') && (
                                                                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                                                                    {isHi ? 'राज्य योजना' : 'State Scheme'}
                                                                </span>
                                                            )}
                                                            {scheme.eligibility.districts && scheme.eligibility.districts.length > 0 && (
                                                                <span className="inline-block bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                                                                    {isHi ? 'जिला स्तर' : 'District Level'}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <h4 className="text-lg font-bold text-gray-900">
                                                            {scheme.title[language as keyof typeof scheme.title]}
                                                        </h4>
                                                        <p className="text-sm text-gray-600 leading-relaxed">
                                                            {scheme.shortDescription[language as keyof typeof scheme.shortDescription]}
                                                        </p>
                                                        <div className="flex items-center gap-3 pt-2 flex-wrap">
                                                            <span className="text-emerald-700 font-bold text-sm bg-emerald-50 px-3 py-1 rounded-full">
                                                                {scheme.benefitsAmount[language as keyof typeof scheme.benefitsAmount]}
                                                            </span>
                                                            <span className="text-gray-400 text-xs flex items-center gap-1">
                                                                <FileText className="h-3 w-3" /> {scheme.requiredDocuments.length} {isHi ? 'दस्तावेज आवश्यक' : 'docs required'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="flex gap-3 mt-4">
                                                    <a
                                                        href={scheme.applicationUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
                                                    >
                                                        {isHi ? 'अभी आवेदन करें' : 'Apply Now'} <ExternalLink className="h-4 w-4" />
                                                    </a>
                                                    <Link
                                                        href={`/schemes/${scheme.id}`}
                                                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-gray-200 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                                                    >
                                                        {isHi ? 'विवरण देखें' : 'View Details'} <ChevronRight className="h-4 w-4" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
