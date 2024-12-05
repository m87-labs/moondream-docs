# Changelog

All notable changes to the Moondream documentation will be documented in this file.

## [0.1.1] - 2024-12-05

### Changed
- Standardized model quantization and size ordering across all pages and model cards for consistency
- Updated API endpoints to use latest version (api.moondream.ai/v1)
- Updated Python client changes:
  - Changed `moondream.VL` to lowercase in documentation
  - Added NPM package support
  - Added Python package cloud support
  - Updated model table with downloads and memory usage information
- Updated documentation deployment:
  - Configured GitHub hook for static site export and build
  - Set up GitHub Pages deployment
  - DNS configuration pending
- Model updates:
  - Updated 0.5B checkpoints with pointing capability
  - Updated 2B checkpoints
  - Removed .tar format from checkpoints
- Updated authentication link to use new domain: https://console.moondream.ai/
- Local deployment documentation updates:
  - Added support for direct gzipped model loading (`model = vl('moondream-0_5b-int8.bin.gz')`)
  - Added recommendation to unzip models for faster loading times
  - Updated model paths and examples across all capability pages (caption, detect, point, query)
  - Updated _meta.tsx with latest endpoint descriptions
  - Refreshed local LLM reference documentation
  - Updated model downloads section with new formats and recommendations

### Added
- New Capabilities section with dedicated pages for:
  - Visual Q&A documentation and examples
  - Image Captioning documentation and examples
  - Object Detection documentation (coming soon) 🚧
  - Visual Pointing documentation (coming soon) 🚧
- New Examples section with:
  - Sample CLI interface
  - Gradio webcam demo
  - Basic usage patterns
  - Batch processing examples
  - Streamlit chat interface
- Interactive playground iframes for each capability
- Multi-language support (Python/JavaScript/TypeScript) across all examples
- Improved navigation structure with better organization
- Community-driven documentation approach
- Code block copy button functionality with preserved Nextra syntax highlighting

### Fixed
- Navigation issues in sidebar
- Meta file structure for proper page organization
- Documentation hierarchy for better user experience
- File structure consistency across sections

## [0.1.0] - 2024-12-03

### Added
- Initial documentation setup
- Basic project structure
- Getting started guide
- Advanced configuration section
- Example projects section
- Contributing guidelines
- Basic styling and theme configuration