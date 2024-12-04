/**
 * Capabilities section metadata
 * Purpose: Describes each model capability and its documentation page
 * Location: /capabilities/
 * 
 * Requirements:
 * - Each entry must have a corresponding .mdx file in this directory
 * - Keys must match the MDX filenames
 * - Must align with capabilities listed in root _meta.tsx
 * 
 * Current capabilities:
 * - visual-qna.mdx: Core Q&A functionality
 * - image-captioning.mdx: Image description generation
 * - object-detection.mdx: Object detection (work in progress)
 * - pointing.mdx: Visual coordinate pointing (work in progress)
 */

const meta = {
  "visual-qna": {
    title: "/query",
    description: "Ask questions about images and get detailed answers"
  },
  "image-captioning": {
    title: "/caption",
    description: "Generate natural language descriptions of images"
  },
  "object-detection": {
    title: "/detect 🚧",
    description: "Detect and locate objects in images"
  },
  "pointing": {
    title: "/point 🚧",
    description: "Get precise coordinates for objects and regions in images"
  }
}

export default meta 