import { apiClient } from './client';
import { BlogsResponse, BlogDetailResponse } from '../types/api';

export const blogAPI = {
  getBlogs: async (params: { limit?: number; offset?: number } = {}) => {
    const { limit = 20, offset = 0 } = params;
    const response = await apiClient.get<BlogsResponse>('/api/blogs', {
      params: { limit, offset },
    });
    return response.data;
  },

  getBlogById: async (id: string) => {
    const response = await apiClient.get<BlogDetailResponse>(`/api/blogs/${id}`);
    return response.data;
  },
};




