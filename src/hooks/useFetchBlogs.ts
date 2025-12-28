import { useEffect } from 'react';
import { useBlogStore } from '../store/blogStore';

export function useFetchBlogs() {
  const { blogs, loading, error, fetchBlogs, refreshBlogs } = useBlogStore();

  useEffect(() => {
    fetchBlogs();
  }, []);

  return {
    blogs,
    loading,
    error,
    refetch: fetchBlogs,
    refresh: refreshBlogs,
  };
}




