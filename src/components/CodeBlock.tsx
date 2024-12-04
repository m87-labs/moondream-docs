'use client';

import { CopyButton } from './CopyButton';

interface CodeBlockProps {
  code: string;
  language?: string;
  children?: React.ReactNode;
  className?: string;
}

export function CodeBlock({ code, children, className, ...props }: CodeBlockProps) {
  return (
    <div className="group relative">
      <div className="border-x border-gray-300 dark:border-gray-700">
        <pre className={`${className || ''} whitespace-pre-wrap break-words pl-4 py-2`} {...props}>
          {children}
        </pre>
        <CopyButton code={code} />
      </div>
    </div>
  );
}