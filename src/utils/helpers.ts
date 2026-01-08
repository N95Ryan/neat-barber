/**
 * Format a price in cents to euros
 * @param cents - Price in cents
 * @returns Formatted price string (e.g., "15.00 €")
 */
export function formatPrice(cents: number): string {
  if (cents < 0) {
    throw new Error('Price cannot be negative');
  }
  return `${(cents / 100).toFixed(2)} €`;
}

/**
 * Generate a URL-friendly slug from a string
 * @param text - Text to slugify
 * @returns Slugified string
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9]+/g, '-')     // Replace non-alphanumeric with hyphens
    .replace(/^-+|-+$/g, '');        // Remove leading/trailing hyphens
}

/**
 * Check if a string is a valid email
 * @param email - Email to validate
 * @returns True if valid, false otherwise
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
