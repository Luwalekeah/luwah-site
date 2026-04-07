const { withSentryConfig } = require("@sentry/nextjs");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/hub",
        destination: "https://links.luwahtechnologies.com/@hub",
        permanent: false,
      },
    ];
  },
};

module.exports = withSentryConfig(nextConfig, {
  silent: true,
  org: "luwah-technologies-llc",
  project: "javascript-nextjs",
});
