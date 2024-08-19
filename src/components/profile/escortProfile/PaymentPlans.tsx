import type React from 'react';
import { useState, useEffect, useRef } from 'react';
import type { Escort } from '../../../types';

interface PaymentPlansProps {
  profile: Escort | null;
  onUpdate: (updatedData: Partial<Escort>) => void;
}

interface Plan {
  tier: 'Standard' | 'Premium' | 'Diamond';
  durations: {
    [key: string]: number;
  };
  features: string[];
  color: string;
  icon: React.ReactNode;
}

const plans: Plan[] = [
  {
    tier: 'Standard',
    durations: {
      '3 Days': 27.99,
      '1 Week': 47.99,
      '1 Month': 137.99,
    },
    features: [
      'Basic profile visibility',
      'Standard search placement',
      'Randomly top placement',
    ],
    color: 'from-blue-400 to-blue-600',
    icon: <span className="text-2xl">💋</span>,
  },
  {
    tier: 'Premium',
    durations: {
      '3 Days': 39.99,
      '1 Week': 79.99,
      '1 Month': 259.99,
    },
    features: [
      'Enhanced profile visibility',
      'Priority search placement',
      'Enable to upload stories',
    ],
    color: 'from-purple-400 to-purple-600',
    icon: <span className="text-2xl">👑</span>,
  },
  {
    tier: 'Diamond',
    durations: {
      '3 Days': 49.99,
      '1 Week': 99.99,
      '1 Month': 299.99,
    },
    features: [
      'Top profile visibility',
      'Featured in "Diamond Escorts"',
    ],
    color: 'from-pink-400 to-pink-600',
    icon: <span className="text-2xl">💎</span>,
  },
];

const PaymentPlans: React.FC<PaymentPlansProps> = ({ profile, onUpdate }) => {
  const [selectedPlan, setSelectedPlan] = useState<'Standard' | 'Premium' | 'Diamond' | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);
  const [currentPlan, setCurrentPlan] = useState<{tier: 'Standard' | 'Premium' | 'Diamond'; startDate: string; endDate: string} | null>(null);
  const paymentSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (profile?.paymentPlan) {
      setCurrentPlan(profile.paymentPlan);
    }
  }, [profile]);

  const handlePlanSelection = (tier: 'Standard' | 'Premium' | 'Diamond', duration: string) => {
    setSelectedPlan(tier);
    setSelectedDuration(duration);
    if (paymentSectionRef.current) {
      paymentSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPlan && selectedDuration) {
      let newEndDate = new Date();
      if (currentPlan && selectedPlan === currentPlan.tier) {
        newEndDate = new Date(currentPlan.endDate);
      } else {
        newEndDate = new Date();
      }

      switch (selectedDuration) {
        case '3 Days':
          newEndDate.setDate(newEndDate.getDate() + 3);
          break;
        case '1 Week':
          newEndDate.setDate(newEndDate.getDate() + 7);
          break;
        case '1 Month':
          newEndDate.setMonth(newEndDate.getMonth() + 1);
          break;
      }

      onUpdate({
        paymentPlan: {
          tier: selectedPlan,
          duration:selectedDuration,
          startDate: new Date().toISOString().split('T')[0],
          endDate: newEndDate.toISOString().split('T')[0],
        },
      });
    }
  };
  
  return (
    <div className="space-y-8 bg-gray-900 text-white p-8 rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-8">Elevate Your Experience</h2>

      {currentPlan && (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
          <h3 className="text-xl font-bold mb-4 text-accent-gold">Current Membership</h3>
          <p><span className="font-semibold text-gray-400">Tier:</span> {currentPlan.tier}</p>
          <p><span className="font-semibold text-gray-400">Start Date:</span> {currentPlan.startDate}</p>
          <p><span className="font-semibold text-gray-400">End Date:</span> {currentPlan.endDate}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.tier}
            className={`rounded-lg overflow-hidden shadow-lg bg-gray-800 transform transition-all duration-300 hover:scale-105 ${
              selectedPlan === plan.tier ? 'ring-2 ring-accent-gold' : ''
            }`}
          >
            <div className={`p-6 bg-gradient-to-br ${plan.color}`}>
              <div className="text-center mb-4">
                {plan.icon}
                <h3 className="text-2xl font-bold mt-2">{plan.tier}</h3>
              </div>
            </div>
            <div className="p-6">
              <ul className="text-sm mb-6 space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-accent-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="space-y-2">
                {Object.entries(plan.durations).map(([duration, price]) => (
                  <button
                    key={duration}
                    onClick={() => handlePlanSelection(plan.tier, duration)}
                    className="w-full bg-accent-gold text-gray-900 px-4 py-2 rounded hover:bg-opacity-80 transition-colors text-sm font-semibold"
                  >
                    {duration} - ${price}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedPlan && selectedDuration && (
        <div ref={paymentSectionRef} className="mt-8 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-accent-gold">Selected Plan</h3>
          <p><span className="font-semibold text-gray-400">Tier:</span> {selectedPlan}</p>
          <p><span className="font-semibold text-gray-400">Duration:</span> {selectedDuration}</p>
          {currentPlan && currentPlan.tier === selectedPlan ? (
            <p className="mt-4">
              Extending your current plan. New end date:{' '}
              <span className="font-semibold text-accent-gold">
                {new Date(new Date(currentPlan.endDate).getTime() + (
                  selectedDuration === '3 Days' ? 3 * 86400000 :
                  selectedDuration === '1 Week' ? 7 * 86400000 :
                  30 * 86400000
                )).toISOString().split('T')[0]}
              </span>
            </p>
          ) : currentPlan ? (
            <p className="mt-4 text-accent-gold">
              This will override your current plan and start immediately.
            </p>
          ) : null}
          <button
            onClick={handleSubmit}
            className="mt-6 bg-accent-gold text-gray-900 px-8 py-3 rounded-full hover:bg-opacity-80 transition-colors font-bold"
          >
            {currentPlan && currentPlan.tier === selectedPlan ? 'Extend Plan' : 'Upgrade Now'}
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentPlans;