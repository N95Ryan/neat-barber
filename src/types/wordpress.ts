/**
 * TypeScript types for WordPress data via GraphQL
 */

/**
 * Interface for post featured image
 */
export interface FeaturedImage {
  node: {
    sourceUrl: string;
    altText: string;
  };
}

/**
 * Interface for WordPress post
 */
export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  featuredImage?: FeaturedImage;
}

/**
 * Interface for pagination information
 */
export interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
  endCursor: string | null;
}

/**
 * Interface for paginated posts response
 */
export interface PostsResponse {
  posts: {
    pageInfo: PageInfo;
    nodes: Post[];
  };
}

/**
 * Interface for single post response
 */
export interface PostResponse {
  post: Post | null;
}

/**
 * Interface for slugs response
 */
export interface SlugsResponse {
  posts: {
    nodes: Array<{
      slug: string;
    }>;
  };
}

