import type React from 'react';
import { useRef } from 'react';

interface ModalProps {
  photos: string[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const Modal: React.FC<ModalProps> = ({ photos, currentIndex, onClose, onNext, onPrev }) => {
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].screenX;
    handleSwipe();
  };

  const handleSwipe = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      onNext();
    }

    if (touchStartX.current - touchEndX.current < -50) {
      onPrev();
    }
  };

  const handleClickBackground = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose(); // Close modal when clicking the background
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
      onClick={handleClickBackground}
    >
      <div className="relative max-w-4xl w-full h-full flex items-center justify-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-3xl"
        >
          &times; {/* Close button */}
        </button>
        <div
          className="w-full h-full"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <img
            src={photos[currentIndex]}
            alt={`Photo ${currentIndex + 1}`}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Previous Button */}
        <div
          onClick={onPrev}
          className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 text-white flex items-center justify-center w-16 h-16 cursor-pointer rounded-r-lg"
        >
          <span className="text-2xl">&#10094;</span>
        </div>

        {/* Next Button */}
        <div
          onClick={onNext}
          className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 text-white flex items-center justify-center w-16 h-16 cursor-pointer rounded-l-lg"
        >
          <span className="text-2xl">&#10095;</span>
        </div>

        {/* Indicators */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2">
          {photos.map((_, index) => (
            <span
              key={index}
              className={`block w-3 h-3 rounded-full ${
                index === currentIndex ? 'bg-white' : 'bg-gray-400'
              }`}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modal;
