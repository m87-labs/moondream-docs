/**
 * Cookbook section metadata
 * Purpose: Collection of practical examples and integrations
 * Location: /cookbook/
 */

import type { Meta } from 'nextra'

const meta: Meta = {
	'*': {
		theme: {
			layout: 'default',
			typesetting: 'article'
		}
	},
	'basic-usage': {
		title: 'Basic Usage',
		type: 'page',
		description: 'Step-by-step examples of basic Moondream functionality with code samples for common use cases and patterns'
	},
	'jupyter-notebook': {
		title: 'Jupyter Notebook',
		type: 'page',
		description: 'Interactive Jupyter Notebook examples demonstrating Moondream\'s capabilities with detailed explanations and visualizations'
	},
	'gradio-webcam': {
		title: 'Gradio Webcam',
		type: 'page',
		description: 'Build a real-time webcam interface using Gradio and Moondream for interactive image analysis and visual Q&A'
	},
	'streamlit-chat': {
		title: 'Streamlit Chat App',
		type: 'page',
		description: 'Create an interactive chat interface with Streamlit for natural conversations about images using Moondream'
	},
	'sample-cli': {
		title: 'Sample CLI',
		type: 'page',
		description: 'Command-line interface example for batch processing images and automating Moondream workflows'
	},
	'---': {
		type: 'separator'
	},
	'examples_repo': {
		title: 'Examples Repository',
		href: 'https://github.com/m87-labs/moondream-examples',
		newWindow: true
	}
}

export default meta
