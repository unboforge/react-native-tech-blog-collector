import { useEffect } from 'react';
import { useBookmarkStore } from '../store/bookmarkStore';

export function useLocalBookmarks() {
  const { bookmarks, loading, loadBookmarks } = useBookmarkStore();

  useEffect(() => {
    loadBookmarks();
  }, []);

  return {
    bookmarks,
    loading,
  };
}




