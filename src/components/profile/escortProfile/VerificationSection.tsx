import type React from 'react';
import { useState } from 'react';
import type { Escort } from '../../../types';

interface VerificationSectionProps {
  profile: Escort | null;
  onUpdate: (updatedData: Partial<Escort>) => void;
}

const VerificationSection: React.FC<VerificationSectionProps> = ({ profile, onUpdate }) => {
  const [requestSent, setRequestSent] = useState(false);

  const handleRequestVerification = () => {
    setRequestSent(true);
    onUpdate({ verificationStatus: 'pending' });
  };

  const isVerificationExpired = (verifiedDate: number) => {
    const oneYearInMs = 365 * 24 * 60 * 60 * 1000;
    return Date.now() - verifiedDate > oneYearInMs;
  };

  const getVerificationStatus = () => {
    if (!profile?.verificationStatus || profile.verificationStatus === 'unverified') {
      return 'unverified';
    }
    if (profile.verificationStatus === 'pending') {
      return 'pending';
    }
    if (profile.verificationStatus === 'verified' && profile.verifiedDate) {
      return isVerificationExpired(profile.verifiedDate) ? 'expired' : 'verified';
    }
    return 'unknown';
  };

  const verificationStatus = getVerificationStatus();

  return (
    <div className="space-y-8 bg-gray-900 text-white p-4 sm:p-8 rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-8">Verification</h2>

      <div className="space-y-4">
        <p>
          Verify your account to gain trust from potential clients and increase your visibility on our platform.
          Verification is valid for one year.
        </p>

        {verificationStatus === 'verified' && (
          <div className="bg-green-500 text-white p-4 rounded-md">
            <p>Your account is verified! ✅</p>
            <p>Verified on: {new Date(profile!.verifiedDate!).toLocaleDateString()}</p>
            <p>Expires on: {new Date(profile!.verifiedDate! + 365 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
          </div>
        )}

        {verificationStatus === 'pending' && (
          <div className="bg-yellow-500 text-white p-4 rounded-md">
            Your verification is pending. We'll review your request soon.
          </div>
        )}

        {(verificationStatus === 'unverified' || verificationStatus === 'expired') && (
          <>
            <p>To get verified, you'll need to:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Provide a government-issued ID</li>
              <li>Take a selfie holding your ID</li>
              <li>Agree to our terms of service</li>
            </ul>

            <button
              onClick={handleRequestVerification}
              disabled={requestSent}
              className="w-full bg-accent-gold text-gray-900 py-2 px-4 rounded-md font-bold hover:bg-accent-gold/80 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              {requestSent ? 'Request Sent' : 'Request Verification'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default VerificationSection;