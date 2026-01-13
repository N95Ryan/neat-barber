/**
 * GraphQL client for WordPress
 * Endpoint: https://admin.neatparis.fr/graphql
 */

// WordPress GraphQL endpoint
const GRAPHQL_ENDPOINT = import.meta.env.WORDPRESS_GRAPHQL_ENDPOINT || 'https://admin.neatparis.fr/graphql';

/**
 * Interface for GraphQL errors
 */
interface GraphQLError {
  message: string;
  locations?: Array<{ line: number; column: number }>;
  path?: string[];
}

/**
 * Interface for GraphQL response
 */
interface GraphQLResponse<T = any> {
  data?: T;
  errors?: GraphQLError[];
}

/**
 * Main function to query WordPress GraphQL API
 * @param query - The GraphQL query
 * @param variables - Optional variables for the query
 * @returns Response data or throws an error
 */
export async function fetchGraphQL<T = any>(
  query: string,
  variables: Record<string, any> = {}
): Promise<T> {
  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    // Check if HTTP request succeeded
    if (!response.ok) {
      throw new Error(
        `HTTP Error: ${response.status} ${response.statusText}`
      );
    }

    const json: GraphQLResponse<T> = await response.json();

    // Check for GraphQL errors
    if (json.errors) {
      const errorMessages = json.errors.map(e => e.message).join(', ');
      throw new Error(`GraphQL Error: ${errorMessages}`);
    }

    // Check that data exists
    if (!json.data) {
      throw new Error('No data returned from GraphQL API');
    }

    return json.data;
  } catch (error) {
    console.error('Error during GraphQL request:', error);
    throw error;
  }
}

/**
 * Query to fetch all post slugs (for getStaticPaths)
 */
export const GET_ALL_SLUGS = `
  query GetAllSlugs {
    posts(first: 100) {
      nodes {
        slug
      }
    }
  }
`;

/**
 * Query to fetch a post by slug
 */
export const GET_POST_BY_SLUG = `
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      title
      slug
      content
      excerpt
      date
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
    }
  }
`;

/**
 * Query to fetch paginated posts
 */
export const GET_PAGINATED_POSTS = `
  query GetPaginatedPosts($first: Int!, $after: String) {
    posts(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      nodes {
        id
        title
        slug
        excerpt
        date
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

/**
 * Query to fetch latest posts
 */
export const GET_LATEST_POSTS = `
  query GetLatestPosts($first: Int!) {
    posts(first: $first) {
      nodes {
        id
        title
        slug
        excerpt
        date
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

/**
 * Query to fetch related posts (excluding current post)
 */
export const GET_RELATED_POSTS = `
  query GetRelatedPosts($first: Int!, $notIn: [ID!]) {
    posts(first: $first, where: { notIn: $notIn }) {
      nodes {
        id
        title
        slug
        excerpt
        date
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;