'use client';

import { useState, useCallback } from 'react';

/**
 * Shared hook for copy-to-clipboard functionality.
 * Eliminates duplicate copy state logic across all tool components.
 */
export function useCopyToClipboard(resetMs = 2000) {
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

  const copy = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates((p) => ({ ...p, [key]: true }));
      setTimeout(() => setCopiedStates((p) => ({ ...p, [key]: false })), resetMs);
    } catch (err) {
      // Fallback: textarea-based copy for older browsers / insecure contexts
      try {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        setCopiedStates((p) => ({ ...p, [key]: true }));
        setTimeout(() => setCopiedStates((p) => ({ ...p, [key]: false })), resetMs);
      } catch (fallbackErr) {
        console.error('Failed to copy text:', fallbackErr);
      }
    }
  }, [resetMs]);

  return { copiedStates, copy };
}
