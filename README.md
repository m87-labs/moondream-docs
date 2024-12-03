# Moondream Documentation

This is the official documentation for Moondream, built with [Next.js](https://nextjs.org/), [Nextra](https://nextra.site/), and [Tailwind CSS](https://tailwindcss.com/).

## Contributing

We welcome contributions to improve the documentation! Please see our [Contributing Guide](CONTRIBUTING.md) for:
- How to set up the documentation locally
- Understanding the project structure
- Documentation style guide
- How to submit changes
- Development tips and troubleshooting

## Project Structure

```
src/
├── pages/
│   ├── _app.tsx         # Custom Next.js App component
│   ├── index.mdx        # Home page
│   └── docs/            # Documentation pages
│       ├── _meta.json   # Sidebar structure for docs
│       ├── getting-started.mdx
│       └── advanced/
│           ├── _meta.json
│           └── configuration.mdx
├── styles/
│   └── globals.css      # Global styles and Tailwind directives
```

## Key Features of Nextra

### File-Based Routing

- Every `.mdx` file becomes a page automatically
- Nested folders create nested routes
- Example: `pages/docs/advanced/configuration.mdx` → `/docs/advanced/configuration`

### Special Files

- `_meta.json`: Controls sidebar structure and metadata
- `index.mdx`: Default page for a folder
- `_app.tsx`: Custom app wrapper

### Sidebar Configuration

Use `_meta.json` files to control the documentation structure:

```json
{
  "getting-started": {
    "title": "Getting Started",
    "description": "Learn how to get started"
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
3. Add entries to `_meta.json` files to control sidebar order
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
