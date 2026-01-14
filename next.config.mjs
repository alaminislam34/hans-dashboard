/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "10.10.7.51",
        port: "8000", // Optional: include if your images always come from this port
        pathname: "/media/**", // Optional: restrict to the media folder for better security
      },
    ],
  },
};

export default nextConfig;
