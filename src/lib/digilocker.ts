export interface DigiLockerVerification {
  verified: boolean;
  verifiedAt?: string;
  referenceId?: string;
}

export function buildDigiLockerAuthUrl(origin: string, state: string) {
  const clientId = process.env.NEXT_PUBLIC_DIGILOCKER_CLIENT_ID;
  const callbackUrl = `${origin}/digilocker/callback`;

  if (!clientId) {
    return `${callbackUrl}?status=success&source=mock&state=${encodeURIComponent(state)}`;
  }

  const authBase = 'https://digilocker.meripehchaan.gov.in/public/oauth2/1/authorize';
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    redirect_uri: callbackUrl,
    state,
  });

  return `${authBase}?${params.toString()}`;
}

export function setDigiLockerVerificationInProfile(payload: DigiLockerVerification) {
  const saved = localStorage.getItem('yojana_profile');
  const profile = saved ? JSON.parse(saved) : {};

  const updatedProfile = {
    ...profile,
    digilockerVerified: payload.verified,
    digilockerVerifiedAt: payload.verifiedAt || null,
    digilockerReferenceId: payload.referenceId || null,
  };

  localStorage.setItem('yojana_profile', JSON.stringify(updatedProfile));
}
