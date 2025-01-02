import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface UseCase {
  icon: string;
  title: string;
  description: string;
}

const useCases: UseCase[] = [
  {
    icon: '🛍️',
    title: 'E-commerce',
    description: 'Product tagging, visual search, and automated catalog management'
  },
  {
    icon: '⚕️',
    title: 'Healthcare',
    description: 'Medical image analysis and report generation'
  },
  {
    icon: '♿',
    title: 'Accessibility',
    description: 'Automated alt text and image descriptions'
  },
  {
    icon: '🛡️',
    title: 'Content Moderation',
    description: 'Visual content understanding and filtering'
  },
  {
    icon: '📚',
    title: 'Education',
    description: 'Interactive visual learning tools'
  },
  {
    icon: '🏭',
    title: 'Manufacturing',
    description: 'Quality control and visual inspection'
  }
];

export default function CommonUseCases() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === 'dark';

  return (
    <div className={`rounded-lg p-4 sm:p-8 my-8 border-2 transition-all duration-200 ${
      isDark 
        ? 'bg-gray-900 border-white/20 hover:border-white/40'
        : 'bg-[#FAFAF9] border-[#0D0D0D]/40 hover:border-[#0D0D0D]/60'
    }`}>
      <h2 className={`text-2xl font-semibold mb-4 sm:mb-6 ${
        isDark ? 'text-gray-100' : 'text-black'
      }`}>Common Use Cases</h2>
      
      <div className={`mb-4 sm:mb-6 ${
        isDark ? 'text-gray-300' : 'text-[#585652]'
      }`}>
        VLMs are transforming how we work with visual data across industries:
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {useCases.map((useCase, index) => (
          <div key={index} className={`group flex items-start space-x-4 p-3 rounded-lg transition-colors duration-200 cursor-pointer ${
            isDark 
              ? 'hover:bg-gray-800' 
              : 'hover:bg-white/50'
          }`}>
            <div className="text-2xl group-hover:scale-110 transition-transform duration-200">
              {useCase.icon}
            </div>
            <div>
              <h3 className={`font-semibold border-b-2 border-[#4363CC]/60 inline-block mb-1 ${
                isDark ? 'text-gray-100' : 'text-black'
              }`}>
                {useCase.title}
              </h3>
              <p className={isDark ? 'text-gray-300' : 'text-[#585652]'}>
                {useCase.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
