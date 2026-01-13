/**
 * Transform all images in HTML content to use Cloudinary optimization
 * with standardized dimensions (872x491)
 */
export function transformImagesToCloudinary(html: string): string {
  if (!html) return html;

  // Regular expression to match img tags
  const imgRegex = /<img([^>]*)src=["']([^"']+)["']([^>]*)>/gi;

  return html.replace(imgRegex, (match, beforeSrc, src, afterSrc) => {
    // Transform the image URL if it's from Cloudinary
    const optimizedSrc = transformCloudinaryUrl(src);

    // Build the new img tag with optimized src and consistent styling
    return `<img${beforeSrc}src="${optimizedSrc}"${afterSrc} style="width: 100%; max-width: 872px; height: auto; border-radius: 10px; margin: 30px auto; display: block; object-fit: cover;">`;
  });
}

/**
 * Transform a Cloudinary URL to apply optimization parameters
 */
function transformCloudinaryUrl(url: string): string {
  // Check if it's a Cloudinary URL
  if (url.includes("cloudinary.com")) {
    const parts = url.split("/upload/");
    if (parts.length === 2) {
      // Apply transformations: width 872px, height 491px, crop to fill, quality 80, format auto
      return `${parts[0]}/upload/w_872,h_491,c_fill,q_80,f_auto/${parts[1]}`;
    }
  }
  // If not Cloudinary, return original URL
  return url;
}
