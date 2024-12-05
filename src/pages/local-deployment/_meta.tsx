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
    type: 'page',
    description: 'Complete guide to deploying Moondream locally, from installation to first inference, with performance optimization tips'
  },
  'query': {
    title: '/query',
    type: 'page',
    description: 'Implement visual question-answering locally with Moondream, including batch processing and streaming capabilities'
  },
  'caption': {
    title: '/caption',
    type: 'page',
    description: 'Set up local image captioning with Moondream, featuring automatic and streaming caption generation'
  },
  'detect': {
    title: '/detect 🚧',
    type: 'page',
    description: 'Local object detection implementation guide (Coming Soon)'
  },
  'point': {
    title: '/point 🚧',
    type: 'page',
    description: 'Guide to implementing visual coordinate pointing locally (Coming Soon)'
  },
  '---': {
    type: 'separator'
  },
  docker_repo: {
    title: 'Docker Images',
    href: 'https://hub.docker.com/r/m87labs/moondream',
    newWindow: true
  }
}

export default meta 