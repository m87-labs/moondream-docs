'use client';

import { useState } from 'react';

interface CopyButtonProps {
  code: string;
}

export function CopyButton({ code }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="opacity-0 group-hover:opacity-100 transition-opacity absolute right-4 top-0 rounded-lg border border-gray-200 dark:border-gray-700 p-2 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
      title="Copy code"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 fill-current text-gray-600 dark:text-gray-400"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {copied ? (
          <path d="M20 6H10C8.89543 6 8 6.89543 8 8V20C8 21.1046 8.89543 22 10 22H20C21.1046 22 22 21.1046 22 20V8C22 6.89543 21.1046 6 20 6ZM10 20V8H20V20H10ZM4 2H14V4H4V16H2V4C2 2.89543 2.89543 2 4 2Z" />
        ) : (
          <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5" />
        )}
      </svg>
    </button>
  );
} 