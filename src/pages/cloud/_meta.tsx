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
    description: 'Quick guide to getting started with Moondream Cloud APIs, including Node.js library, authentication setup and basic usage examples'
  },
  'api-reference': {
    title: 'API Reference',
    description: 'Detailed API reference for Moondream Cloud APIs and Node.js client library, including request and response formats'
  },
  '---': {
    type: 'separator'
  },
  'query': {
    title: '/query',
    description: 'Ask natural language questions about images and receive detailed answers through Moondream\'s visual Q&A endpoint or Node.js client'
  },
  'caption': {
    title: '/caption',
    description: 'Generate accurate and natural image captions using Moondream\'s cloud API endpoint or Node.js client with examples and best practices'
  },
  'detect': {
    title: '/detect',
    description: 'Detect and locate objects in images using Moondream\'s object detection API or Node.js client (Coming Soon)'
  },
  'point': {
    title: '/point',
    description: 'Get precise coordinate locations for objects using Moondream\'s visual pointing API or Node.js client (Coming Soon)'
  },
}

export default meta