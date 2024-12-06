# Moondream Documentation

This repository contains the official documentation for Moondream, built with Nextra, Next.js, and Tailwind CSS. The documentation aims to be comprehensive and community-driven.

## Contributing

We welcome and encourage contributions to improve the documentation. Please see our [Contributing Guide](CONTRIBUTING.md) for detailed information on:

- Local development setup
- Project structure and conventions
- Documentation style guidelines
- Pull request process
- Development tips and troubleshooting

## Development

~~~bash
npm install
npm run dev
npm run build
npm start
~~~

## Documentation Structure

### Core Components

The documentation uses several custom components found in `src/components`:
- `NotePad`: Multi-purpose content container with various layouts
- `Callout`: Highlighted information blocks
- `Tabs`: Content organization component

### File Organization

- `pages/`: MDX documentation files
- `public/`: Static assets
- `src/components/`: React components
- `src/styles/`: Tailwind configuration and global styles
- `theme.config.tsx`: Nextra theme configuration

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
~~~typescript
const meta = {
  "docs": {
    title: "Documentation",
    description: "Getting started and guides"
  }
}
~~~

## Adding New Documentation

### File Creation
1. Create `.mdx` files in the appropriate directory under `pages/`
2. Use nested folders for logical organization
3. Update `_meta.tsx` files to include new pages
4. Follow established naming conventions

### Content Structure
1. Use available components and Markdown syntax
2. Include code examples with proper syntax highlighting
3. Add descriptive frontmatter
4. Reference related documentation

Example page structure:
```mdx
---
title: Guide Title
description: Brief description
---
```

# Main Title

<NotePad>
  <NotePad.Section title="Section">
    Content goes here...
  </NotePad.Section>
</NotePad>

## Code Examples

~~~python
# Example code
print("Hello World")
~~~


### Component Usage

- Use `NotePad` for structured content sections
- Implement `Callout` for important notes
- Utilize `Tabs` for alternative content views
- Include proper frontmatter metadata


## Configuration

### Nextra Setup

- File-based routing through `pages/` directory
- Custom components via MDX
- TypeScript support
- Tailwind CSS styling

### Theme Customization

Modify `theme.config.tsx` for:
- Navigation structure
- Component defaults
- Layout options
- Branding elements
- SEO configuration

### Styling

- Tailwind CSS utility classes
- Global styles in `src/styles/globals.css`
- Component-specific styles
- Custom CSS variables

## License

[MIT License](LICENSE)
