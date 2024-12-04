/**
 * Root documentation navigation structure
 * Purpose: Defines the main navigation sidebar and page hierarchy
 * 
 * Structure:
 * - index: Homepage
 * - quick-start: Simple setup guide
 * - getting-started: Detailed setup guide
 * - capabilities: Core model features
 *   - visual-qna: Question answering
 *   - image-captioning: Image description
 *   - object-detection: Object localization
 *   - pointing: Visual coordinate pointing
 * - advanced: Technical documentation
 *   - configuration: Setup options
 *   - troubleshooting: Common issues
 * - examples: Code samples
 *   - basic-usage: Simple examples
 *   - batch-processing: Batch operations
 *   - streamlit-chat: Chat interface
 *   - sample-cli: Command-line interface
 *   - gradio-webcam: Webcam demo
 *   - jupyter-notebook: Google Colab/Jupyter example
 *   - nextra-features: Docs features
 */

export default {
  index: 'Introduction',
  'quick-start': 'Quick Start', 
  'getting-started': 'Getting Started',
  capabilities: {
    title: 'Capabilities',
    children: {
      'visual-qna': 'Visual Q&A',
      'image-captioning': 'Image Captioning',
      'object-detection': 'Object Detection 🚧',
      'pointing': 'Visual Pointing 🚧'
    }
  },
  advanced: {
    title: 'Advanced',
    children: {
      configuration: 'Configuration',
      troubleshooting: 'Troubleshooting'
    }
  },
  examples: {
    title: 'Examples',
    children: {
      'basic-usage': 'Basic Usage',
      'batch-processing': 'Batch Processing',
      'streamlit-chat': 'Streamlit Chat App',
      'sample-cli': 'Sample CLI',
      'gradio-webcam': 'Gradio Webcam Demo',
      'jupyter-notebook': 'Jupyter/Colab Example',
      'nextra-features': 'Documentation Features'
    }
  },
  scripts: {
    title: 'Scripts',
    children: {
      'download-model-weights': 'Download Model Weights'
    }
  }
}