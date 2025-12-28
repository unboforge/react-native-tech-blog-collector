import { create } from 'zustand';
import { Blog } from '../types/blog';
import { blogAPI } from '../api/blogAPI';

interface BlogState {
  blogs: Blog[];
  loading: boolean;
  error: string | null;
  setBlogs: (blogs: Blog[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  fetchBlogs: (params?: { limit?: number; offset?: number }) => Promise<void>;
  refreshBlogs: () => Promise<void>;
}

export const useBlogStore = create<BlogState>((set) => ({
  blogs: [],
  loading: false,
  error: null,
  
  setBlogs: (blogs) => set({ blogs }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  
  fetchBlogs: async (params = {}) => {
    set({ loading: true, error: null });
    try {
      const data = await blogAPI.getBlogs(params);
      set({ blogs: data.blogs, loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch blogs',
        loading: false 
      });
    }
  },
  
  refreshBlogs: async () => {
    set({ error: null });
    try {
      const data = await blogAPI.getBlogs({ limit: 20, offset: 0 });
      set({ blogs: data.blogs });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to refresh blogs'
      });
    }
  },
}));




