export interface Blog {
  id: string;
  title: string;
  company: string;
  publishedAt: string;
  url: string;
  feedSourceId: string;
}

export interface Bookmark {
  id: string;
  blogId: string;
  blog: Blog;
  bookmarkedAt: string;
}




