# Changelog

All notable changes to the Moondream documentation will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2024-03-12

### Added

- Initial documentation setup using Next.js and Nextra v3
- Core documentation structure:
  - Getting Started guide
  - Advanced Configuration
  - Examples section
  - Troubleshooting guide

#### Documentation Framework
- Chose Nextra v3 for:
  - Modern MDX support
  - Built-in dark mode
  - Excellent search functionality
  - TypeScript support
  - Performance optimizations

#### Structure Decisions
- Organized content into logical sections:
  ```
  src/pages/docs/
  ├── getting-started.mdx    # Quick start and basic usage
  ├── advanced/             # Advanced topics
  │   ├── configuration.mdx
  │   └── troubleshooting.mdx
  └── examples/            # Real-world examples
      ├── basic-usage.mdx
      ├── batch-processing.mdx
      └── streamlit-chat.mdx
  ```

#### Feature Implementation
- Implemented Nextra 3 features:
  - Converted all `_meta.json` to `_meta.tsx` for better TypeScript support
  - Added interactive code examples
  - Included comprehensive API documentation
  - Added LaTeX support for mathematical notation
  - Implemented file tree visualization
  - Added tabbed content sections

#### Content Strategy
- Focus on:
  - Clear, concise explanations
  - Practical code examples
  - Progressive disclosure of complexity
  - Comprehensive troubleshooting guides
  - Real-world usage examples

#### Developer Experience
- Added development guides:
  - Contributing guidelines
  - Local development setup
  - Documentation style guide
  - Best practices

### Technical Decisions

#### Framework Selection
- **Next.js**: For its excellent React support and static site generation
- **Nextra v3**: Latest version with improved features and performance
- **MDX**: For rich content with React components
- **Tailwind CSS**: For consistent styling

#### Code Organization
- TypeScript for type safety
- Modular component structure
- Reusable code examples
- Clear separation of concerns

### Future Plans

#### Short Term
- [ ] Add more interactive examples
- [ ] Include visual guides and diagrams
- [ ] Expand troubleshooting section
- [ ] Add performance optimization guide

#### Long Term
- [ ] Add internationalization support
- [ ] Create video tutorials
- [ ] Build interactive playground
- [ ] Implement versioned documentation

### Known Issues
- Some code examples need more context
- Navigation could be improved for mobile
- Need more real-world examples
- Performance optimizations pending

### References
- [Nextra Documentation](https://nextra.site)
- [MDX Documentation](https://mdxjs.com)
- [Next.js Documentation](https://nextjs.org/docs)

---

## Notes for Contributors

When making changes to the documentation:

1. **Content Updates**
   - Follow the established structure
   - Use provided components for consistency
   - Include practical examples
   - Update relevant sections in navigation

2. **Feature Additions**
   - Document in this changelog
   - Update navigation structure
   - Add to example section if applicable
   - Include tests if adding components

3. **Version Updates**
   - Follow semver for version numbers
   - Document breaking changes clearly
   - Update all relevant documentation
   - Test across different devices/browsers 