import { motion } from 'framer-motion';
import Link from 'next/link';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  features: string[];
  href?: string;
}

export default function FeatureCard({ icon, title, description, features, href }: FeatureCardProps) {
  const Card = (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.15,
        ease: "easeOut"
      }}
      className={`flex flex-col p-6 bg-white rounded-lg shadow hover:shadow-md transition-all duration-150 ${
        href ? 'cursor-pointer' : ''
      }`}
    >
      <div className="text-2xl mb-2">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
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