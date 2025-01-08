import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface Feature {
  name: string;
  description: string;
  modelSupport: {
    '2b': 'supported' | 'experimental' | 'coming-soon';
    '0.5b': 'supported' | 'experimental' | 'coming-soon';
  };
}

const features: Feature[] = [
  {
    name: 'Visual Q&A',
    description: 'Answer natural language questions about images',
    modelSupport: {
      '2b': 'supported',
      '0.5b': 'supported'
    }
  },
  {
    name: 'Image Captioning',
    description: 'Generate descriptive captions for images',
    modelSupport: {
      '2b': 'supported',
      '0.5b': 'supported'
    }
  },
  {
    name: 'Object Detection',
    description: 'Identify and locate objects within images',
    modelSupport: {
      '2b': 'supported',
      '0.5b': 'supported'
    }
  },
  {
    name: 'Visual Pointing',
    description: 'Point to specific regions or objects in images',
    modelSupport: {
      '2b': 'experimental',
      '0.5b': 'coming-soon'
    }
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'supported':
      return '✅';
    case 'experimental':
      return '🧪';
    case 'coming-soon':
      return '⏳';
    default:
      return '❌';
  }
};

export default function FeatureSupport() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === 'dark';

  return (
    <div className="mt-8">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-white/20">
          <thead className={isDark ? 'bg-[#1A1A1A]' : 'bg-gray-50'}>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Feature</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">2B Model</th>
              <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">0.5B Model</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-white/20">
            {features.map((feature) => (
              <tr key={feature.name} className={isDark ? 'bg-[#1A1A1A]' : 'bg-white'}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{feature.name}</td>
                <td className="px-6 py-4 text-sm">{feature.description}</td>
                <td className="px-6 py-4 text-center text-sm">{getStatusIcon(feature.modelSupport['2b'])}</td>
                <td className="px-6 py-4 text-center text-sm">{getStatusIcon(feature.modelSupport['0.5b'])}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        <p>Legend: ✅ Supported | 🧪 Experimental | ⏳ Coming Soon</p>
      </div>
    </div>
  );
}
