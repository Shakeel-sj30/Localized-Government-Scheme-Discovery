"use client";

import React, { useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { setDigiLockerVerificationInProfile } from '@/lib/digilocker';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl'; import { Suspense } from 'react';

function DigiLockerCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations();
  const language = useLocale();
  const isHi = language === 'hi';

  const status = searchParams.get('status');
  const code = searchParams.get('code');
  const source = searchParams.get('source');

  const isSuccess = useMemo(() => status === 'success' || !!code || source === 'mock', [status, code, source]);

  useEffect(() => {
    const referenceId = `DL-${Date.now()}`;

    if (isSuccess) {
      setDigiLockerVerificationInProfile({
        verified: true,
        verifiedAt: new Date().toISOString(),
        referenceId,
      });
      setTimeout(() => router.replace('/profile?digilocker=verified'), 1300);
      return;
    }

    setDigiLockerVerificationInProfile({ verified: false });
    setTimeout(() => router.replace('/profile?digilocker=failed'), 1300);
  }, [isSuccess, router]);

  return (
    <div className="max-w-xl mx-auto py-16 px-4">
      <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
        <div className="flex justify-center mb-4">
          {isSuccess ? (
            <CheckCircle2 className="h-12 w-12 text-emerald-600" />
          ) : (
            <XCircle className="h-12 w-12 text-red-500" />
          )}
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {isSuccess ? (isHi ? 'डिजीलॉकर सत्यापन सफल' : 'DigiLocker Verification Successful') : (isHi ? 'डिजीलॉकर सत्यापन असफल' : 'DigiLocker Verification Failed')}
        </h1>
        <p className="text-gray-600 mb-6">
          {isSuccess
            ? (isHi ? 'आपके दस्तावेज सत्यापित हो गए हैं। प्रोफाइल पर भेजा जा रहा है...' : 'Your documents are verified. Redirecting to your profile...')
            : (isHi ? 'सत्यापन पूरा नहीं हो सका। प्रोफाइल पर भेजा जा रहा है...' : 'We could not complete verification. Redirecting to your profile...')}
        </p>
        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
          <Loader2 className="h-4 w-4 animate-spin" /> {isHi ? 'कृपया प्रतीक्षा करें' : 'Please wait'}
        </div>
      </div>
    </div>
  );
}

export default function DigiLockerCallbackPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
        <p className="text-gray-500">Verifying DigiLocker status...</p>
      </div>
    }>
      <DigiLockerCallbackContent />
    </Suspense>
  );
}
