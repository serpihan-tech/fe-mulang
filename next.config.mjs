/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: ["avatars.githubusercontent.com", "cdn.jsdelivr.net","optionally-topical-dassie.ngrok-free.app","4a99-103-23-103-97.ngrok-free.app", "http://localhost:3333"],
    },
};

export default nextConfig;
