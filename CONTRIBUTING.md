# Contributing to Moondream Documentation

Thank you for your interest in contributing to the Moondream documentation! This guide will help you get started with making contributions.

## 📚 Documentation Structure

The documentation is organized as follows:

```
docs/
├── Introduction
├── Getting Started
├── Capabilities/
│   ├── Visual Q&A
│   ├── Image Captioning
│   └── Object Detection 🚧
├── Advanced Topics/
│   ├── Configuration
│   └── Troubleshooting
└── Examples/
    ├── Basic Usage
    ├── Batch Processing
    ├── Streamlit Chat App
    └── Documentation Features
```

## 🚀 Getting Started

1. **Fork and Clone**
   ```bash
   git clone https://github.com/YOUR_USERNAME/moondream-docs.git
   cd moondream-docs
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **View Local Documentation**
   Open [http://localhost:3000](http://localhost:3000) in your browser

## 📝 Making Changes

### File Structure

- All documentation pages are in `src/pages/docs/`
- Use `.mdx` files for documentation pages
- Navigation is controlled by `_meta.tsx` files

### Adding New Pages

1. Create a new `.mdx` file in the appropriate directory
2. Update the corresponding `_meta.tsx` file to include your page
3. Follow the existing structure and formatting

### Writing Guidelines

- Use clear, concise language
- Include code examples where appropriate
- Add proper headings and sections
- Use Nextra components for enhanced formatting

### Nextra Components

```mdx
import { Callout } from 'nextra/components'
import { Steps } from 'nextra/components'
import { Tabs } from 'nextra/components'

<Callout type="info">
  Important information here
</Callout>

<Steps>
### Step 1
Content for step 1

### Step 2
Content for step 2
</Steps>

<Tabs items={['Python', 'JavaScript', 'TypeScript']}>
  <Tabs.Tab>Python content</Tabs.Tab>
  <Tabs.Tab>JavaScript content</Tabs.Tab>
  <Tabs.Tab>TypeScript content</Tabs.Tab>
</Tabs>
```

## 🔍 Review Process

1. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**
   - Follow the writing guidelines
   - Test your changes locally
   - Ensure all links work

3. **Commit Changes**
   ```bash
   git add .
   git commit -m "Description of changes"
   ```

4. **Submit Pull Request**
   - Push to your fork
   - Create a pull request
   - Fill out the PR template
   - Wait for review

## 🎨 Style Guide

### Markdown

- Use ATX-style headers (`#` for h1, `##` for h2, etc.)
- Include blank lines between sections
- Use backticks for inline code
- Use fenced code blocks with language specification

### Code Examples

- Include examples for Python, JavaScript, and TypeScript where applicable
- Use proper syntax highlighting
- Include comments for complex code
- Show both basic and advanced usage

### Components

- Use Callouts for important information
- Use Steps for sequential instructions
- Use Tabs for language-specific content
- Use proper spacing and indentation

## 🧪 Testing

1. **Local Testing**
   ```bash
   npm run dev
   ```

2. **Check Links**
   ```bash
   npm run check-links
   ```

3. **Build Test**
   ```bash
   npm run build
   ```

## 📋 Checklist Before Submitting

- [ ] Tested changes locally
- [ ] Updated relevant `_meta.tsx` files
- [ ] Added/updated code examples
- [ ] Checked spelling and grammar
- [ ] Verified all links work
- [ ] Followed style guide
- [ ] Added appropriate comments

## 🤝 Getting Help

- Join our [Discord community](https://discord.gg/moondream)
- Open an issue for questions
- Tag maintainers in comments

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License. 