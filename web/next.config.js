/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  async redirects() {
    return [
      {
        source: "/download",
        destination: "https://chromewebstore.google.com/detail/bolt/iieomcnmomejdefhjfdljckabjldeenb",
        permanent: false,
        basePath: false,
      },
    ];
  },
};

export default config;
