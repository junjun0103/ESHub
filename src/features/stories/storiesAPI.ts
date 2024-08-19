import { getDocuments } from '../../utils/firebase';
import type { Story } from '../../types';

// Mock data
const mockStories: Story[] = [
  {
    id: '1',
    userId: '1',
    imageUrls: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
    description: 'A lovely day at the beach',
    createdAt: Date.now() - 86400000, // 1 day ago
    expiresAt: Date.now() +86400000,
    views:120
  },
  {
    id: '2',
    userId: '2',
    imageUrls: ['https://example.com/image3.jpg'],
    description: 'Enjoying a night out',
    createdAt: Date.now() - 172800000, // 2 days ago
    expiresAt: Date.now() +86400000,
    views:110
  },
  // Add more mock stories as needed
];

export const fetchStoriesByUserId = async (userId: string, useMockData: boolean = false): Promise<Story[]> => {
  if (useMockData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockStories.filter(story => story.userId === userId);
  } else {
    const stories = await getDocuments('stories', 'userId', '==', userId) as Story[];
    return stories;
  }
};

export const addStory = async (story: Omit<Story, 'id'>, useMockData: boolean = false): Promise<Story> => {
  if (useMockData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    const newStory: Story = {
      ...story,
      id: Date.now().toString(),
    };
    mockStories.push(newStory);
    return newStory;
  } else {
    // Implement actual Firebase add document logic here
    throw new Error('Firebase addDocument not implemented');
  }
};

export const updateStory = async (id: string, story: Partial<Story>, useMockData: boolean = false): Promise<void> => {
  if (useMockData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockStories.findIndex(s => s.id === id);
    if (index !== -1) {
      mockStories[index] = { ...mockStories[index], ...story };
    }
  } else {
    // Implement actual Firebase update document logic here
    throw new Error('Firebase updateDocument not implemented');
  }
};

export const deleteStory = async (id: string, useMockData: boolean = false): Promise<void> => {
  if (useMockData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockStories.findIndex(s => s.id === id);
    if (index !== -1) {
      mockStories.splice(index, 1);
    }
  } else {
    // Implement actual Firebase delete document logic here
    throw new Error('Firebase deleteDocument not implemented');
  }
};