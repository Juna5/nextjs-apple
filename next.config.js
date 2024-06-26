/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: [
            "upload.wikimedia.org",
            "preview.keenthemes.com",
            "cdn.sanity.io",
            "lh3.googleusercontent.com",
        ],
    },
};

module.exports = nextConfig;
