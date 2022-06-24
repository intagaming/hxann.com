export interface PostOrPageFrontmatter {
  title: string;
  slug: string;
  author: string;
  excerpt: string;
  publication_date: string;
}

export interface PostFrontmatter extends PostOrPageFrontmatter {
  cover_url: string;
}

export interface PageFrontmatter extends PostOrPageFrontmatter {
  cover_url: string;
}
