import { Platform } from 'react-native';
import { MMKV } from 'react-native-mmkv';
import { Bookmark, Blog } from '../types/blog';

const BOOKMARKS_KEY = 'bookmarks';

// 플랫폼별 저장소 설정
const isWeb = Platform.OS === 'web';
let storage: MMKV | null = null;

if (!isWeb) {
  storage = new MMKV();
}

// 웹용 localStorage 래퍼
const webStorage = {
  getString: (key: string): string | undefined => {
    if (typeof window !== 'undefined') {
      return window.localStorage.getItem(key) || undefined;
    }
    return undefined;
  },
  set: (key: string, value: string): void => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, value);
    }
  },
  delete: (key: string): void => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(key);
    }
  },
};

export const bookmarkService = {
  getAllBookmarks: (): Bookmark[] => {
    try {
      const bookmarksJson = isWeb 
        ? webStorage.getString(BOOKMARKS_KEY)
        : storage?.getString(BOOKMARKS_KEY);
      return bookmarksJson ? JSON.parse(bookmarksJson) : [];
    } catch (error) {
      console.error('Error reading bookmarks:', error);
      return [];
    }
  },

  addBookmark: (blog: Blog): Bookmark => {
    const bookmarks = bookmarkService.getAllBookmarks();
    const newBookmark: Bookmark = {
      id: `bookmark_${Date.now()}_${blog.id}`,
      blogId: blog.id,
      blog,
      bookmarkedAt: new Date().toISOString(),
    };
    
    const updatedBookmarks = [newBookmark, ...bookmarks];
    const dataString = JSON.stringify(updatedBookmarks);
    
    if (isWeb) {
      webStorage.set(BOOKMARKS_KEY, dataString);
    } else {
      storage?.set(BOOKMARKS_KEY, dataString);
    }
    
    return newBookmark;
  },

  removeBookmark: (blogId: string): void => {
    const bookmarks = bookmarkService.getAllBookmarks();
    const updatedBookmarks = bookmarks.filter((b) => b.blogId !== blogId);
    const dataString = JSON.stringify(updatedBookmarks);
    
    if (isWeb) {
      webStorage.set(BOOKMARKS_KEY, dataString);
    } else {
      storage?.set(BOOKMARKS_KEY, dataString);
    }
  },

  isBookmarked: (blogId: string): boolean => {
    const bookmarks = bookmarkService.getAllBookmarks();
    return bookmarks.some((b) => b.blogId === blogId);
  },

  clearAllBookmarks: (): void => {
    if (isWeb) {
      webStorage.delete(BOOKMARKS_KEY);
    } else {
      storage?.delete(BOOKMARKS_KEY);
    }
  },
};

