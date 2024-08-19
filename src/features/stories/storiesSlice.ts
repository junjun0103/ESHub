import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import type { Story } from '../../types';
import { fetchStoriesByUserId, addStory, updateStory, deleteStory } from './storiesAPI';

interface StoriesState {
  items: Story[];
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

const initialState: StoriesState = {
  items: [],
  status: 'idle',
  error: null,
};

const useMockData = [{
  id: '1',
  userId: 'user1',
  imageUrls: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
  description: 'A lovely day at the beach',
  createdAt: Date.now() - 86400000, // 1 day ago
}]

export const fetchStoriesAsync = createAsyncThunk(
  'stories/fetchStories',
  async (userId: string, { getState }) => {
    const response = await fetchStoriesByUserId(userId, true);
    return response;
  }
);

export const addStoryAsync = createAsyncThunk(
  'stories/addStory',
  async (story: Omit<Story, 'id'>, { getState }) => {
    const response = await addStory(story, true);
    return response;
  }
);

export const updateStoryAsync = createAsyncThunk(
  'stories/updateStory',
  async ({ id, story }: { id: string; story: Partial<Story> }, { getState }) => {
    await updateStory(id, story, true);
    return { id, ...story };
  }
);

export const deleteStoryAsync = createAsyncThunk(
  'stories/deleteStory',
  async (id: string, { getState }) => {
    await deleteStory(id, true);
    return id;
  }
);

export const storiesSlice = createSlice({
  name: 'stories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStoriesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStoriesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
      })
      .addCase(fetchStoriesAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(addStoryAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateStoryAsync.fulfilled, (state, action) => {
        const index = state.items.findIndex(story => story.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = { ...state.items[index], ...action.payload };
        }
      })
      .addCase(deleteStoryAsync.fulfilled, (state, action) => {
        state.items = state.items.filter(story => story.id !== action.payload);
      });
  },
});

export const selectStories = (state: RootState) => state.stories.items;
export const selectStoriesStatus = (state: RootState) => state.stories.status;
export const selectStoriesError = (state: RootState) => state.stories.error;

export default storiesSlice.reducer;