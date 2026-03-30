/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: __dirname,
  // Mongoose must be resolvable in serverless; dynamic imports can skip tracing.
  serverExternalPackages: ["mongoose"],
  outputFileTracingIncludes: {
    "/**": [
      "./node_modules/mongoose/**/*",
      "./node_modules/mongodb/**/*",
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

