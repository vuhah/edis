/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	env: {
		SERVER_URL: 'http://localhost:3000',
		GOOGLE_CLIENT_ID:
			'679695451412-a8gsop7ua1d8nmmi0v8jjmrh531neku5.apps.googleusercontent.com',
		GOOGLE_CLIENT_SECRET: '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',
	},
	images: {
		domains: ['firebasestorage.googleapis.com', 'img.freepik.com'],
	},
}

module.exports = nextConfig
