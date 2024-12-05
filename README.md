# 🌙 Moondream Documentation

> This is the community-driven documentation for Moondream, an open-source vision-language model. We welcome contributions from the community to help make this documentation more comprehensive and useful for everyone.

Official documentation for Moondream - a lightweight yet powerful vision-language model that enables you to analyze images, generate captions, and answer questions about visual content.

## 🌟 Key Features

- 🖼️ **Image Analysis**: Generate detailed descriptions of any image
- 💬 **Visual Q&A**: Ask natural language questions about images
- 🚀 **Visual Pointing**: Get precise coordinates for objects in images 🚧
- 🔍 **Object Detection**: Locate and identify objects in images 🚧
- 🚀 **Local Processing**: Run entirely on your machine for privacy
- 🎯 **CUDA Support**: GPU acceleration for faster processing
- ⚡ **Streaming**: Real-time response streaming for longer outputs
- 🔒 **Privacy-First**: All processing happens locally
- 📱 **Multi-Platform**: Supports Python, JavaScript, and TypeScript
- 🎨 **Modern Stack**: Built with Next.js, Nextra, and Tailwind CSS

## 📚 Documentation Structure

```
docs/
├── Introduction
├── Getting Started
├── Capabilities/
│   ├── Visual Q&A
│   ├── Image Captioning
│   ├── Object Detection 🚧
│   └── Visual Pointing 🚧
├── Advanced Topics/
│   ├── Configuration
│   └── Troubleshooting
└── Examples/
    ├── Basic Usage
    ├── Batch Processing
    ├── Sample CLI
    ├── Gradio Webcam Demo
    ├── Streamlit Chat App
    └── Documentation Features
```

## Contributing

We welcome contributions to improve the documentation! Please see our [Contributing Guide](CONTRIBUTING.md) for:
- How to set up the documentation locally
- Understanding the project structure
- Documentation style guide
- How to submit changes
- Development tips and troubleshooting

## Key Features of Nextra

### File-Based Routing

- Every `.mdx` file becomes a page automatically
- Nested folders create nested routes
- Example: `pages/docs/advanced/configuration.mdx` → `/docs/advanced/configuration`

### Special Files

- `_meta.tsx`: Controls navigation structure and metadata
- `index.mdx`: Default page for a folder
- `_app.tsx`: Custom app wrapper

### Meta File Structure

Each section has its own `_meta.tsx` file that:
- Defines the section's navigation
- Provides page metadata
- Must align with actual files
- Supports nested structures

Example:
```typescript
const meta = {
  "visual-qna": {
    title: "Visual Q&A",
    description: "Ask questions about images"
  }
}
```

### Built-in Features

- 🔍 Full-text search
- 🌗 Dark mode
- 📱 Responsive design
- 🔗 Auto-generated sidebar
- 📝 Markdown & MDX support
- 🎨 Syntax highlighting
- 🔖 Table of contents

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Adding New Documentation

1. Create `.mdx` files in the `pages` directory
2. Use nested folders for organization
3. Add entries to `_meta.tsx` files to control navigation
4. Use standard Markdown syntax with MDX features

### Example Page Structure

```mdx
# Page Title

## Section

Content goes here...

```python
# Code examples with syntax highlighting
print("Hello, World!")
```

## Customization

### Theme Configuration

Modify `theme.config.jsx` to customize:
- Logo
- Navigation links
- GitHub links
- Footer content
- SEO defaults
- Color scheme

### Styling

- Uses Tailwind CSS for styling
- Global styles in `src/styles/globals.css`
- Custom CSS variables for theming

## License

[MIT License](LICENSE)
