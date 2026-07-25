import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Both icon packs export thousands of modules; without this, cold
    // compiles crawl and the dev bundle balloons.
    optimizePackageImports: ["@phosphor-icons/react", "@icons-pack/react-simple-icons"],
  },
};

export default nextConfig;
