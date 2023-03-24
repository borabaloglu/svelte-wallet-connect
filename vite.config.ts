import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import { generateSW } from './pwa.mjs';

const config: UserConfig = {
	// WARN: this will not be necessary on your project
	logLevel: 'info',
	// WARN: this will not be necessary on your project
	build: {
		minify: false
	},
	// WARN: this will not be necessary on your project
	define: {
		__DATE__: `'${new Date().toISOString()}'`,
		__RELOAD_SW__: false,
		'process.env.NODE_ENV': process.env.NODE_ENV === 'production' ? '"production"' : '"development"'
	},
	// WARN: this will not be necessary on your project
	server: {
		fs: {
			// Allow serving files from hoisted root node_modules
			allow: ['../..']
		}
	},
	plugins: [
		sveltekit(),
		SvelteKitPWA({
			srcDir: './src',
			mode: 'development',
			scope: '/',
			base: '/',
			selfDestroying: process.env.SELF_DESTROYING_SW === 'true',
			manifest: {
				short_name: 'Test',
				name: 'Test',
				start_url: '/',
				scope: '/',
				display: 'standalone',
				theme_color: '#10143D',
				background_color: '#10143D',
				icons: [
					{
						src: '/apple-touch-icon.png',
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: '/apple-touch-icon-precomposed.png',
						sizes: '512x512',
						type: 'image/png'
					},
					{
						src: '/apple-touch-icon-precomposed.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any maskable'
					}
				]
			},
			injectManifest: {
				globPatterns: ['fonts/**/*.{js,css,ico,png,svg,webp,woff,woff2,ttf}']
			},
			workbox: {
				globPatterns: ['fonts/**/*.{js,css,ico,png,svg,webp,woff,woff2,ttf}']
			},
			devOptions: {
				enabled: true,
				type: 'module',
				navigateFallback: '/'
			},
			// if you have shared info in svelte config file put in a separate module and use it also here
			kit: {}
		})
	]
};

export default config;
