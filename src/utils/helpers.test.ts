import { describe, it, expect } from 'vitest';
import { formatPrice, slugify, isValidEmail } from './helpers';

describe('formatPrice', () => {
  it('should format cents to euros correctly', () => {
    expect(formatPrice(1500)).toBe('15.00 €');
    expect(formatPrice(999)).toBe('9.99 €');
    expect(formatPrice(0)).toBe('0.00 €');
  });

  it('should handle large amounts', () => {
    expect(formatPrice(100000)).toBe('1000.00 €');
  });

  it('should throw error for negative values', () => {
    expect(() => formatPrice(-100)).toThrow('Price cannot be negative');
  });
});

describe('slugify', () => {
  it('should convert text to lowercase slug', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });

  it('should remove accents', () => {
    expect(slugify('Café Frappé')).toBe('cafe-frappe');
    expect(slugify('Château de François')).toBe('chateau-de-francois');
  });

  it('should replace special characters with hyphens', () => {
    expect(slugify('Test & Demo!')).toBe('test-demo');
  });

  it('should remove leading and trailing hyphens', () => {
    expect(slugify('---test---')).toBe('test');
  });

  it('should handle empty strings', () => {
    expect(slugify('')).toBe('');
  });
});

describe('isValidEmail', () => {
  it('should validate correct emails', () => {
    expect(isValidEmail('test@example.com')).toBe(true);
    expect(isValidEmail('user.name+tag@example.co.uk')).toBe(true);
  });

  it('should reject invalid emails', () => {
    expect(isValidEmail('invalid')).toBe(false);
    expect(isValidEmail('test@')).toBe(false);
    expect(isValidEmail('@example.com')).toBe(false);
    expect(isValidEmail('test @example.com')).toBe(false);
  });

  it('should handle empty strings', () => {
    expect(isValidEmail('')).toBe(false);
  });
});
