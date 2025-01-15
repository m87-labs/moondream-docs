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
  'api-reference': {
    title: 'API Reference', 
    description: 'Detailed API reference for Moondream Cloud APIs and Node.js client library, including request and response formats',
    type: 'article'
  },
  '---': {
    type: 'separator'
  },
  'query': {
    title: '/query',
    description: 'Ask natural language questions about images and receive detailed answers through Moondream\'s visual Q&A endpoint or Node.js client',
    type: 'article'
  },
  'caption': {
    title: '/caption',
    description: 'Generate accurate and natural image captions using Moondream\'s cloud API endpoint or Node.js client with examples and best practices',
    type: 'article'
  },
  'detect': {
    title: '/detect',
    description: 'Detect and locate objects in images using Moondream\'s object detection API or Node.js client',
    type: 'article'
  },
  'point': {
    title: '/point',
    description: 'Get precise coordinate locations for objects using Moondream\'s visual pointing API or Node.js client',
    type: 'article'
  },
}

export default meta