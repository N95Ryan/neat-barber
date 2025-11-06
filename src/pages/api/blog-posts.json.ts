import type { APIRoute } from 'astro';
import { getPaginatedPosts, getAllPosts } from '../../data/blog-posts';

export const GET: APIRoute = async ({ url }) => {
  try {
    const page = parseInt(url.searchParams.get('page') || '1');
    const postsPerPage = parseInt(url.searchParams.get('limit') || '6');
    
    // Validate parameters
    if (page < 1 || postsPerPage < 1) {
      return new Response(JSON.stringify({ 
        error: 'Invalid parameters' 
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    const { posts, pagination } = getPaginatedPosts(page, postsPerPage);
    
    return new Response(JSON.stringify({
      posts,
      pagination
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300' // Cache for 5 minutes
      }
    });
  } catch (error) {
    console.error('Blog-posts API error:', error);
    return new Response(JSON.stringify({ 
      error: 'Server error' 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
