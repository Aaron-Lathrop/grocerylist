import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-only';
import cssnano from 'cssnano';
import purgecss from "@fullhuman/postcss-purgecss";
import sveltePreprocess from "svelte-preprocess";

const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/main.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js'
	},
	plugins: [
		svelte({
			preprocess: sveltePreprocess({
				sourceMap: !production,
				postcss: {
				  plugins: [
						require("postcss-import")(),
						// require('tailwindcss/nesting')(require('postcss-nesting')),
						require("tailwindcss"),
						require("autoprefixer"),
						production && cssnano(),
						// Only purge css in production
						production &&
							purgecss({
								content: ["./**/*.html", "./src/**/*.svelte"],
								defaultExtractor: content => [
								...(content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || []),
								...(content.match(/(?<=class:)[^=>\/\s]*/g) || []),
								],
							})
					],
				},
			}),
			compilerOptions: {
				// enable run-time checks when not in production
				dev: !production
			}
		}),

		css({ output: 'bundle.css' }),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration —
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: importee => importee === 'svelte' || importee.startsWith('svelte/')
		}),
		commonjs(),
		// getBabelOutputPlugin ({ presets: ['@babel/preset-env'] }),
		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};

function serve() {
	let started = false;

	return {
		writeBundle() {
			if (!started) {
				started = true;

				require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
					stdio: ['ignore', 'inherit', 'inherit'],
					shell: true
				});
			}
		}
	};
}
