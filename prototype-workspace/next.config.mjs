/** @type {import('next').NextConfig} */
const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig = {
  output: "export",
  basePath: isGitHubPages ? "/azure-portal-poc" : "",
  assetPrefix: isGitHubPages ? "/azure-portal-poc/" : undefined,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    formats: ["image/webp", "image/avif"],
  },
  trailingSlash: true,
  devIndicators: false,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      resourceQuery: /react/,
      use: [{ loader: "@svgr/webpack", options: { svgo: false } }],
    });
    return config;
  },
  async rewrites() {
    return [
      {
        source: "/_ado/:path*",
        destination: "https://dev.azure.com/msazure/One/_apis/:path*",
      },
    ];
  },
};

export default nextConfig;
