/**
 * Cloud section metadata
 * Purpose: Describes cloud API documentation pages
 * Location: /cloud/
 */

import type { Meta } from 'nextra'

const meta: Meta = {
  '*': {
    theme: {
      layout: 'default',
      typesetting: 'article'
    }
  },
  'getting-started': {
    title: 'Getting Started',
    type: 'page',
    description: 'Quick guide to getting started with Moondream Cloud APIs, including authentication setup and basic usage examples'
  },
  '---': {
    type: 'separator'
  },
  'caption': {
    title: '/caption',
    type: 'page',
    description: 'Generate accurate and natural image captions using Moondream\'s cloud API endpoint with examples and best practices'
  },
  'query': {
    title: '/query',
    type: 'page',
    description: 'Ask natural language questions about images and receive detailed answers through Moondream\'s visual Q&A endpoint'
  },
  'detect': {
    title: '/detect',
    type: 'page',
    description: 'Detect and locate objects in images using Moondream\'s object detection API (Coming Soon)'
  },
  'point': {
    title: '/point',
    type: 'page',
    description: 'Get precise coordinate locations for objects using Moondream\'s visual pointing API (Coming Soon)'
  },
}

export default meta