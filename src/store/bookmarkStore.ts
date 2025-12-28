import { create } from 'zustand';
import { Bookmark, Blog } from '../types/blog';
import { bookmarkService } from '../services/bookmarkService';

interface BookmarkState {
  bookmarks: Bookmark[];
  loading: boolean;
  loadBookmarks: () => void;
  addBookmark: (blog: Blog) => void;
  removeBookmark: (blogId: string) => void;
  isBookmarked: (blogId: string) => boolean;
  clearAllBookmarks: () => void;
}

export const useBookmarkStore = create<BookmarkState>((set, get) => ({
  bookmarks: [],
  loading: false,
  
  loadBookmarks: () => {
    set({ loading: true });
    const bookmarks = bookmarkService.getAllBookmarks();
    set({ bookmarks, loading: false });
  },
  
  addBookmark: (blog) => {
    const newBookmark = bookmarkService.addBookmark(blog);
    set((state) => ({
      bookmarks: [newBookmark, ...state.bookmarks],
    }));
  },
  
  removeBookmark: (blogId) => {
    bookmarkService.removeBookmark(blogId);
    set((state) => ({
      bookmarks: state.bookmarks.filter((b) => b.blogId !== blogId),
    }));
  },
  
  isBookmarked: (blogId) => {
    const { bookmarks } = get();
    return bookmarks.some((b) => b.blogId === blogId);
  },
  
  clearAllBookmarks: () => {
    bookmarkService.clearAllBookmarks();
    set({ bookmarks: [] });
  },
}));




