import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getSupabaseImagePatterns() {
  const patterns = [
    {
      protocol: "https",
      hostname: "**.supabase.co",
      pathname: "/storage/v1/object/public/**",
    },
  ];

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (supabaseUrl) {
    try {
      const hostname = new URL(supabaseUrl).hostname;
      if (!patterns.some((p) => p.hostname === hostname)) {
        patterns.push({
          protocol: "https",
          hostname,
          pathname: "/storage/v1/object/public/**",
        });
      }
    } catch {
      // ignore invalid URL
    }
  }

  return patterns;
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  async redirects() {
    return [
      {
        source: "/contacts",
        destination: "/consultation",
        permanent: true,
      },
      {
        source: "/contacts/:path*",
        destination: "/consultation",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      ...getSupabaseImagePatterns(),
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "atego36.ru",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "mmsmart.ru",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
