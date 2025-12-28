import { Blog } from './blog';

export interface BlogsResponse {
  blogs: Blog[];
  total: number;
  hasMore: boolean;
}

export interface BlogDetailResponse {
  blog: Blog;
}

export interface ApiError {
  message: string;
  code?: string;
}




