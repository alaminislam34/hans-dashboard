/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "10.10.7.51",
        port: "8000",
        pathname: "/media/**",
      },
    ],
  },
};

export default nextConfig;
