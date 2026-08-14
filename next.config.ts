import type { NextConfig } from "next";

// Derive the production Strapi hostname from the STRAPI_URL env var.
// Falls back to undefined (no extra pattern added) when the var is absent.
const strapiHostname = process.env.STRAPI_URL
  ? new URL(process.env.STRAPI_URL).hostname
  : undefined;

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "1337",
        pathname: "/uploads/**",
      },
      // Local Strapi dev server
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      // Production Strapi host (resolved from STRAPI_URL at build time)
      ...(strapiHostname
        ? [
            {
              protocol: "https" as const,
              hostname: strapiHostname,
              pathname: "/uploads/**",
            },
          ]
        : []),
    ],
  },

  async headers() {
    return [
      {
        // Apply security headers to every route
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;