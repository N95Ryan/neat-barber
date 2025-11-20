import type { APIRoute } from 'astro';
import { v2 as cloudinary } from 'cloudinary';

// Configuration Cloudinary
cloudinary.config({
    cloud_name: import.meta.env.CLOUDINARY_CLOUD_NAME,
    api_key: import.meta.env.CLOUDINARY_API_KEY,
    api_secret: import.meta.env.CLOUDINARY_API_SECRET,
});

export const GET: APIRoute = async () => {
    try {
        // Get all available images (temporarily)
        const result = await cloudinary.api.resources({
            type: 'upload',
            max_results: 100,
            sort_by: 'created_at',
            sort_direction: 'desc'
        });

        // Filter demo images and transform results
        const images = result.resources
            .filter((resource: any) => {
                // Exclude Cloudinary demo images
                const publicId = resource.public_id.toLowerCase();
                return !publicId.includes('sample') && 
                       !publicId.includes('cld-') && 
                       !publicId.includes('cloudinary') &&
                       !publicId.includes('main-');
            })
            .map((resource: any) => ({
            id: resource.public_id,
            url: cloudinary.url(resource.public_id, {
                quality: 'auto',
                fetch_format: 'auto',
                width: 800,
                height: 600,
                crop: 'fill'
            }),
            thumbnail: cloudinary.url(resource.public_id, {
                quality: 'auto',
                fetch_format: 'auto',
                width: 300,
                height: 200,
                crop: 'fill'
            }),
            alt: resource.public_id.split('/').pop()?.replace(/[-_]/g, ' ') || 'Image galerie',
            width: resource.width,
            height: resource.height,
            format: resource.format,
            created_at: resource.created_at
        }));

        return new Response(JSON.stringify({
            success: true,
            images: images,
            count: images.length
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'public, max-age=300' // Cache de 5 minutes
            }
        });

    } catch (error) {
        console.error('Erreur lors de la récupération des images Cloudinary:', error);
        
        return new Response(JSON.stringify({
            success: false,
            error: 'Erreur lors de la récupération des images',
            images: [],
            count: 0
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
};
