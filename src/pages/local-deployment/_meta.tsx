/**
 * Local Deployment section metadata
 * Purpose: Documentation for local deployment options
 * Location: /local-deployment/
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
    description: 'Complete guide to deploying Moondream locally, from installation to first inference, with performance optimization tips'
  },
  'reference': {
    title: 'Reference',
    description: 'Detailed reference for Moondream local deployment, including API endpoints and request/response formats'
  },
  '---': {
    type: 'separator'
  },
  'query': {
    title: '/query',
    description: 'Implement visual question-answering locally with Moondream, including batch processing and streaming capabilities'
  },
  'caption': {
    title: '/caption',
    description: 'Set up local image captioning with Moondream, featuring automatic and streaming caption generation'
  },
  'detect': {
    title: '/detect 🚧',
    description: 'Local object detection implementation guide (Coming Soon)'
  },
  'point': {
    title: '/point 🚧',
    description: 'Guide to implementing visual coordinate pointing locally (Coming Soon)'
  },
}

export default meta 