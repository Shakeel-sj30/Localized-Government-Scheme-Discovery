"use client";

import React, { useState, useEffect, use } from 'react';
import { useRouter } from '@/i18n/routing';
import { Scheme } from '@/data/schemes';
import { useLocale, useTranslations } from 'next-intl';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { ArrowLeft, CheckCircle2, UploadCloud, FileText, ShieldCheck, Star, MessageSquare, HelpCircle, PlayCircle, ExternalLink } from 'lucide-react';
import { addExpertQuestion, addForumPost, addReview, getExpertQuestionsByScheme, getForumPostsByScheme, getReviewsByScheme, seedExpertAnswerForQuestion, ExpertQuestion, ForumPost, SchemeReview } from '@/lib/community';

export default function SchemeDetailClient({ scheme }: { scheme: Scheme }) {
    const router = useRouter();
    const t = useTranslations();
  const language = useLocale();
    const [applyMode, setApplyMode] = useState(false);
    const [showVideo, setShowVideo] = useState(false);
    const [videoId, setVideoId] = useState<string | null>(null);
    const [isVideoLoading, setIsVideoLoading] = useState(false);

    const [reviews, setReviews] = useState<SchemeReview[]>([]);
    const [forumPosts, setForumPosts] = useState<ForumPost[]>([]);
    const [expertQuestions, setExpertQuestions] = useState<ExpertQuestion[]>([]);
    const [reviewRating, setReviewRating] = useState(5);
    const [reviewComment, setReviewComment] = useState('');
    const [forumMessage, setForumMessage] = useState('');
    const [expertQuestionText, setExpertQuestionText] = useState('');

    useEffect(() => {
        if (!scheme) return;
        setReviews(getReviewsByScheme(scheme.id));
        setForumPosts(getForumPostsByScheme(scheme.id));
        setExpertQuestions(getExpertQuestionsByScheme(scheme.id));
    }, [scheme?.id]);

    if (!scheme) {
        return <div className="text-center p-10">Scheme not found.</div>;
    }

    const handleApply = () => {
        setApplyMode(true);
        setShowVideo(false);
        setVideoId(null);
    };

    const handleOfficialLink = () => {
        window.open(scheme.applicationUrl, '_blank', 'noopener,noreferrer');
    };

    const handleWatchVideo = async () => {
        if (!scheme) return;
        setShowVideo(true);
        setIsVideoLoading(true);

        try {
            const schemeName = scheme.title['en'] || scheme.title[language as keyof typeof scheme.title];
            const query = encodeURIComponent(`How to apply for ${schemeName} scheme online tutorial 2024`);
            const res = await fetch(`/api/youtube?q=${query}`);
            const data = await res.json();

            if (data.videoId) {
                setVideoId(data.videoId);
            } else {
                setVideoId('M7lc1UVf-VE');
            }
        } catch (error) {
            console.error("Failed to fetch video:", error);
            setVideoId('M7lc1UVf-VE');
        } finally {
            setIsVideoLoading(false);
        }
    };

    const handleAddReview = () => {
        if (!scheme || !reviewComment.trim()) return;
        addReview({
            schemeId: scheme.id,
            userName: 'Citizen',
            rating: reviewRating,
            comment: reviewComment.trim(),
        });
        setReviews(getReviewsByScheme(scheme.id));
        setReviewComment('');
        setReviewRating(5);
    };

    const handleAddForumPost = () => {
        if (!scheme || !forumMessage.trim()) return;
        addForumPost({
            schemeId: scheme.id,
            userName: 'Citizen',
            message: forumMessage.trim(),
        });
        setForumPosts(getForumPostsByScheme(scheme.id));
        setForumMessage('');
    };

    const handleAskExpert = () => {
        if (!scheme || !expertQuestionText.trim()) return;
        const question = addExpertQuestion({
            schemeId: scheme.id,
            userName: 'Citizen',
            question: expertQuestionText.trim(),
        });
        setExpertQuestionText('');
        setTimeout(() => {
            seedExpertAnswerForQuestion(question.id, scheme.category);
            setExpertQuestions(getExpertQuestionsByScheme(scheme.id));
        }, 1200);
        setExpertQuestions(getExpertQuestionsByScheme(scheme.id));
    };

    if (applyMode) {
        return (
            <div className="max-w-4xl mx-auto space-y-6">
                <button onClick={() => setApplyMode(false)} className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors font-medium">
                    <ArrowLeft className="h-4 w-4" /> Back to scheme details
                </button>

                <div className="text-center space-y-4 mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">Application Options</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">Choose how you would like to proceed with your application for <span className="font-semibold text-emerald-700">{scheme.title[language as keyof typeof scheme.title]}</span>. We recommend watching the tutorial if you are applying for the first time.</p>
                </div>

                {!showVideo ? (
                    <div className="grid md:grid-cols-2 gap-8">
                        <div
                            onClick={handleWatchVideo}
                            className="bg-white border-2 border-emerald-100 rounded-2xl p-8 hover:border-emerald-400 hover:shadow-xl transition-all cursor-pointer group flex flex-col items-center text-center space-y-4"
                        >
                            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                <PlayCircle className="h-10 w-10 text-emerald-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">Watch Tutorial Video</h3>
                            <p className="text-gray-500">Learn step-by-step how to fill out the application, what documents are required, and where to submit them.</p>
                            <span className="text-emerald-600 font-semibold group-hover:underline pt-4">Play Video</span>
                        </div>

                        <div
                            onClick={handleOfficialLink}
                            className="bg-white border-2 border-blue-100 rounded-2xl p-8 hover:border-blue-400 hover:shadow-xl transition-all cursor-pointer group flex flex-col items-center text-center space-y-4"
                        >
                            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                <ExternalLink className="h-10 w-10 text-blue-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">Go to Official Portal</h3>
                            <p className="text-gray-500">I already know how to apply and have all my documents ready. Take me straight to the government website.</p>
                            <span className="text-blue-600 font-semibold group-hover:underline pt-4">Open Link in New Tab</span>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="bg-gray-900 p-4 flex justify-between items-center text-white">
                            <h3 className="font-semibold flex items-center gap-2">
                                <PlayCircle className="h-5 w-5" /> Tutorial: {scheme.title[language as keyof typeof scheme.title]}
                            </h3>
                            <button onClick={() => { setShowVideo(false); setVideoId(null); }} className="text-gray-400 hover:text-white transition-colors">
                                Close Video
                            </button>
                        </div>
                        <div className="aspect-video w-full bg-black relative flex items-center justify-center">
                            {isVideoLoading ? (
                                <div className="text-white flex flex-col items-center">
                                    <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                                    <p>Loading the best tutorial from YouTube...</p>
                                </div>
                            ) : videoId ? (
                                <iframe
                                    className="w-full h-full absolute inset-0"
                                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen>
                                </iframe>
                            ) : (
                                <div className="text-white">Video not available.</div>
                            )}
                        </div>
                        <div className="p-6 bg-gray-50 border-t border-gray-200 text-center">
                            <p className="text-sm text-gray-600 mb-4">After watching the video, you can proceed to the official website to complete your application.</p>
                            <Button onClick={handleOfficialLink} variant="primary" className="bg-blue-600 hover:bg-blue-700 shadow-lg text-lg px-8 py-3">
                                I'm Ready - Go to Official Portal <ExternalLink className="ml-2 h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors font-medium">
                <ArrowLeft className="h-4 w-4" /> Back to schemes
            </button>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 space-y-6">
                <div className="space-y-4">
                    <Badge className="px-3 py-1 text-sm capitalize bg-emerald-100 text-emerald-800">{scheme.category}</Badge>
                    <h1 className="text-4xl font-extrabold text-gray-900">{scheme.title[language as keyof typeof scheme.title]}</h1>
                    <p className="text-2xl font-bold text-emerald-600 bg-emerald-50 inline-block px-4 py-2 rounded-lg">
                        {scheme.benefitsAmount[language as keyof typeof scheme.benefitsAmount]}
                    </p>
                </div>

                <div className="prose max-w-none text-gray-700 text-lg leading-relaxed pt-4 border-t border-gray-100">
                    <p>{scheme.longDescription[language as keyof typeof scheme.longDescription]}</p>
                </div>

                <div className="pt-6">
                    <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
                        <h3 className="text-xl font-bold text-emerald-900 mb-4 flex items-center gap-2">
                            Eligibility Criteria
                        </h3>
                        <ul className="space-y-2 text-emerald-800 list-disc ml-5">
                            {scheme.eligibility.minAge && <li>Minimum Age: {scheme.eligibility.minAge} years</li>}
                            {scheme.eligibility.maxAge && <li>Maximum Age: {scheme.eligibility.maxAge} years</li>}
                            {scheme.eligibility.gender && scheme.eligibility.gender !== 'All' && <li>Gender: {scheme.eligibility.gender}</li>}
                            {scheme.eligibility.maxIncome && <li key="income">Income Limit: ₹{scheme.eligibility.maxIncome.toLocaleString()} / year</li>}
                            <li>Occupations: {scheme.eligibility.occupations.join(', ')}</li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-100">
                    <Button onClick={handleApply} variant="primary" className="w-full sm:w-auto text-xl px-12 py-4 shadow-lg hover:shadow-xl transition-all bg-emerald-600 hover:bg-emerald-700">
                        {t('btn.apply')} Now
                    </Button>
                </div>

                <div className="pt-8 border-t border-gray-100 space-y-8">
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2"><Star className="h-5 w-5 text-yellow-500" /> User Reviews & Ratings</h3>
                        <div className="grid gap-3 sm:grid-cols-[120px_1fr_auto]">
                            <select value={reviewRating} onChange={(e) => setReviewRating(parseInt(e.target.value))} className="rounded-lg border border-gray-300 px-3 py-2">
                                <option value={5}>5 ★</option>
                                <option value={4}>4 ★</option>
                                <option value={3}>3 ★</option>
                                <option value={2}>2 ★</option>
                                <option value={1}>1 ★</option>
                            </select>
                            <Input value={reviewComment} onChange={(e) => setReviewComment(e.target.value)} placeholder="Share your experience with this scheme" />
                            <Button type="button" variant="primary" onClick={handleAddReview}>Post</Button>
                        </div>
                        <div className="space-y-2">
                            {reviews.length === 0 ? (
                                <p className="text-sm text-gray-500">No reviews yet. Be the first to review.</p>
                            ) : reviews.slice(0, 5).map((review) => (
                                <div key={review.id} className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                                    <div className="text-sm font-semibold text-gray-900">{review.userName} • {review.rating} ★</div>
                                    <p className="text-sm text-gray-700 mt-1">{review.comment}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2"><MessageSquare className="h-5 w-5 text-emerald-600" /> Discussion Forum</h3>
                        <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
                            <Input value={forumMessage} onChange={(e) => setForumMessage(e.target.value)} placeholder="Post a discussion point or tip for others" />
                            <Button type="button" variant="primary" onClick={handleAddForumPost}>Post</Button>
                        </div>
                        <div className="space-y-2">
                            {forumPosts.length === 0 ? (
                                <p className="text-sm text-gray-500">No discussions yet. Start the conversation.</p>
                            ) : forumPosts.slice(0, 8).map((post) => (
                                <div key={post.id} className="bg-white border border-gray-200 rounded-lg p-3">
                                    <p className="text-sm font-semibold text-gray-900">{post.userName}</p>
                                    <p className="text-sm text-gray-700 mt-1">{post.message}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2"><HelpCircle className="h-5 w-5 text-indigo-600" /> Expert Q&A</h3>
                        <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
                            <Input value={expertQuestionText} onChange={(e) => setExpertQuestionText(e.target.value)} placeholder="Ask an expert about eligibility, documents, or process" />
                            <Button type="button" variant="primary" onClick={handleAskExpert}>Ask</Button>
                        </div>
                        <div className="space-y-2">
                            {expertQuestions.length === 0 ? (
                                <p className="text-sm text-gray-500">No questions yet. Ask the first expert question.</p>
                            ) : expertQuestions.slice(0, 6).map((item) => (
                                <div key={item.id} className="bg-indigo-50 border border-indigo-100 rounded-lg p-3">
                                    <p className="text-sm font-semibold text-indigo-900">Q: {item.question}</p>
                                    <p className="text-sm text-indigo-800 mt-1">{item.answer ? `A (${item.answeredBy}): ${item.answer}` : 'Awaiting expert response...'}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
