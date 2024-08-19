import type React from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectEscorts } from '../../features/escorts/escortsSlice';

const PremiumSection: React.FC = () => {
  const escorts = useAppSelector(selectEscorts);
  const premiumEscorts = escorts.slice(0, 4); // Just show first 4 as premium for now

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Premium Escorts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {premiumEscorts.map((escort) => (
          <div key={escort.id} className="bg-secondary rounded-lg overflow-hidden shadow-lg">
            <img src={escort.photos[0]} alt={escort.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-bold text-lg">{escort.name}</h3>
              <p>{escort.location}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PremiumSection;