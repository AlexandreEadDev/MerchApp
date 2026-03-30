const path = require("path");

const repoRoot = path.join(__dirname, "../..");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: repoRoot,
  serverExternalPackages: ["mongoose"],
  outputFileTracingIncludes: {
    "/**": [
      "./node_modules/mongoose/**/*",
      "./node_modules/mongodb/**/*",
      "./apps/web/node_modules/mongoose/**/*",
      "./apps/web/node_modules/mongodb/**/*",
    ],
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "www.paypalobjects.com" },
      { protocol: "https", hostname: "icons.iconarchive.com" },
      { protocol: "https", hostname: "user-images.githubusercontent.com" },
    ],
  },
};

module.exports = nextConfig;
