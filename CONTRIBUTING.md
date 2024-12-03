# Contributing to Moondream Documentation

Thank you for your interest in contributing to the Moondream documentation! This guide will help you understand how our documentation is structured and how to make contributions.

## Documentation Stack

Our documentation is built with:
- [Next.js](https://nextjs.org/) - React framework
- [Nextra](https://nextra.site/) - Documentation generator
- [MDX](https://mdxjs.com/) - Markdown + React components
- [Tailwind CSS](https://tailwindcss.com/) - Styling

## Getting Started

1. Fork and clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/moondream-docs.git
cd moondream-docs
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Visit `http://localhost:3000` to see your changes in real-time.

## Repository Structure

```
moondream-docs/
├── src/
│   ├── pages/              # All documentation pages
│   │   ├── index.mdx      # Homepage
│   │   ├── _app.tsx       # Next.js app component
│   │   └── docs/          # Documentation pages
│   │       ├── _meta.json # Sidebar configuration
│   │       └── ...        # Documentation files
│   └── styles/
│       └── globals.css    # Global styles
├── public/                # Static assets
├── theme.config.jsx       # Nextra theme configuration
├── next.config.ts        # Next.js configuration
└── tailwind.config.ts    # Tailwind configuration
```

## How Nextra Works

### File-Based Routing

Nextra uses Next.js's file-based routing system:
- Files in `src/pages` automatically become pages
- `src/pages/docs/getting-started.mdx` → `/docs/getting-started`
- `index.mdx` files become the index page of their folder

### Sidebar Navigation

The sidebar is controlled by `_meta.json` files:

```json
{
  "getting-started": {
    "title": "Getting Started",
    "description": "Learn how to get started"
  },
  "advanced": {
    "title": "Advanced Topics"
  }
}
```

- Files are ordered as they appear in `_meta.json`
- Missing files are still shown in the sidebar
- Hidden pages can be marked with `"display": "hidden"`

### MDX Features

Our documentation uses MDX, which allows:
- All standard Markdown syntax
- React components in Markdown
- Code blocks with syntax highlighting
- Automatic table of contents
- Internal linking between pages

Example:
\`\`\`mdx
# Page Title

## Section

Regular markdown **works** as _expected_.

import { MyComponent } from '../components/MyComponent'

<MyComponent>
  This is a React component in Markdown!
</MyComponent>

\`\`\`

## Making Contributions

### 1. Create a New Branch

```bash
git checkout -b docs/your-feature-name
```

### 2. Writing Documentation

- Place new pages in appropriate directories under `src/pages/docs/`
- Use clear, concise language
- Include code examples where relevant
- Add entries to `_meta.json` for sidebar organization
- Preview your changes locally

### 3. Documentation Style Guide

#### Headers
- Use Title Case for H1 (`# Title`)
- Use Sentence case for other headers
- Nest headers properly (H1 → H2 → H3)

#### Code Blocks
- Specify language for syntax highlighting
- Use meaningful examples
- Add comments for complex code

#### Links
- Use relative links for internal pages
- Use absolute links for external resources
- Check all links work

### 4. Submit Your Changes

1. Commit your changes:
```bash
git add .
git commit -m "docs: add guide for feature X"
```

2. Push to your fork:
```bash
git push origin docs/your-feature-name
```

3. Create a Pull Request:
   - Use a clear title and description
   - Reference related issues
   - Add screenshots if relevant
   - Request review from maintainers

## Local Development Tips

### Live Preview
- Changes are reflected immediately in development
- Use the sidebar search to find content
- Test on different screen sizes
- Check dark/light mode appearance

### Common Issues

1. Missing Sidebar Items
   - Check `_meta.json` files
   - Verify file names match entries

2. Broken Links
   - Use relative paths from current file
   - Start internal links with `/`

3. Styling Issues
   - Use Tailwind classes for styling
   - Check both dark and light modes

## Need Help?

- Open an issue for questions
- Join our Discord community
- Check existing documentation
- Contact maintainers

## Code of Conduct

Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing.

## License

By contributing, you agree that your contributions will be licensed under the same [MIT License](LICENSE) that covers this project. 