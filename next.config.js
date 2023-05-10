const withTM = require("next-transpile-modules")([
  "@cloudscape-design/components",
]);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

const buildConfig = (_phase) => {
  const plugins = [withTM];
  const config = plugins.reduce((acc, next) => next(acc), {
    ...nextConfig,
  });
  return config;
};

module.exports = buildConfig();
