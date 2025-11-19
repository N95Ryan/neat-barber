import { v2 as cloudinary } from "cloudinary";

// Configuration Cloudinary avec validation
const config = {
    cloud_name: import.meta.env.CLOUDINARY_CLOUD_NAME,
    api_key: import.meta.env.CLOUDINARY_API_KEY,
    api_secret: import.meta.env.CLOUDINARY_API_SECRET,
};

// Check that all environment variables are defined
const missingVars = Object.entries(config)
    .filter(([key, value]) => !value)
    .map(([key]) => key);

if (missingVars.length > 0) {
    console.warn(`⚠️ Variables Cloudinary manquantes: ${missingVars.join(', ')}`);
}

cloudinary.config(config);

// Types for Cloudinary images
export interface CloudinaryImage {
    id: string;
    url: string;
    thumbnail: string;
    alt: string;
    width: number;
    height: number;
    format: string;
    created_at: string;
}

// Function to get images from clients/neat-barber folder
export async function getCloudinaryImages(): Promise<CloudinaryImage[]> {
    try {
        const result = await cloudinary.api.resources({
            type: 'upload',
            prefix: 'clients/neat-barber/',
            max_results: 100,
            sort_by: 'created_at',
            sort_direction: 'desc'
        });
        
        return result.resources.map((resource: any) => ({
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
    } catch (error) {
        console.error('Erreur lors de la récupération des images Cloudinary:', error);
        return [];
    }
}

// Function to get an optimized image URL
export function getOptimizedImageUrl(publicId: string, options: {
    width?: number;
    height?: number;
    quality?: string;
    format?: string;
    crop?: string;
} = {}) {
    return cloudinary.url(publicId, {
        quality: options.quality || 'auto',
        fetch_format: options.format || 'auto',
        width: options.width,
        height: options.height,
        crop: options.crop || 'fill',
        ...options
    });
}

export default cloudinary;