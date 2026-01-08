/**
 * Utility functions for date formatting
 */

/**
 * Format a date string to French format
 * @param dateString - ISO date string from WordPress (e.g., "2025-01-15T10:30:00")
 * @returns Formatted date string (e.g., "15 janvier 2025")
 */
export function formatDateToFrench(dateString: string): string {
  try {
    const date = new Date(dateString);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return dateString;
    }

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    return date.toLocaleDateString('fr-FR', options);
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
}

/**
 * Strip HTML tags from a string and decode HTML entities
 * @param html - HTML string
 * @returns Plain text string
 */
export function stripHtml(html: string): string {
  // Remove WordPress shortcodes (e.g., [vc_row], [caption], etc.)
  let text = html.replace(/\[([^\]]+)\]/g, '');
  
  // Remove HTML tags
  text = text.replace(/<[^>]*>/g, '');
  
  // Decode common HTML entities
  const entities: Record<string, string> = {
    '&nbsp;': ' ',
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#039;': "'",
    '&#8217;': "'",
    '&#8216;': "'",
    '&#8220;': '"',
    '&#8221;': '"',
    '&#8230;': '…',
    '&rsquo;': "'",
    '&lsquo;': "'",
    '&rdquo;': '"',
    '&ldquo;': '"',
    '&hellip;': '…',
    '&mdash;': '—',
    '&ndash;': '–',
  };
  
  // Replace known entities
  Object.keys(entities).forEach(entity => {
    text = text.replace(new RegExp(entity, 'g'), entities[entity]);
  });
  
  // Decode remaining numeric entities (&#xxx; or &#xXXX;)
  text = text.replace(/&#(\d+);/g, (match, dec) => {
    return String.fromCharCode(dec);
  });
  
  text = text.replace(/&#x([0-9a-fA-F]+);/g, (match, hex) => {
    return String.fromCharCode(parseInt(hex, 16));
  });
  
  // Remove extra whitespace
  text = text.replace(/\s+/g, ' ');
  
  return text.trim();
}

/**
 * Truncate text to a maximum length and add ellipsis
 * @param text - Text to truncate
 * @param maxLength - Maximum length (default: 150)
 * @returns Truncated text with ellipsis if needed
 */
export function truncateText(text: string, maxLength: number = 150): string {
  if (text.length <= maxLength) {
    return text;
  }
  
  // Truncate at the last word boundary before maxLength
  const truncated = text.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  if (lastSpace > 0) {
    return truncated.slice(0, lastSpace) + '…';
  }
  
  return truncated + '…';
}

