import type React from 'react';
import { useState } from 'react';
import type { Escort } from '../../../types';
import { uploadFile } from '../../../utils/firebase';

interface MediaSectionProps {
  profile: Escort | null;
  onUpdate: (updatedData: Partial<Escort>) => void;
}

const MediaSection: React.FC<MediaSectionProps> = ({ profile, onUpdate }) => {
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, type: 'profile' | 'detail' | 'video') => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const newMediaUrls: string[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileName = `${Date.now()}_${file.name}`;
        const path = `escorts/${profile?.id}/${type}s/${fileName}`;
        const url = await uploadFile(path, file);
        newMediaUrls.push(url);
      }

      switch (type) {
        case 'profile':
          onUpdate({ profilePhotos: [...(profile?.profilePhotos || []), ...newMediaUrls].slice(0, 3) });
          break;
        case 'detail':
          onUpdate({ photos: [...(profile?.photos || []), ...newMediaUrls].slice(0, 10) });
          break;
        case 'video':
          onUpdate({ videos: [...(profile?.videos || []), ...newMediaUrls].slice(0, 3) });
          break;
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      // You might want to show an error message to the user here
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveMedia = (url: string, type: 'profile' | 'detail' | 'video') => {
    switch (type) {
      case 'profile':
        onUpdate({ profilePhotos: profile?.profilePhotos.filter(photo => photo !== url) || [] });
        break;
      case 'detail':
        onUpdate({ photos: profile?.photos.filter(photo => photo !== url) || [] });
        break;
      case 'video':
        onUpdate({ videos: profile?.videos.filter(video => video !== url) || [] });
        break;
    }
    // You might also want to delete the file from Firebase Storage here
  };

  const renderUploadSection = (type: 'profile' | 'detail' | 'video', maxCount: number) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-300 mb-2">
        Upload {type === 'profile' ? 'Profile Photos' : type === 'detail' ? 'Detail Photos' : 'Videos'} (Max {maxCount})
      </label>
      <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-accent-gold text-gray-900 rounded-md hover:bg-opacity-80 transition-all duration-300">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Choose Files
        <input
          type="file"
          onChange={(e) => handleFileUpload(e, type)}
          accept={type === 'video' ? "video/*" : "image/*"}
          multiple
          className="hidden"
        />
      </label>
      <span className="ml-3 text-sm text-gray-400">
        {type === 'profile' ? '(PNG, JPG up to 5MB each)' : type === 'detail' ? '(PNG, JPG up to 10MB each)' : '(MP4, MOV up to 50MB each)'}
      </span>
    </div>
  );

  const renderMediaList = (mediaList: string[], type: 'profile' | 'detail' | 'video') => (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
      {mediaList.map((media, index) => (
        <div key={index} className="relative group">
          {type === 'video' ? (
            <video src={media} className="h-32 w-full rounded-md object-cover" controls />
          ) : (
            <img src={media} alt={`${type} ${index + 1}`} className="h-32 w-full rounded-md object-cover" />
          )}
          <button
            onClick={() => handleRemoveMedia(media, type)}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer hover:bg-red-600"
            aria-label={`Remove ${type}`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-8 bg-gray-900 text-white p-4 sm:p-8 rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-8">Manage Your Media</h2>

      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-accent-gold mb-4">Profile Photos (Max 3)</h3>
          {renderUploadSection('profile', 3)}
          {renderMediaList(profile?.profilePhotos || [], 'profile')}
        </div>

        <div>
          <h3 className="text-xl font-semibold text-accent-gold mb-4">Detail Photos (Max 10)</h3>
          {renderUploadSection('detail', 10)}
          {renderMediaList(profile?.photos || [], 'detail')}
        </div>

        <div>
          <h3 className="text-xl font-semibold text-accent-gold mb-4">Videos (Max 3)</h3>
          {renderUploadSection('video', 3)}
          {renderMediaList(profile?.videos || [], 'video')}
        </div>
      </div>

      {uploading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <p className="text-gray-900">Uploading... Please wait.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaSection;