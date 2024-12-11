/**
 * Root documentation navigation structure
 * Purpose: Defines the main navigation sidebar and page hierarchy
 * Location: /src/pages/
 */

import type { Meta } from 'nextra'

const meta: Meta = {
  index: {
    title: 'Overview',
    description: 'Get started with Moondream, an efficient vision-language model for image understanding and analysis'
  },
  discover: {
    title: 'Discover',
    description: 'Learn about vision-language models, capabilities, and use cases'
  },
  'quick-start': {
    title: 'Quick Start',
    description: 'Follow our step-by-step guides to get up and running with Moondream in minutes',
  },
    recipes: {
    title: 'Recipes',
    description: 'Learn best practices, optimization tips, and get inspired by real-world examples'
  },
  specifications: {
    title: 'Specifications',
    description: 'Explore detailed technical specifications, memory requirements, and performance benchmarks'
  },
  cloud: {
    title: 'Cloud',
    description: 'Access Moondream\'s capabilities through our cloud API with ready-to-use endpoints',
    display: 'hidden'
  },
  '---': {
    type: 'separator'
  },
  playground_link: {
    title: 'Interactive Playground',
    href: 'https://moondream.ai/playground',
    newWindow: true
  },
  discord_link: {
    title: 'Join the Moondream Community',
    href: 'https://discord.com/invite/tRUdpjDQfH',
    newWindow: true
  },
  github_link: {
    title: 'GitHub',
    href: 'https://github.com/vikhyat/moondream',
    newWindow: true
  },
  huggingface_link: {
    title: 'HuggingFace Model',
    href: 'https://huggingface.co/vikhyatk/moondream2',
    newWindow: true,
    display: 'hidden'
  }
}

export default meta