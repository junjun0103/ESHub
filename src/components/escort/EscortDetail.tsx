import type React from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { selectEscorts } from '../../features/escorts/escortsSlice';

const EscortDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const escorts = useAppSelector(selectEscorts);
  const escort = escorts.find(e => e.id === id);

  if (!escort) {
    return <div className="text-center">Escort not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{escort.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img src={escort.photos[0]} alt={escort.name} className="w-full h-64 object-cover rounded-lg" />
          <div className="mt-4 flex justify-between">
            <span className="text-lg">{escort.age} years old</span>
            <span className="text-lg">{escort.location}</span>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-2">About Me</h2>
          <p className="mb-4">{escort.about || 'No description available.'}</p>
          <h2 className="text-2xl font-semibold mb-2">Services</h2>
          <ul className="list-disc list-inside mb-4">
            {escort.services.map((service, index) => (
              <li key={index}>{service}</li>
            ))}
          </ul>
          <h2 className="text-2xl font-semibold mb-2">Rates</h2>
          <p className="text-xl text-accent-gold">${escort.hourlyRate}/hour</p>
        </div>
      </div>
    </div>
  );
};

export default EscortDetail;