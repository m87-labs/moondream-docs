import { useState, useCallback } from 'react'

const CustomCode = ({ children, className, ...props }: { children: string, className?: string }) => {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = useCallback(() => {
    // Remove any file path or language identifier from the start of the code
    const cleanCode = children.replace(/^.*\n/, '')
    navigator.clipboard.writeText(cleanCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [children])

  return (
    <div className="relative group">
      <pre className={className} {...props}>
        <code>{children}</code>
      </pre>
      <button
        onClick={copyToClipboard}
        className="absolute right-2 top-2 invisible group-hover:visible bg-gray-700 hover:bg-gray-600 text-white rounded px-2 py-1 text-sm"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  )
}

export default CustomCode