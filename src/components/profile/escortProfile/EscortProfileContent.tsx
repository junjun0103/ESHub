import type React from 'react';
import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { 
  selectUser, 
  selectUserEscortProfile, 
  selectUserStatusProfile,
  setUserEscortProfile,
  setStatusUserProfile
} from '../../../features/user/userSlice';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { fetchUserEscortProfile } from '../../../features/user/userAPI';
import InformationManagement from './InformationManagement';
import MediaSection from './MediaSection';
import PaymentPlans from './PaymentPlans';
import PriceTable from './PriceTable';
import ServiceSection from './ServiceSection';
import Dashboard from './Dashboard';
import StoriesSection from './StoriesSection';
import VerificationSection from './VerificationSection';

const EscortProfileContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const escortProfile = useAppSelector(selectUserEscortProfile);
  const statusUserProfile = useAppSelector(selectUserStatusProfile);

  const [activeSection, setActiveSection] = useState('information');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user && user.userType === 'escort' && !escortProfile) {
        dispatch(setStatusUserProfile('loading'));
        try {
          const useMockData = true; 
          const profile = await fetchUserEscortProfile(user.id,useMockData);
          dispatch(setUserEscortProfile(profile));
          dispatch(setStatusUserProfile('idle'));
        } catch (error) {
          console.error('Failed to fetch escort profile:', error);
          dispatch(setStatusUserProfile('failed'));
        }
      }
    };

    fetchProfile();
  }, [user, escortProfile, dispatch]);

  const handleUpdateProfile = (updatedData: Partial<typeof escortProfile>) => {
    if (user && escortProfile) {
      dispatch(setUserEscortProfile({
        ...escortProfile,
        ...updatedData,
      }));
      // Here you would typically also update the profile in your backend
    }
  };

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsMenuOpen(false);
  };

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'information', label: 'Information' },
    { id: 'media', label: 'Media' },
    { id: 'payment', label: 'Payment Plans' },
    { id: 'prices', label: 'Price Table' },
    { id: 'services', label: 'Services' },
    { id: 'stories', label: 'Stories' },
    { id: 'verification', label: 'Verification' },
  ];

  const renderActiveSection = () => {
    if (statusUserProfile === 'loading') {
      return <div>Loading profile...</div>;
    }

    if (statusUserProfile === 'failed') {
      return <div>Failed to load profile. Please try again later.</div>;
    }

    if (!escortProfile) {
      return <div>No profile data available.</div>;
    }

    switch (activeSection) {
      case 'dashboard':
        return <Dashboard profile={escortProfile} onUpdate={handleUpdateProfile} />;
      case 'information':
        return <InformationManagement profile={escortProfile} onUpdate={handleUpdateProfile} />;
      case 'media':
        return <MediaSection profile={escortProfile} onUpdate={handleUpdateProfile} />;
      case 'payment':
        return <PaymentPlans profile={escortProfile} onUpdate={handleUpdateProfile} />;
      case 'prices':
        return <PriceTable profile={escortProfile} onUpdate={handleUpdateProfile} />;
      case 'services':
        return <ServiceSection profile={escortProfile} onUpdate={handleUpdateProfile} />;
      case 'stories':
        return <StoriesSection profile={escortProfile} />;
      case 'verification':
        return <VerificationSection profile={escortProfile} onUpdate={handleUpdateProfile} />;
      default:
        return <div>Select a section</div>;
    }
  };

  return (
    <div>
      {/* Mobile and Tablet Navigation */}
      <div className="md:hidden mb-6">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="w-full flex items-center justify-between px-4 py-2 bg-accent-gold text-white rounded-md"
        >
          <span>{navigationItems.find(item => item.id === activeSection)?.label}</span>
          <ChevronDownIcon className={`w-5 h-5 transition-transform ${isMenuOpen ? 'transform rotate-180' : ''}`} />
        </button>
        {isMenuOpen && (
          <ul className="mt-2 border border-accent-gold rounded-md overflow-hidden">
            {navigationItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleSectionChange(item.id)}
                  className={`w-full text-left px-4 py-2 ${
                    activeSection === item.id
                      ? 'bg-accent-gold text-white'
                      : 'text-accent-gold hover:bg-accent-gold hover:bg-opacity-10'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:block mb-6">
        <ul className="flex flex-wrap space-x-2">
          {navigationItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveSection(item.id)}
                className={`px-3 py-2 rounded-md transition-all duration-300 ${
                  activeSection === item.id
                    ? 'bg-accent-gold text-white shadow-md'
                    : 'text-accent-gold hover:bg-accent-gold hover:bg-opacity-10'
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {renderActiveSection()}
    </div>
  );
};

export default EscortProfileContent;