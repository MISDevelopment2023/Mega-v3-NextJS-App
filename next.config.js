/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // Allow iframes for Grafana embedding
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN',
                    },
                    {
                        key: 'Content-Security-Policy',
                        value: "frame-ancestors 'self'",
                    },
                ],
            },
        ];
    },
    // Allow external images if needed for Grafana
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
            {
                protocol: 'http',
                hostname: '**',
            },
        ],
    },
};

module.exports = nextConfig;

