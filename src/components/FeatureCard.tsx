import { motion } from 'framer-motion';
import Link from 'next/link';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  features: string[];
  href?: string;
}

const HighlightedText = ({ text }: { text: string }) => {
  const words = text.split(' ');
  const keywords = ['extract', 'analyze', 'understand', 'support', 'enable', 'power', 'create', 'generate', 'index', 'track'];

  return (
    <>
      {words.map((word, index) => (
        <>
          {keywords.includes(word.toLowerCase()) ? (
            <span key={index} className="bg-[#9FB6EB]/20 text-[#4363CC] px-1 rounded">
              {word}
            </span>
          ) : (
            word
          )}
          {index < words.length - 1 ? ' ' : ''}
        </>
      ))}
    </>
  );
};

export default function FeatureCard({ icon, title, description, features, href }: FeatureCardProps) {
  const Card = (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.15,
        ease: "easeOut"
      }}
      className={`flex flex-col p-6 bg-[#FAFAF9] border border-black/40 rounded-lg hover:border-black/90 transition-all duration-150 sm:min-h-[460px] md:min-h-[360px] ${
        href ? 'cursor-pointer' : ''
      }`}
    >
      <div className="text-3xl sm:text-2xl mb-2">{icon}</div>
      <h3 className="text-2xl sm:text-xl font-semibold mb-2 text-[#0D0D0D]">{title}</h3>
      <p className="text-lg sm:text-base text-[#585652] mb-4">{description}</p>
      <ul className="text-base sm:text-sm text-[#585652] list-disc list-inside space-y-2 sm:space-y-1">
        {features.map((feature, index) => (
          <li key={index}>
            <HighlightedText text={feature} />
          </li>
        ))}
      </ul>
    </motion.div>
  );

  if (href) {
    return (
      <Link href={href} className="h-full">
        {Card}
      </Link>
    );
  }

  return Card;
} 