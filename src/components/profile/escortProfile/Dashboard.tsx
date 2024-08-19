import type React from 'react';
import type { Escort } from '../../../types';
import ProfileCompletion from './ProfileCompletion';
import { useState } from 'react';

interface DashboardProps {
  profile: Escort | null;
  onUpdate: (updatedData: Partial<Escort>) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ profile, onUpdate }) => {
  const [hoveredOption, setHoveredOption] = useState('');  // Ensure hook is called unconditionally

  if (!profile) return null;  // Conditional return is fine here

  const handleMouseEnter = (option: string) => {
    setHoveredOption(option);
  };

  const handleMouseLeave = () => {
    setHoveredOption('');
  };

  const handleToggle = (field: 'isProfileActive' | 'isReviewActive') => {
    onUpdate({ [field]: !profile[field] });
  };

  return (
    <div className="space-y-8 bg-gray-900 text-white p-4 sm:p-8 rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-8">Dashboard</h2>

      <ProfileCompletion profile={profile} />

      <div className="space-y-4">
        <div className="flex items-center justify-between relative">
          <span
            onMouseEnter={() => handleMouseEnter('isProfileActive')}
            onMouseLeave={handleMouseLeave}
            className="cursor-pointer"
          >
            Profile Active Status
          </span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={profile.isProfileActive}
              onChange={() => handleToggle('isProfileActive')}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent-gold rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-gold"></div>
          </label>
          {hoveredOption === 'isProfileActive' && (
            <div className="absolute top-8 left-0 bg-gray-700 text-white text-sm p-2 rounded z-10">
              {profile.isProfileActive
                ? 'Your profile is active, so customers can see it.'
                : 'Your profile is inactive, so customers cannot see it.'}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between relative">
          <span
            onMouseEnter={() => handleMouseEnter('isReviewActive')}
            onMouseLeave={handleMouseLeave}
            className="cursor-pointer"
          >
            Reviews Active Status
          </span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={profile.isReviewActive}
              onChange={() => handleToggle('isReviewActive')}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent-gold rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-gold"></div>
          </label>
          {hoveredOption === 'isReviewActive' && (
            <div className="absolute top-8 left-0 bg-gray-700 text-white text-sm p-2 rounded z-10">
              {profile.isReviewActive
                ? 'Your review section is visible.'
                : 'Your review section is hidden.'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
