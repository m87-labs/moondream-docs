/**
 * Examples section metadata
 * Purpose: Describes example pages and their content
 * Location: /examples/
 * 
 * Requirements:
 * - Each entry must have a corresponding .mdx file in this directory
 * - Keys must match the MDX filenames
 * - Must align with examples listed in root _meta.tsx
 * 
 * Current examples:
 * - basic-usage.mdx: Simple implementation examples
 * - batch-processing.mdx: Batch processing patterns
 * - streamlit-chat.mdx: Interactive chat interface
 * - sample-cli.mdx: Command-line interface example
 * - gradio-webcam.mdx: Real-time webcam demo
 * - nextra-features.mdx: Documentation system features
 */

const meta = {
  "basic-usage": {
    title: "Basic Usage",
    description: "Simple examples of using Moondream"
  },
  "batch-processing": {
    title: "Batch Processing",
    description: "Process multiple images efficiently"
  },
  "streamlit-chat": {
    title: "Streamlit Chat App",
    description: "Build an interactive chat interface with Streamlit"
  },
  "sample-cli": {
    title: "Sample CLI",
    description: "Command-line interface for image analysis"
  },
  "gradio-webcam": {
    title: "Gradio Webcam",
    description: "Real-time webcam interface with Gradio"
  },
  "nextra-features": {
    title: "Documentation Features",
    description: "Showcase of Nextra documentation features"
  }
}

export default meta 