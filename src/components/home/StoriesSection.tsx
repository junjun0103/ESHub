import type React from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../../features/user/userSlice';

const StoriesSection: React.FC = () => {
  const currentUser = useAppSelector(selectUser);

  if (!currentUser) {
    return null; // Don't show stories section if user is not logged in
  }

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Stories</h2>
      <div className="flex space-x-4 overflow-x-auto">
        {/* Placeholder for story items */}
        {[1, 2, 3, 4, 5].map((item) => (
          <div key={item} className="flex-shrink-0">
            <div className="w-20 h-20 bg-accent-gold rounded-full"></div>
            <p className="text-center mt-2">User {item}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StoriesSection;