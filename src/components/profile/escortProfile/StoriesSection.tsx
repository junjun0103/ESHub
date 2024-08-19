import type React from 'react';
import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { selectUser } from '../../../features/user/userSlice';
import { fetchStoriesAsync, addStoryAsync, deleteStoryAsync, selectStories } from '../../../features/stories/storiesSlice';
import { uploadFile } from '../../../utils/firebase';
import type { Escort } from '../../../types';


interface StoriesSectionProps {
  profile: Escort | null;
}

const StoriesSection: React.FC<StoriesSectionProps> = ({profile}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const stories = useAppSelector(selectStories);
  const [newStoryImages, setNewStoryImages] = useState<File[]>([]);
  const [newStoryDescription, setNewStoryDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (user) {
      dispatch(fetchStoriesAsync(user.id));
    }
  }, [dispatch, user]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).slice(0, 5); // Limit to 5 files
      setNewStoryImages(filesArray);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newStoryImages.length === 0 || !user) return;

    if (profile?.paymentPlan?.tier !== 'Premium' && profile?.paymentPlan?.tier !== 'Diamond') {
      alert('Only premium and diamond members can upload stories.');
      return;
    }

    const todayStories = stories.filter(story => 
      new Date(story.createdAt).toDateString() === new Date().toDateString()
    );

    if (todayStories.length >= 3) {
      alert('You have reached the limit of 3 stories per day.');
      return;
    }

    setUploading(true);
    try {
      const imageUrls = await Promise.all(
        newStoryImages.map(image => 
          uploadFile(`stories/${user.id}/${Date.now()}_${image.name}`, image)
        )
      );

      const now = Date.now();
      await dispatch(addStoryAsync({
        userId: user.id,
        imageUrls,
        description: newStoryDescription,
        createdAt: now,
        expiresAt: now + 24 * 60 * 60 * 1000, // 24 hours from now
        views: 0,
      }));

      setNewStoryImages([]);
      setNewStoryDescription('');
    } catch (error) {
      console.error('Error uploading story:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteStory = (storyId: string) => {
    dispatch(deleteStoryAsync(storyId));
  };

  const getTimeLeft = (expiresAt: number) => {
    const timeLeft = expiresAt - Date.now();
    const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));
    return hoursLeft > 0 ? `${hoursLeft} hours left` : 'Expiring soon';
  };

  const getWordCount = (str: string) => {
    const trimmedStr = str.trim();
    return trimmedStr === '' ? 0 : trimmedStr.length;
  };

  return (
    <div className="space-y-8 bg-gray-900 text-white p-4 sm:p-8 rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-8">Stories</h2>
      <p className="text-center text-gray-300 mb-4">
        You can upload up to 3 stories per day. Stories will be removed after 24 hours.
      </p>

      {/* ... form for adding new stories ... */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Upload Story Images (Max 5)
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="w-full text-sm text-gray-400
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-accent-gold file:text-white
              hover:file:bg-accent-gold/80"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
            Story Description
          </label>
          <div className="relative">
            <textarea
              id="description"
              value={newStoryDescription}
              onChange={(e) => {
                if (getWordCount(e.target.value) <= 100) {
                  setNewStoryDescription(e.target.value);
                }
              }}
              maxLength={100}
              rows={3}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white"
              placeholder="Describe your story (max 100 characters)"
            /><div className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded">
            {getWordCount(newStoryDescription)}/100
            </div>
          </div>
        </div>
        <button
          type="submit"
          disabled={newStoryImages.length === 0 || uploading}
          className="w-full bg-accent-gold text-gray-900 py-2 px-4 rounded-md font-bold hover:bg-accent-gold/80 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          {uploading ? 'Uploading...' : 'Add Story'}
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
        {stories.map((story) => (
          <div key={story.id} className="bg-gray-800 rounded-lg overflow-hidden">
            <img src={story.imageUrls[0]} alt="Story" className="w-full h-48 object-cover" />
            <div className="p-4">
              <p className="text-sm mb-2">{story.description}</p>
              <p className="text-xs text-gray-400 mb-2">{getTimeLeft(story.expiresAt)}</p>
              <p className="text-xs text-gray-400 mb-2">{story.views} views</p>
              <button
                onClick={() => handleDeleteStory(story.id)}
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                Delete Story
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoriesSection;