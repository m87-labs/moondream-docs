import { FC, ReactNode, Children, isValidElement } from 'react'

interface RecipeProps {
  title: string
  description: string
  github: string
  demo?: string
  tags?: string[]
  children?: ReactNode
}

interface FeatureProps {
  icon?: string
  title: string
  children: ReactNode
}

interface CodePreviewProps {
  filename: string
  sourceUrl: string
  children: ReactNode
}

const Feature: FC<FeatureProps> = ({ icon = "✨", title, children }) => (
  <div className="flex gap-3 items-start mb-4">
    <div className="text-lg mt-0.5">{icon}</div>
    <div>
      <h4 className="font-medium text-gray-900">{title}</h4>
      <div className="text-gray-600 text-sm">{children}</div>
    </div>
  </div>
)

const CodePreview: FC<CodePreviewProps> = ({ filename, sourceUrl, children }) => (
  <div className="mt-6 relative group">
    <div className="rounded-lg overflow-hidden border border-gray-200 transition-opacity group-hover:opacity-50">
      <div className="bg-gray-50 text-gray-600 text-sm px-4 py-2 font-mono border-b border-gray-200">
        {filename}
      </div>
      <div className="bg-white p-4 overflow-x-auto relative">
        <pre className="text-gray-800 text-sm max-h-[300px] overflow-hidden">
          {children}
        </pre>
        <div 
          className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none"
          aria-hidden="true"
        />
      </div>
    </div>
    <a 
      href={sourceUrl}
      target="_blank"
      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
    >
      <span className="px-4 py-2 bg-[#565872] text-white rounded-lg flex items-center gap-2 hover:bg-[#6E7087] shadow-lg">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
        View Full Source
      </span>
    </a>
  </div>
)

const Recipe: FC<RecipeProps> & {
  Feature: typeof Feature;
  CodePreview: typeof CodePreview;
} = ({ 
  title, 
  description, 
  github, 
  demo, 
  tags = [],
  children 
}) => {
  const codePreview = Children.toArray(children).find(
    child => isValidElement(child) && child.type === CodePreview
  );
  
  const features = Children.toArray(children).filter(
    child => isValidElement(child) && child.type === Feature
  );

  return (
    <div className="mt-12 mb-12 bg-white rounded-xl overflow-hidden border border-gray-200">
      <div className="p-4 sm:p-8 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
          <div className="flex flex-wrap gap-3">
            <a 
              href={github}
              target="_blank"
              className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all"
            >
              <svg className="w-5 h-5 mr-2 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              View Source
            </a>
            {demo && (
              <a 
                href={demo}
                target="_blank"
                className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 rounded-lg bg-[#565872] text-white hover:bg-[#6E7087] transition-colors"
              >
                Try Demo →
              </a>
            )}
          </div>
        </div>
        
        <p className="mt-3 text-gray-600">{description}</p>
        
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {tags.map(tag => (
              <span 
                key={tag} 
                className="px-2.5 py-1 text-sm bg-[#F7F7F8] text-[#565872] rounded-md border border-[#E5E5E7]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="p-4 sm:p-8">
        <div>
          <h3 className="font-medium text-[#565872] mb-4">Demo</h3>
          {codePreview}
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <h3 className="font-medium text-[#565872] mb-6">Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features}
          </div>
        </div>
      </div>
    </div>
  )
}

Recipe.Feature = Feature
Recipe.CodePreview = CodePreview

export default Recipe