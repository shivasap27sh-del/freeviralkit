import { checkInputSafety } from '@/lib/content-safety';

/**
 * Universal Input Validation, Sanitization & Type Invariant Helpers
 */

export interface ValidationResult<T> {
  isValid: boolean;
  value?: T;
  error?: string;
}

/**
 * Strips zero-width characters, control codes, and enforces character bounds.
 * Audits input with content safety filter to maintain AdSense and GDPR compliance.
 */
export function sanitizeAndValidateInput(
  input: unknown,
  maxLength = 200,
  fieldName = 'Topic'
): string {
  if (typeof input !== 'string') {
    throw new Error(`${fieldName} must be a valid text string.`);
  }

  let trimmed = input.trim();
  if (!trimmed) {
    throw new Error(`${fieldName} cannot be empty.`);
  }

  if (trimmed.length > maxLength) {
    trimmed = trimmed.substring(0, maxLength);
  }

  // Strip control characters & zero-width invisible unicode
  trimmed = trimmed
    .replace(/[\u0000-\u001F\u007F-\u009F\u200B-\u200D\uFEFF]/g, '')
    .trim();

  if (!trimmed) {
    throw new Error(`${fieldName} contains invalid characters.`);
  }

  const safetyCheck = checkInputSafety(trimmed);
  if (!safetyCheck.safe) {
    throw new Error(`CONTENT_SAFETY: ${safetyCheck.reason || 'Input violates content moderation rules.'}`);
  }

  return trimmed;
}

/**
 * Validates an array of strings (e.g. exclude lists or tags)
 */
export function sanitizeStringArray(items: unknown, maxItems = 50, maxLength = 100): string[] {
  if (!Array.isArray(items)) return [];

  const sanitized: string[] = [];
  for (const item of items) {
    if (typeof item === 'string') {
      try {
        const clean = sanitizeAndValidateInput(item, maxLength, 'Item');
        if (clean && !sanitized.includes(clean)) {
          sanitized.push(clean);
        }
      } catch {
        // Skip invalid exclude items without throwing
      }
    }
    if (sanitized.length >= maxItems) break;
  }

  return sanitized;
}
