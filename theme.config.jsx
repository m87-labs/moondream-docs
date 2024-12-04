import { DocsThemeConfig } from 'nextra-theme-docs';
import { useRouter } from 'next/router';
import { CodeBlock } from './src/components/CodeBlock';

/** @type {import('nextra-theme-docs').DocsThemeConfig} */
const config = {
	// Basic branding
	logo: <span style={{ fontWeight: 600 }}>Moondream Documentation</span>,

	// Project links
	project: {
		link: 'https://github.com/vikhyat/moondream',
	},
	docsRepositoryBase: 'https://github.com/m87-labs/moondream-docs',

	// Head tags and SEO
	head: (
		<>
			<meta name='viewport' content='width=device-width, initial-scale=1.0' />
			<meta property='og:title' content='Moondream Documentation' />
			<meta property='og:description' content='Documentation for the Moondream vision-language model' />
		</>
	),
	useNextSeoProps() {
		const { asPath } = useRouter();
		return {
			titleTemplate: asPath === '/' ? '%s' : '%s – Moondream',
			openGraph: {
				description: 'Documentation for the Moondream vision-language model'
			}
		};
	},

	// Theme customization
	color: {
		hue: 270,
		saturation: 65,
		lightness: {
			light: 45,
			dark: 65,
		},
	},

	// Navigation
	navigation: {
		prev: true,
		next: true,
	},

	// Sidebar configuration
	sidebar: {
		defaultMenuCollapseLevel: 2,
		autoCollapse: true,
	},

	// Footer
	footer: {
		content: <span>© {new Date().getFullYear()} M87 Labs. All rights reserved.</span>,
	},

	// Dark mode
	darkMode: false,

	// Table of contents
	toc: {
		float: true,
		title: 'On This Page',
	},

	// Code block component override
	components: {
		/**
		 * @param {object} props
		 * @param {string} props.children - The code content
		 * @param {string} props.className - The language class
		 */
		code: ({ children, className, ...props }) => {
			// Extract text content from the MDX structure
			const extractText = (node) => {
				if (typeof node === 'string') return node;
				if (Array.isArray(node)) return node.map(extractText).join('');
				if (node?.props?.children) return extractText(node.props.children);
				return '';
			};

			const content = extractText(children);
			return <CodeBlock code={content} className={className} {...props}>{children}</CodeBlock>;
		},
	},
};

export default config;
