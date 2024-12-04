/**
 * Root documentation navigation structure
 * Purpose: Defines the main navigation sidebar and page hierarchy
 * Location: /src/pages/
 */

interface MetaItem {
  title: string;
  description: string;
}

const meta: Record<string, MetaItem> = {
  index: {
    title: 'Introduction',
    description: 'Get started with Moondream, an efficient vision-language model for image understanding and analysis'
  },
  'quick-start': {
    title: 'Quick Start',
    description: 'Learn how to set up and run Moondream in under 5 minutes with our step-by-step guide'
  },
  'local-deployment': {
    title: 'Local Deployment',
    description: 'Deploy and run Moondream locally on your own infrastructure with detailed setup instructions'
  },
  cloud: {
    title: 'Cloud',
    description: 'Access Moondream\'s capabilities through our cloud API with ready-to-use endpoints'
  },
  'technical-specifications': {
    title: 'Technical Specifications & Benchmarks',
    description: 'Detailed technical specifications, performance benchmarks, and model architecture information'
  },
  'model-downloads': {
    title: 'Model Downloads',
    description: 'Download Moondream model variants optimized for different use cases and hardware configurations'
  },
  advanced: {
    title: 'Advanced',
    description: 'Advanced topics including custom configurations, optimizations, and troubleshooting guides'
  },
  cookbook: {
    title: 'Cookbook',
    description: 'Practical examples and recipes for common Moondream use cases and integrations'
  }
} as const;

export default meta;