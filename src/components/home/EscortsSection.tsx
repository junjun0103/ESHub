import type React from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectEscorts } from '../../features/escorts/escortsSlice';

const EscortsSection: React.FC = () => {
  const escorts = useAppSelector(selectEscorts);

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">All Escorts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {escorts.map((escort) => (
          <div key={escort.id} className="bg-secondary rounded-lg overflow-hidden shadow-lg">
            <img src={escort.photos[0]} alt={escort.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-bold text-lg">{escort.name}</h3>
              <p>{escort.location}</p>
              <p className="text-accent-gold">${escort.hourlyRate}/hour</p>
              <p className="text-sm">{escort.services.join(', ')}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EscortsSection;