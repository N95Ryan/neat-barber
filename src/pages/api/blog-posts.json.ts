import type { APIRoute } from 'astro';
import { getPaginatedPosts, getAllPosts } from '../../data/blog-posts';

export const GET: APIRoute = async ({ url }) => {
  try {
    const page = parseInt(url.searchParams.get('page') || '1');
    const postsPerPage = parseInt(url.searchParams.get('limit') || '6');
    
    // Validation des paramètres
    if (page < 1 || postsPerPage < 1) {
      return new Response(JSON.stringify({ 
        error: 'Paramètres invalides' 
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
        'Cache-Control': 'public, max-age=300' // Cache de 5 minutes
      }
    });
  } catch (error) {
    console.error('Erreur API blog-posts:', error);
    return new Response(JSON.stringify({ 
      error: 'Erreur serveur' 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
