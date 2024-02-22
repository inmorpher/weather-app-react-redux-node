import react from '@vitejs/plugin-react-swc';
import autoprefixer from 'autoprefixer';
import { defineConfig } from 'vite';
// https://vitejs.dev/config/
export default defineConfig({
	build: {
		outDir: '../client/build',
	},
	plugins: [react()],
	server: {
		host: true,
	},
	css: {
		postcss: {
			plugins: [
				autoprefixer({
					overrideBrowserslist: ['>1%', 'last 2 versions'],
				}), // add options if needed
			],
		},
	},
});
