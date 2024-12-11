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
  - `NotePad.Section`: Titled sections with border styling
  - `NotePad.Timeline`: Timeline-based content layout
  - `NotePad.TimelineItem`: Individual timeline entries
  - `NotePad.Note`: Info/warning/highlight callouts
  - `NotePad.Columns`: Multi-column layouts
  - `NotePad.Column`: Individual column content
  - `NotePad.BulletList`: Bullet point lists
  - `NotePad.Bullet`: Individual bullet points

- `Recipe`: Interactive recipe/tutorial component with expandable details
  - `Recipe.Feature`: Feature highlights with icons
  - `Recipe.CodePreview`: Code previews with filename and source links
  - Supports tags, GitHub links, and live demos
  - Expandable/collapsible content sections

- `EndpointCard`: API endpoint documentation card
  - Icon and title display
  - Smart text highlighting for keywords
  - Interactive hover states
  - Link integration with Next.js routing

- `FaqDropdown`: Expandable FAQ sections
  - Smooth animations for expand/collapse
  - Markdown/prose content support
  - Responsive design with different mobile/desktop styles

- `CodeBlock`: Code snippet display with:
  - Syntax highlighting
  - Copy functionality via `CopyButton`
  - Line wrapping
  - Language support

- `FeatureCard`: Feature highlight component with:
  - Icon display
  - Title and description
  - Feature list with keyword highlighting
  - Optional link functionality

- `ConfigSelector`: Configuration options display
  - Complex configuration UI
  - Interactive selection
  - Detailed option descriptions

### Component Usage Examples

~~~mdx
<Recipe
  title="Example Recipe"
  description="A sample recipe implementation"
  github="https://github.com/example/repo"
  demo="https://demo.example.com"
  tags={["tag1", "tag2"]}
>
  <Recipe.Feature icon="✨" title="Feature">
    Feature description
  </Recipe.Feature>
  <Recipe.CodePreview
    filename="example.py"
    sourceUrl="https://github.com/example/repo/blob/main/example.py"
  >
    print("Hello World")
  </Recipe.CodePreview>
</Recipe>

<EndpointCard
  icon="🚀"
  title="API Endpoint"
  description="This endpoint runs locally and provides detailed results"
  href="/api/endpoint"
/>

<FaqDropdown question="How do I use this?">
  Here's how to use this component...
</FaqDropdown>

<NotePad>
  <NotePad.Section title="Getting Started">
    <NotePad.Note type="info">
      Important information here...
    </NotePad.Note>
    <NotePad.BulletList>
      <NotePad.Bullet>Point 1</NotePad.Bullet>
    </NotePad.BulletList>
  </NotePad.Section>
</NotePad>

<CodeBlock language="python">
print("Hello World")
</CodeBlock>

<FeatureCard
  icon="🚀"
  title="Feature"
  description="Description"
  features={["Point 1", "Point 2"]}
/>
~~~

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

- Use `NotePad` for structured content sections with its various sub-components:
  ```mdx
  <NotePad>
    <NotePad.Section title="Section">
      <NotePad.Note type="info">Important information</NotePad.Note>
      <NotePad.BulletList>
        <NotePad.Bullet>Point 1</NotePad.Bullet>
      </NotePad.BulletList>
    </NotePad.Section>
  </NotePad>
  ```
- Use `CodeBlock` for code examples:
  ```mdx
  <CodeBlock language="python">
    print("Hello World")
  </CodeBlock>
  ```
- Use `FeatureCard` for highlighting features:
  ```mdx
  <FeatureCard
    icon="🚀"
    title="Feature"
    description="Description"
    features={["Point 1", "Point 2"]}
  />
  ```
- Use specialized components as needed:
  - `EndpointCard` for API documentation
  - `FaqDropdown` for FAQ sections
  - `Recipe` and `RecipeCard` for tutorial content
  - `ConfigSelector` for configuration options

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

## Nextra Configuration

### Core Setup

The documentation is built with Nextra, configured through several key files:

- `next.config.ts`: Core Next.js and Nextra configuration
  ```typescript
  const withNextra = nextra({
    theme: 'nextra-theme-docs',
    themeConfig: './theme.config.tsx'
  })
  ```

- `theme.config.tsx`: Nextra theme customization
  - Branding and logos
  - Navigation structure
  - Theme colors and styling
  - SEO configuration
  - Component overrides

### Theme Customization

The theme is customized in `theme.config.tsx`:

```typescript
const config: DocsThemeConfig = {
  // Branding
  logo: <span>Moondream Documentation</span>,
  
  // Repository links
  project: {
    link: 'https://github.com/vikhyat/moondream'
  },
  
  // Navigation
  navbar: {
    extraContent: // Custom navigation items
  },
  
  // Sidebar behavior
  sidebar: {
    defaultMenuCollapseLevel: 2,
    autoCollapse: true
  },
  
  // Theme settings
  darkMode: false,
  nextThemes: {
    defaultTheme: 'light',
    forcedTheme: 'light'
  }
}
```

### Page Organization

Documentation pages are organized in the `pages/` directory:

- `pages/`
  - `cloud/`: Cloud-specific documentation
    - `_meta.tsx`: Section metadata
    - `api-reference.mdx`: API documentation
    - `getting-started.mdx`: Getting started guide
  - `fonts/`: Font configuration
  - `styles/`: Global styling
  - `index.mdx`: Homepage
  - `_app.tsx`: Custom app wrapper
  - `_document.tsx`: Custom document setup

### Meta Files

Each section should have a `_meta.tsx` file defining:
- Section title and description
- Navigation order
- Hidden pages
- External links

Example `_meta.tsx`:
```typescript
export default {
  index: {
    title: 'Home',
    display: 'hidden'
  },
  docs: {
    title: 'Documentation',
    description: 'Learn how to use Moondream'
  }
}
```

### MDX Features

Nextra provides enhanced MDX capabilities:
- Custom component usage
- Code highlighting
- Frontmatter support
- Table of contents generation
- Automatic navigation
- Search functionality

Example MDX page:
```mdx
---
title: Getting Started
description: Get started with Moondream
---

# Getting Started

<NotePad>
  Welcome to Moondream documentation
</NotePad>

```

### Styling

The documentation uses:
- Tailwind CSS for utility classes
- Global styles in `styles/globals.css`
- Theme-specific styles in `theme.config.tsx`
- Component-level styling
- Custom font configuration

## License

[MIT License](LICENSE)
