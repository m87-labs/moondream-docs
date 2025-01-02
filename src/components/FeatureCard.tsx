import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  features: string[];
  href?: string;
}

const HighlightedText = ({ text }: { text: string }) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const words = text.split(' ');
  const keywords = ['extract', 'analyze', 'understand', 'support', 'enable', 'power', 'create', 'generate', 'index', 'track'];

  return (
    <>
      {words.map((word, index) => 
        <span key={index}>
          {keywords.includes(word.toLowerCase()) ? (
            <span className={`${
              isDark ? 'bg-[#4363CC]/20 text-[#9FB6EB]' : 'bg-[#9FB6EB]/20 text-[#4363CC]'
            } px-1 rounded`}>
              {word}
            </span>
          ) : (
            word
          )}
          {index < words.length - 1 ? ' ' : ''}
        </span>
      )}
    </>
  );
};

export default function FeatureCard({ icon, title, description, features, href }: FeatureCardProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === 'dark';

  const Card = (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.15,
        ease: "easeOut"
      }}
      className={`flex flex-col p-6 ${
        isDark 
          ? 'bg-[#1A1A1A] border-white/20 hover:border-white/60' 
          : 'bg-[#FAFAF9] border-black/40 hover:border-black/90'
      } border rounded-lg transition-all duration-150 sm:min-h-[460px] md:min-h-[360px] ${
        href ? 'cursor-pointer' : ''
      }`}
    >
      <div className="text-3xl sm:text-2xl mb-2">{icon}</div>
      <h3 className={`text-2xl sm:text-xl font-semibold mb-2 ${
        isDark ? 'text-white' : 'text-[#0D0D0D]'
      }`}>
        {title}
      </h3>
      <p className={`text-lg sm:text-base mb-4 ${
        isDark ? 'text-gray-300' : 'text-[#585652]'
      }`}>
        {description}
      </p>
      <ul className={`text-base sm:text-sm list-disc list-inside space-y-2 sm:space-y-1 ${
        isDark ? 'text-gray-300' : 'text-[#585652]'
      }`}>
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