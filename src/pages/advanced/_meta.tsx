/**
 * Advanced topics section metadata
 * Purpose: Describes advanced documentation pages
 * Location: /advanced/
 */

import type { Meta } from 'nextra'

const meta: Meta = {
  '*': {
    theme: {
      layout: 'default',
      typesetting: 'article'
    }
  },
  troubleshooting: {
    title: 'Troubleshooting',
    description: 'Comprehensive guide to resolving common issues, error messages, and performance problems in Moondream'
  },
  'advanced-setup-python': {
    title: 'Advanced Setup (Python)', 
    description: 'In-depth guide to advanced Python setup options'
  },
  transformers: {
    title: 'HuggingFace Transformers',
    description: 'Learn how to integrate Moondream with HuggingFace Transformers for enhanced model capabilities and ecosystem compatibility'
  },

}

export default meta 