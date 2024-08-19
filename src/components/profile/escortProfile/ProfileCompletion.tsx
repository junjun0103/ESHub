import type React from 'react';
import type { Escort } from '../../../types';

interface ProfileCompletionProps {
  profile: Escort | null;
}

const ProfileCompletion: React.FC<ProfileCompletionProps> = ({ profile }) => {
  if (!profile) return null;

  const sections = [
    { name: 'Basic Information', isComplete: !!profile.name && !!profile.age && !!profile.suburb && !!profile.region },
    { name: 'Physical Attributes', isComplete: !!profile.height && !!profile.weight && !!profile.bodyType },
    { name: 'Photos', isComplete: (profile.profilePhotos?.length || 0) >= 1 && (profile.photos?.length || 0) >= 3 },
    { name: 'Services', isComplete: (profile.services?.length || 0) >= 5 },
    { name: 'Pricing', isComplete: (profile.priceTable?.length || 0) >= 1 },
    { name: 'About Me', isComplete: (profile.about?.length || 0) >= 100 },
    { name: 'Languages', isComplete: (profile.languages?.length || 0) >= 1 },
  ];

  const completedSections = sections.filter(section => section.isComplete).length;
  const completionPercentage = Math.round((completedSections / sections.length) * 100);

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Profile Completion</h2>
      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <span>Progress</span>
          <span>{completionPercentage}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2.5">
          <div
            className="bg-accent-gold h-2.5 rounded-full"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>
      <ul className="space-y-2">
        {sections.map((section, index) => (
          <li key={index} className="flex items-center">
            {section.isComplete ? (
              <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            ) : (
              <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            )}
            <span className={section.isComplete ? 'text-green-500' : 'text-red-500'}>
              {section.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileCompletion;