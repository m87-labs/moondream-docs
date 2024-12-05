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
    type: 'page',
    description: 'Comprehensive guide to resolving common issues, error messages, and performance problems in Moondream'
  },
  'advanced-setup-python': {
    title: 'Advanced Setup (Python)',
    type: 'page',
    description: 'In-depth guide to advanced Python setup options'
  },
  transformers: {
    title: 'HuggingFace Transformers',
    type: 'page',
    description: 'Learn how to integrate Moondream with HuggingFace Transformers for enhanced model capabilities and ecosystem compatibility'
  },
  '---': {
    type: 'separator'
  },
  huggingface_link: {
    title: 'HuggingFace Model',
    href: 'https://huggingface.co/vikhyatk/moondream',
    newWindow: true
  }
}

export default meta 