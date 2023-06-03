import "./env.mjs";

/** @type {import('next').NextConfig} */
const config = {
	reactStrictMode: true,
	modularizeImports: {
		"lucide-react": {
			transform: "lucide-react/dist/esm/icons/{{ kebabCase member }}",
		},
	},
	experimental: {
		serverActions: true,
		// typedRoutes: true,
	},
};

export default config;
