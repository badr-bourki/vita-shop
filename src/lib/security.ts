/**
 * Security utilities for safe redirects and URL handling
 */

/**
 * Sanitizes a redirect path to prevent open redirect vulnerabilities.
 * Only allows same-origin relative paths that start with "/".
 * 
 * @param path - The path to sanitize
 * @param fallback - Fallback path if sanitization fails (default: '/')
 * @returns A safe redirect path
 */
export function sanitizeRedirectPath(path: unknown, fallback: string = '/'): string {
  // Must be a string
  if (typeof path !== 'string') {
    return fallback;
  }

  // Trim whitespace
  const trimmed = path.trim();

  // Empty string gets fallback
  if (!trimmed) {
    return fallback;
  }

  // Must start with a single forward slash (not protocol-relative //)
  if (!trimmed.startsWith('/') || trimmed.startsWith('//')) {
    return fallback;
  }

  // Decode and check for dangerous patterns
  let decoded: string;
  try {
    decoded = decodeURIComponent(trimmed);
  } catch {
    // Invalid encoding
    return fallback;
  }

  // Check for protocol-relative URLs after decoding
  if (decoded.startsWith('//')) {
    return fallback;
  }

  // Block dangerous protocols (case-insensitive)
  const lowerDecoded = decoded.toLowerCase();
  const dangerousPatterns = [
    'javascript:',
    'data:',
    'vbscript:',
    'http:',
    'https:',
    'ftp:',
    'file:',
    'mailto:',
    'tel:',
  ];

  for (const pattern of dangerousPatterns) {
    if (lowerDecoded.includes(pattern)) {
      return fallback;
    }
  }

  // Block backslashes (can be used for URL manipulation in some browsers)
  if (trimmed.includes('\\')) {
    return fallback;
  }

  // Block null bytes
  if (trimmed.includes('\0') || trimmed.includes('%00')) {
    return fallback;
  }

  // Path is safe
  return trimmed;
}

/**
 * Validates if a URL is safe for external navigation
 * Only allows http/https protocols
 */
export function isValidExternalUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Creates a safe mailto link with encoded parameters
 */
export function createSafeMailtoLink(
  email: string,
  subject?: string,
  body?: string
): string {
  const params = new URLSearchParams();
  if (subject) params.set('subject', subject);
  if (body) params.set('body', body);
  
  const queryString = params.toString();
  return `mailto:${encodeURIComponent(email)}${queryString ? '?' + queryString : ''}`;
}
