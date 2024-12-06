import type { DocsThemeConfig } from 'nextra-theme-docs';
import { CodeBlock } from './src/components/CodeBlock';

const config: DocsThemeConfig = {
	// Basic branding
	logo: <span style={{ fontWeight: 600 }}>Moondream Documentation</span>,

	// Project links
	project: {
		link: 'https://github.com/vikhyat/moondream',
	},
	docsRepositoryBase: 'https://github.com/m87-labs/moondream-docs/tree/main',

	// Header navigation
	navbar: {
		extraContent: (
			<a href='https://moondream.ai' target='_blank' rel='noopener noreferrer' className='nx-text-sm nx-font-medium nx-text-gray-600 hover:nx-text-gray-800'>
				moondream.ai →
			</a>
		),
	},

	// Head tags and SEO
	head: (
		<>
			<meta name='viewport' content='width=device-width, initial-scale=1.0' />
			<meta property='og:title' content='Moondream Documentation' />
			<meta property='og:description' content='Documentation for the Moondream vision-language model' />
			<meta name='color-scheme' content='light' />
			<script
				dangerouslySetInnerHTML={{
					__html: `
						window.localStorage.setItem("theme", "light");
						window.localStorage.setItem("theme_default", "light");
						document.documentElement.classList.add("light");
						document.documentElement.classList.remove("dark");
					`,
				}}
				key='force-light-mode'
			/>
		</>
	),

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

	// Theme configuration
	darkMode: false,
	nextThemes: {
		defaultTheme: 'light',
		forcedTheme: 'light',
		storageKey: 'theme',
	},

	// Theme color configuration
	color: {
		hue: 214, // Blue hue (#4363cc)
		saturation: 60,
		lightness: {
			dark: 60,
			light: 45
		}
	},
	backgroundColor: {
		light: '250,250,255'
	},

	// Table of contents
	toc: {
		float: true,
		title: 'On This Page',
	},

	// Code block component override
	components: {
		code: ({ children, className, ...props }: any) => {
			const extractText = (node: any): string => {
				if (typeof node === 'string') return node;
				if (Array.isArray(node)) return node.map(extractText).join('');
				if (node?.props?.children) return extractText(node.props.children);
				return '';
			};

			const content = extractText(children);
			return (
				<CodeBlock code={content} className={className} {...props}>
					{children}
				</CodeBlock>
			);
		},
	},
};

export default config;
