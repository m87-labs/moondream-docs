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
			<div className="flex items-center gap-4">
				<a href='https://discord.com/invite/tRUdpjDQfH' target='_blank' rel='noopener noreferrer' className='nx-text-xm nx-font-medium nx-text-gray-600 hover:nx-text-gray-800'>
					<svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
						<path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
					</svg>
				</a>
				<a href='https://moondream.ai' target='_blank' rel='noopener noreferrer' className='nx-text-xm nx-font-medium nx-text-gray-600 hover:nx-text-gray-800'>
					<span className="md:inline hidden">moondream.ai</span>
					<span className="md:hidden inline">home</span>
					<span className="inline-block ml-1">→</span>
				</a>
			</div>
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
