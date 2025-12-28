import { useCallback } from 'react';
import { useBookmarkStore } from '../store/bookmarkStore';
import { Blog } from '../types/blog';

export function useBookmark(blog: Blog) {
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarkStore();
  
  const bookmarked = isBookmarked(blog.id);
  
  const toggleBookmark = useCallback(() => {
    if (bookmarked) {
      removeBookmark(blog.id);
    } else {
      addBookmark(blog);
    }
  }, [bookmarked, blog, addBookmark, removeBookmark]);
  
  return {
    bookmarked,
    toggleBookmark,
  };
}




