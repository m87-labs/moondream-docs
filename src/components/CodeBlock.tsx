'use client';

import { CopyButton } from './CopyButton';

interface CodeBlockProps {
  language?: string;
  children?: React.ReactNode;
  className?: string;
}

export function CodeBlock({ children, className, ...props }: CodeBlockProps) {
  const isDark = true; // Assuming a variable to determine dark mode

  return (
    <div className="group relative">
      <div className={`relative bg-code-background ${
        isDark ? 'bg-[#1A1A1A] border-white/20' : 'bg-[#FAFAF9] border-black/40'
      }`}>
        <pre className={`${className || ''} whitespace-pre-wrap break-words pl-4 py-2 pr-12`} {...props}>
          {children}
        </pre>
        <div className="absolute right-2 top-2">
          <CopyButton />
        </div>
      </div>
    </div>
  );
}