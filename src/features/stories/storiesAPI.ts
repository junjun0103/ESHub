import { getDocuments } from "../../utils/firebase"
import type { Story } from "../../types"

// Mock data
const mockStories: Story[] = [
  {
    id: "1",
    userId: "1",
    imageUrls: [
      "https://media.istockphoto.com/id/1416048929/photo/woman-working-on-laptop-online-checking-emails-and-planning-on-the-internet-while-sitting-in.jpg?s=1024x1024&w=is&k=20&c=rsMEfrDiYh3Y2CbJ8OQYRfJZ2kOGBneREKETBn0vyjU=",
      "https://media.istockphoto.com/id/1416048929/photo/woman-working-on-laptop-online-checking-emails-and-planning-on-the-internet-while-sitting-in.jpg?s=1024x1024&w=is&k=20&c=rsMEfrDiYh3Y2CbJ8OQYRfJZ2kOGBneREKETBn0vyjU=",
      "https://media.istockphoto.com/id/1416048929/photo/woman-working-on-laptop-online-checking-emails-and-planning-on-the-internet-while-sitting-in.jpg?s=1024x1024&w=is&k=20&c=rsMEfrDiYh3Y2CbJ8OQYRfJZ2kOGBneREKETBn0vyjU=",
    ],
    description: "A lovely day at the beach",
    createdAt: new Date("2024-08-20T18:00:00Z"),
    expiresAt: new Date(
      new Date("2024-08-20T18:00:00Z").getTime() + 24 * 60 * 60 * 1000,
    ),
    suburb: "Foresthill",
    location: "Auckland",
    latitude: -33.8568,
    longitude: 151.2153,
    views: 120,
  },
  {
    id: "2",
    userId: "2",
    imageUrls: ["https://example.com/image3.jpg"],
    description: "Enjoying a night out",
    createdAt: new Date("2024-08-20T18:00:00Z"),
    expiresAt: new Date(
      new Date("2024-08-20T18:00:00Z").getTime() + 24 * 60 * 60 * 1000,
    ),
    suburb: "Foresthill",
    location: "Auckland",
    latitude: -33.8568,
    longitude: 151.2153,
    views: 110,
  },
  // Add more mock stories as needed
]

export const fetchStoriesByUserId = async (
  userId: string,
  useMockData: boolean = false,
): Promise<Story[]> => {
  if (useMockData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    return mockStories.filter(story => story.userId === userId)
  } else {
    const stories = (await getDocuments(
      "stories",
      "userId",
      "==",
      userId,
    )) as Story[]
    return stories
  }
}

export const addStory = async (
  story: Omit<Story, "id">,
  useMockData: boolean = false,
): Promise<Story> => {
  if (useMockData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    const newStory: Story = {
      ...story,
      id: Date.now().toString(),
    }
    mockStories.push(newStory)
    return newStory
  } else {
    // Implement actual Firebase add document logic here
    throw new Error("Firebase addDocument not implemented")
  }
}

export const updateStory = async (
  id: string,
  story: Partial<Story>,
  useMockData: boolean = false,
): Promise<void> => {
  if (useMockData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    const index = mockStories.findIndex(s => s.id === id)
    if (index !== -1) {
      mockStories[index] = { ...mockStories[index], ...story }
    }
  } else {
    // Implement actual Firebase update document logic here
    throw new Error("Firebase updateDocument not implemented")
  }
}

export const deleteStory = async (
  id: string,
  useMockData: boolean = false,
): Promise<void> => {
  if (useMockData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    const index = mockStories.findIndex(s => s.id === id)
    if (index !== -1) {
      mockStories.splice(index, 1)
    }
  } else {
    // Implement actual Firebase delete document logic here
    throw new Error("Firebase deleteDocument not implemented")
  }
}

export const fetchStories = async (
  useMockData: boolean = false,
): Promise<Story[]> => {
  if (useMockData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    return mockStories
  } else {
    const stories = (await getDocuments("stories")) as Story[]
    return stories
  }
}
