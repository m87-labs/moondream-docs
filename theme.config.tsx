// import type { DocsThemeConfig } from 'nextra-theme-docs';
import { useRouter } from 'next/router';
import { CodeBlock } from './src/components/CodeBlock';

const config = {
	// Basic branding
	logo: <span style={{ fontWeight: 600 }}>Moondream Documentation</span>,

	// Project links
	project: {
		link: 'https://github.com/vikhyat/moondream',
	},
	docsRepositoryBase: 'https://github.com/m87-labs/moondream-docs',

	// Header navigation
	navbar: {
		extraContent: (
			<a
				href="https://moondream.ai"
				target="_blank"
				rel="noopener noreferrer"
				className="nx-text-sm nx-font-medium nx-text-gray-600 hover:nx-text-gray-800 dark:nx-text-gray-400 dark:hover:nx-text-gray-200"
			>
				moondream.ai →
			</a>
		)
	},

	// Head tags and SEO
	head: (
		<>
			<meta name='viewport' content='width=device-width, initial-scale=1.0' />
			<meta property='og:title' content='Moondream Documentation' />
			<meta property='og:description' content='Documentation for the Moondream vision-language model' />
			<meta name='color-scheme' content='light' />
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

	// // Sidebar configuration
	// sidebar: {
	// 	defaultMenuCollapseLevel: 2,
	// 	autoCollapse: true,
	// },

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
		code: ({ children, className, ...props }: any) => {
			// Extract text content from the MDX structure
			const extractText = (node: any): string => {
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
