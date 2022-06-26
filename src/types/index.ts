export interface PostOrPageFrontmatter {
  title: string;
  slug: string;
  author: string;
  excerpt: string;
  publication_date: string;
  modified_date?: string;
}

export interface PostFrontmatter extends PostOrPageFrontmatter {
  cover_url: string;
}

export interface PageFrontmatter extends PostOrPageFrontmatter {
  cover_url: string;
}

export interface SEO {
  title: string;
  description: string;
  openGraph: {
    title: string;
    type: string;
    url: string;
    description: string;
    image: string;
    article?: {
      publishedTime: string;
      modifiedTime: string;
      authors: string[];
    };
  };
}
