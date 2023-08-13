/** @type {import('next').NextConfig} */
const nextConfig = {

    eslint: {
        ignoreDuringBuilds: true,
    },
    env: {
        BASE_URL: process.env.API_URL,
        MAIN_DOMAIN: process.env.MAIN_DOMAIN,
        PROJECT_URL: process.env.PROJECT_URL,
    }
}

module.exports = nextConfig
