/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: ["avatars.githubusercontent.com", "cdn.jsdelivr.net","optionally-topical-dassie.ngrok-free.app","7b13-103-23-103-97.ngrok-free.app"],
    },
};

export default nextConfig;
