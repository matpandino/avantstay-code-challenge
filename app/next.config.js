module.exports = {
  images: {
    domains: ["imglite.avantstay.com"],
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
