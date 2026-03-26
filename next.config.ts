import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			new URL(
				'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/**',
			),
		],
	},
}

export default nextConfig
