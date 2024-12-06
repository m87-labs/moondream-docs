import { ReactNode, useState } from 'react'
import cn from 'classnames'

interface NotePadProps {
  children: ReactNode
  readingTime?: string
  preview?: string
}

interface SectionProps {
  title: string
  children: ReactNode
}

interface TimelineItemProps {
  era: string
  title: string
  children: ReactNode
}

interface NoteProps {
  type?: 'highlight' | 'warning' | 'info'
  children: ReactNode
}

interface BulletListProps {
  children: ReactNode
}

interface BulletProps {
  children: ReactNode
}

interface HighlightProps {
  color?: 'yellow' | 'blue' | 'green' | 'pink'
  children: ReactNode
}

interface SideNoteProps {
  children: ReactNode
}

function truncateText(text: string, maxLength: number = 500): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...'
}

export function NotePad({ children, readingTime, preview }: NotePadProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="my-4 sm:my-8 p-4 sm:p-8 bg-white rounded-xl border border-gray-200 relative">
      {readingTime && (
        <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex items-center gap-1.5 text-sm text-gray-500 font-geist">
          <span className="font-mono">⌚</span>
          <span>{readingTime}</span>
        </div>
      )}
      <div className="relative">
        <div 
          className={cn(
            "prose prose-sm sm:prose max-w-none notepad-content font-geist tracking-wide",
            !isExpanded && "max-h-[250px] overflow-hidden py-4"
          )}
        >
          {isExpanded ? children : (
            <div>
              {preview || truncateText(children?.toString() || '')}
            </div>
          )}
        </div>
        
        {!isExpanded && (
          <div className="absolute bottom-0 left-0 right-0">
            <div className="h-24 bg-gradient-to-t from-white to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-2">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-white 
                  text-gray-600 hover:text-gray-900 
                  rounded-full shadow-sm hover:shadow transition-all border border-gray-200"
              >
                <span>Read more</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
        
        {isExpanded && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setIsExpanded(false)}
              className="flex items-center gap-2 px-4 py-2 text-sm bg-white 
                text-gray-600 hover:text-gray-900 
                rounded-full shadow-sm hover:shadow transition-all border border-gray-200"
            >
              <span>Show less</span>
              <svg
                className="w-4 h-4 transform rotate-180"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

NotePad.Section = function Section({ title, children }: SectionProps) {
  return (
    <div className="mb-8 last:mb-0">
      <h3 className="text-lg sm:text-2xl font-semibold mb-4 font-geist tracking-wide">{title}</h3>
      <div className="pl-4 border-l-2 border-gray-200">
        <div className="space-y-4">
          {children}
        </div>
      </div>
    </div>
  )
}

NotePad.Timeline = function Timeline({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-8">
      {children}
    </div>
  )
}

NotePad.TimelineItem = function TimelineItem({ era, title, children }: TimelineItemProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[150px,1fr] gap-4">
      <div className="text-gray-500 font-medium font-geist tracking-wide">{era}</div>
      <div>
        <h4 className="font-semibold mb-2 font-geist tracking-wide">{title}</h4>
        <div className="text-gray-600">
          <div className="space-y-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

NotePad.Note = function Note({ type = 'info', children }: NoteProps) {
  return (
    <div className={cn(
      'p-4 rounded-lg my-4',
      {
        'bg-blue-50 border border-blue-200': type === 'info',
        'bg-amber-50 border border-amber-200': type === 'warning',
        'bg-gray-50 border border-gray-200': type === 'highlight'
      }
    )}>
      <div className="text-gray-700 font-geist tracking-wide">{children}</div>
    </div>
  )
}

NotePad.Columns = function Columns({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {children}
    </div>
  )
}

NotePad.Column = function Column({ title, children }: SectionProps) {
  return (
    <div>
      <h4 className="font-semibold mb-2 font-geist tracking-wide">{title}</h4>
      <div className="text-sm text-gray-600 font-mono tracking-wide whitespace-pre-line">
        {children}
      </div>
    </div>
  )
}

NotePad.BulletList = function BulletList({ children }: BulletListProps) {
  return (
    <div className="space-y-2">
      {children}
    </div>
  )
}

NotePad.Bullet = function Bullet({ children }: BulletProps) {
  return (
    <div className="flex items-start gap-2">
      <span className="text-gray-400 leading-[1.8]">•</span>
      <div className="flex-1">{children}</div>
    </div>
  )
}

NotePad.Highlight = function Highlight({ color = 'yellow', children }: HighlightProps) {
  return (
    <span className={cn(
      'px-1 py-0.5 rounded-sm font-medium',
      {
        'bg-yellow-100': color === 'yellow',
        'bg-blue-100': color === 'blue',
        'bg-green-100': color === 'green',
        'bg-pink-100': color === 'pink',
      }
    )}>
      {children}
    </span>
  )
}

NotePad.SideNote = function SideNote({ children }: SideNoteProps) {
  return (
    <div className="relative pl-4 my-4 italic text-sm text-gray-500 before:content-['*'] before:absolute before:left-0 before:top-[2px]">
      {children}
    </div>
  )
}