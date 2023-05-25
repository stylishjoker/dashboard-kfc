/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "kfcvn-static.cognizantorderserv.com",
      "static.kfcvietnam.com.vn",
      "firebasestorage.googleapis.com",
      "i.pinimg.com",
    ],
  },
};

module.exports = nextConfig;
