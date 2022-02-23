module.exports = {
  images: {
    domains: ["imglite.avantstay.com"],
  },
  async rewrites() {
    return [
      {
        source: "/regions/:regionName",
        destination: "/homes?q=regionName=:regionName",
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/homes",
        permanent: true,
      },
    ];
  },
};
