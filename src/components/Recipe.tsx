import { FC, ReactNode, Children, isValidElement, useState, cloneElement } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import RecipeCard from './RecipeCard'

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
  <motion.div 
    className="flex gap-3 items-start mb-4"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="text-lg mt-0.5">{icon}</div>
    <div>
      <h4 className="font-medium text-[#0D0D0D]">{title}</h4>
      <div className="text-[#585652] text-sm">{children}</div>
    </div>
  </motion.div>
)

const CodePreview: FC<CodePreviewProps> = ({ filename, sourceUrl, children }) => (
  <motion.div 
    className="mt-6 relative group"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="rounded-lg overflow-hidden border border-[#F0EDEE] transition-all duration-200 group-hover:opacity-50 group-hover:border-[#C0B7B0]">
      <div className="bg-[#FAFAF9] text-[#585652] text-sm px-4 py-2 font-mono border-b border-[#F0EDEE]">
        {filename}
      </div>
      <div className="bg-white p-4 overflow-x-auto relative">
        <pre className="text-[#0D0D0D] text-sm max-h-[300px] overflow-hidden">
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
      <span className="px-4 py-2 bg-[#4363CC] text-white rounded-lg flex items-center gap-2 hover:bg-[#9FB6EB] shadow-lg transition-colors duration-200">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
        View Full Source
      </span>
    </a>
  </motion.div>
)

const Recipe: FC<RecipeProps> & {
  Feature: typeof Feature;
  CodePreview: typeof CodePreview;
} = ({ title, description, github, demo, tags = [], children }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageLoadFailed, setImageLoadFailed] = useState(false);
  
  const features = Children.toArray(children).filter(
    child => isValidElement(child) && child.type === Feature
  );

  const codePreview = Children.toArray(children).find(
    child => isValidElement(child) && child.type === CodePreview
  );

  const imagePreview = Children.toArray(children).find(
    child => isValidElement(child) && child.type === 'img'
  );

  // Clone the image element with onError handler if it exists
  const imageWithErrorHandler = imagePreview && isValidElement(imagePreview) ? 
    cloneElement(imagePreview as React.ReactElement, {
      onError: () => setImageLoadFailed(true)
    }) : null;

  const previewContent = imageLoadFailed ? codePreview : imageWithErrorHandler;

  return (
    <AnimatePresence mode="wait">
      {!isExpanded ? (
        <motion.div 
          className="relative group mt-4 mb-4"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <RecipeCard
            title={title}
            description={description}
            tags={tags}
            sourceUrl={github}
            demoUrl={demo}
          />
          <button
            onClick={() => setIsExpanded(true)}
            className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/5 opacity-0 group-hover:opacity-100 transition-all duration-200 rounded-lg"
          >
            <span className="px-4 py-2 bg-white text-[#0D0D0D] rounded-lg shadow-lg flex items-center gap-2 hover:bg-[#F0EDEE] hover:scale-105 transition-all duration-200">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              Show Details
            </span>
          </button>
        </motion.div>
      ) : (
        <motion.div 
          className="mt-4 mb-4 bg-[#FAFAF9] border border-black/40 rounded-xl overflow-hidden hover:border-black/90 transition-all duration-150"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-4 sm:p-8 pb-6">
            <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-4">
              <h2 className="text-2xl font-semibold text-[#0D0D0D]">{title}</h2>
              <div className="flex flex-col xl:flex-row gap-3 w-full xl:w-auto">
                <a 
                  href={github}
                  target="_blank"
                  className="inline-flex items-center justify-center px-4 py-2 rounded-lg border border-[#F0EDEE] hover:border-[#C0B7B0] hover:bg-[#F0EDEE] hover:scale-105 transition-all duration-200"
                >
                  <svg className="w-5 h-5 mr-2 text-[#585652]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  View Source
                </a>
                {demo && (
                  <a 
                    href={demo}
                    target="_blank"
                    className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-[#4363CC] text-white hover:bg-[#9FB6EB] hover:scale-105 transition-all duration-200"
                  >
                    Try now →
                  </a>
                )}
              </div>
            </div>
            
            <p className="mt-3 text-[#585652]">{description}</p>
            
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {tags.map(tag => (
                  <span 
                    key={tag} 
                    className="px-2.5 py-1 text-sm bg-[#F0EDEE] text-[#585652] rounded-md border border-[#C0B7B0] transition-colors duration-200 hover:bg-[#C0B7B0]/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <motion.div 
            className="px-4 sm:px-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            {previewContent && (
              <div>
                {previewContent}
              </div>
            )}

            <div className={`${previewContent ? 'mt-8 pt-8 border-t' : ''} border-gray-200`}>
              <h3 className="font-medium text-[#565872] mb-6">Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {features}
              </div>
            </div>
          </motion.div>

          <div className="flex justify-center pb-8">
            <button
              onClick={() => setIsExpanded(false)}
              className="inline-flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:scale-105 transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
              Show Less
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

Recipe.Feature = Feature;
Recipe.CodePreview = CodePreview;

export default Recipe;