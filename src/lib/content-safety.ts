/**
 * Content-safety filter for AI-generated output.
 * Runs on the server before returning results to users.
 * Ensures AdSense compliance by filtering unsafe content.
 */

// Blocked content categories with representative terms.
// This is NOT exhaustive — it catches the most common violations.
const BLOCKED_PATTERNS: { category: string; patterns: RegExp[] }[] = [
  {
    category: 'explicit_content',
    patterns: [
      /\b(porn|pornograph|xxx|hentai|onlyfans\s+leak|nude|naked\s+video|sex\s+tape)\b/i,
    ],
  },
  {
    category: 'hate_speech',
    patterns: [
      /\b(kill\s+all|death\s+to\s+all|ethnic\s+cleansing|white\s+supremac|nazi|holocaust\s+denial)\b/i,
    ],
  },
  {
    category: 'violence',
    patterns: [
      /\b(how\s+to\s+make\s+a\s+bomb|how\s+to\s+kill|mass\s+shooting|terrorist\s+attack\s+tutorial)\b/i,
    ],
  },
  {
    category: 'self_harm',
    patterns: [
      /\b(suicide\s+method|how\s+to\s+end\s+your\s+life|self[\s-]?harm\s+tutorial|cutting\s+yourself)\b/i,
    ],
  },
  {
    category: 'illegal_activity',
    patterns: [
      /\b(how\s+to\s+hack\s+bank|credit\s+card\s+fraud|drug\s+dealing\s+guide|money\s+laundering\s+tutorial)\b/i,
    ],
  },
  {
    category: 'personal_info_leak',
    patterns: [
      /\b\d{3}[-.]?\d{2}[-.]?\d{4}\b/, // SSN-like
      /\b\d{16}\b/, // Credit card-like
    ],
  },
];

// HTML/script injection patterns to strip from output
const HTML_STRIP_PATTERN = /<\/?(?:script|iframe|object|embed|form|input|link|style)[^>]*>/gi;
const CONTROL_CHAR_PATTERN = /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g;

export interface SafetyResult {
  safe: boolean;
  filtered: string;
  reason?: string;
}

/**
 * Check if input text (user's topic/query) contains unsafe content.
 * This runs BEFORE sending to the AI provider.
 */
export function checkInputSafety(input: string): SafetyResult {
  const normalized = input.toLowerCase().trim();
  
  for (const { category, patterns } of BLOCKED_PATTERNS) {
    for (const pattern of patterns) {
      if (pattern.test(normalized)) {
        return {
          safe: false,
          filtered: '',
          reason: `Content flagged: ${category.replace(/_/g, ' ')}`,
        };
      }
    }
  }
  
  return { safe: true, filtered: input };
}

/**
 * Sanitize AI output text. Strips HTML injection and control characters.
 * This runs AFTER receiving the AI response.
 */
export function sanitizeOutput(text: string): string {
  let sanitized = text;
  // Strip HTML/script tags
  sanitized = sanitized.replace(HTML_STRIP_PATTERN, '');
  // Strip control characters
  sanitized = sanitized.replace(CONTROL_CHAR_PATTERN, '');
  return sanitized.trim();
}

/**
 * Full safety pipeline: check output for blocked patterns + sanitize.
 * Returns the sanitized text if safe, or an error if blocked.
 */
export function filterAIOutput(text: string): SafetyResult {
  // First sanitize
  const sanitized = sanitizeOutput(text);
  
  // Then check for blocked patterns in the output
  for (const { category, patterns } of BLOCKED_PATTERNS) {
    for (const pattern of patterns) {
      if (pattern.test(sanitized)) {
        return {
          safe: false,
          filtered: '',
          reason: `AI output flagged: ${category.replace(/_/g, ' ')}`,
        };
      }
    }
  }
  
  return { safe: true, filtered: sanitized };
}

/** Safety instruction to append to all AI system prompts */
export const SAFETY_INSTRUCTION = '\n\nCRITICAL SAFETY RULE: Never generate content that is sexually explicit, promotes hate speech, violence, self-harm, illegal activities, or contains personal information like SSNs or credit card numbers. Keep all output family-friendly and advertiser-safe.';
