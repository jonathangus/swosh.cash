module.exports = {
  reactStrictMode: true,
  transpilePackages: [
    '@reservoir0x/reservoir-kit-ui',
    '@web3auth/web3auth-wagmi-connector',
    'ui',
    'web3-config',
  ],
  compiler: {
    styledComponents: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};
