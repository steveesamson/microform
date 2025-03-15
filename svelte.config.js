import { mdsvex, escapeSvelte } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';
import shiki from 'shiki'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: ['.md'],
	highlight: {
		highlighter: async (code, lang = 'text') => {
			const highlighter = await shiki.getHighlighter({ theme: 'poimandres' })
			// const highlighter = await shiki.getHighlighter({ theme: 'one-dark-pro' })
			const html = escapeSvelte(highlighter.codeToHtml(code, { lang }))
			return `{@html \`${html}\` }`
		}
	},
}
/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],

	kit: {
		adapter: adapter({
			// default options are shown
			outDir: "docs",
			pages: "docs",
			assets: "docs",
			fallback: null,
			precompress: false,
		}),
		paths: {
			// change below to your repo name
			base: process.argv.includes('dev') ? '' : process.env.BASE_PATH
		},
	},

	extensions: ['.svelte', '.md']
};

export default config;
