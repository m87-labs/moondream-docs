'use client';

import { useState, useRef } from 'react';

export function CopyButton() {
  const [copied, setCopied] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const copy = async () => {
    try {
      const button = buttonRef.current;
      const preElement = button?.closest('pre');
      
      if (!preElement) {
        return;
      }

      const textToCopy = preElement.textContent || '';
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <button
      ref={buttonRef}
      onClick={copy}
      className="p-2 rounded-lg bg-[#F0EDEE] hover:bg-[#C0B7B0] text-[#585652] hover:text-[#0D0D0D] transition-colors"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-4 h-4"
      >
        {copied ? (
          <path d="M20 6L9 17L4 12" />
        ) : (
          <>
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
            <path d="M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z" />
          </>
        )}
      </svg>
    </button>
  );
} 