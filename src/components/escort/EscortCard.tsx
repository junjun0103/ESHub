import type React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Escort } from '../../types';

interface EscortCardProps {
  escort: Escort;
}

const EscortCard: React.FC<EscortCardProps> = ({ escort }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const displayPhotos = escort.profilePhotos.length > 0 ? escort.profilePhotos : escort.photos;

  const nextPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % displayPhotos.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex - 1 + displayPhotos.length) % displayPhotos.length);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105">
      <div className="relative">
        <img
          src={displayPhotos[currentPhotoIndex] || '/default-profile.jpg'}
          alt={escort.name}
          className="w-full h-48 object-cover"
        />
        {displayPhotos.length > 1 && (
          <>
            <button
              onClick={prevPhoto}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-r cursor-pointer hover:bg-opacity-75 transition-all duration-300"
            >
              &#10094;
            </button>
            <button
              onClick={nextPhoto}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-l cursor-pointer hover:bg-opacity-75 transition-all duration-300"
            >
              &#10095;
            </button>
          </>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-xl mb-2">{escort.name}</h3>
        <p className="text-gray-700 text-sm mb-1">{escort.age} years old</p>
        <p className="text-gray-700 text-sm mb-1">{escort.suburb}, {escort.region}</p>
        <p className="text-gray-700 text-sm mb-2">{escort.nationality}</p>
        <p className="text-accent-gold font-bold mb-2">${escort.hourlyRate}/hour</p>
        <div className="text-sm text-gray-600 mb-2">
          <p>{escort.height}cm • {escort.weight}kg • {escort.bodyType}</p>
          <p>{escort.hairColor} {escort.hairLength} hair • {escort.bustSize}</p>
        </div>
        <div className="mb-2">
          <span className="text-sm font-semibold">Services: </span>
          <span className="text-sm text-gray-700">{escort.services.slice(0, 3).join(', ')}{escort.services.length > 3 ? '...' : ''}</span>
        </div>
        <Link
          to={`/escort/${escort.id}`}
          className="mt-2 inline-block bg-accent-gold text-white py-2 px-4 rounded hover:bg-opacity-80 transition-all duration-300 cursor-pointer"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default EscortCard;