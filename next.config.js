/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ["upload.wikimedia.org", "preview.keenthemes.com"],
    },
};

module.exports = nextConfig;
