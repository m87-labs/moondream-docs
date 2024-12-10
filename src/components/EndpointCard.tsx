import Link from 'next/link';
import { motion } from 'framer-motion';

interface EndpointCardProps {
  icon: string;
  title: string;
  description: string;
  href: string;
}

const HighlightedText = ({ text }: { text: string }) => {
  const words = text.split(' ');
  const keywords = ['locally', 'cloud', 'detailed', 'real-world'];

  return (
    <>
      {words.map((word, index) => {
        const cleanWord = word.replace(/[.,?!]$/, '');
        const punctuation = word.slice(cleanWord.length);
        
        return (
          <span key={index}>
            {keywords.includes(cleanWord.toLowerCase()) ? (
              <span className="border-b-2 border-blue-300 border-opacity-50">
                {cleanWord}
              </span>
            ) : (
              cleanWord
            )}
            {punctuation}
            {index < words.length - 1 ? ' ' : ''}
          </span>
        );
      })}
    </>
  );
};

export default function EndpointCard({ icon, title, description, href }: EndpointCardProps) {
  return (
    <Link href={href} className="h-full">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.15,
          ease: "easeOut"
        }}
        whileHover={{ 
          y: -2,
          transition: { duration: 0.1 }
        }}
        className="group flex flex-col h-full p-6 bg-white rounded-lg shadow hover:shadow-md transition-all duration-150 cursor-pointer"
      >
        <div className="text-2xl mb-2">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2 text-gray-900">
          {title}
        </h3>
        <p className="text-gray-600 mb-4 flex-grow">
          <HighlightedText text={description} />
        </p>
        <div className="text-blue-500 group-hover:text-blue-600 inline-flex items-center">
          <span>Learn more</span>
          <motion.span
            className="ml-1"
            initial={false}
            animate={{ x: 0 }}
            whileHover={{ x: 2 }}
            transition={{ duration: 0.1 }}
          >
            →
          </motion.span>
        </div>
      </motion.div>
    </Link>
  );
} 