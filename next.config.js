/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	experimental: {
		images: {
			remotePatterns: [
				{
					protocol: 'https',
					hostname: 'img.pexni.com'
				}
			]
		}
	}
}

module.exports = nextConfig
