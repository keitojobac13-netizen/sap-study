import type { NextConfig } from 'next';

const MODULES = 'fi|co|sd|mm|pp|abap|basis|ps';

const nextConfig: NextConfig = {
  // Two root layouts (`app/(ja)` and `app/en`) leave no single layout to build
  // a 404 from, so the 404 page is a whole document of its own.
  experimental: {
    globalNotFound: true,
  },

  async redirects() {
    // The site used to select language with `?lang=`, which produced two URLs
    // for the same page. English now lives under /en; send the old links there.
    return [
      {
        source: '/',
        has: [{ type: 'query', key: 'lang', value: 'en' }],
        destination: '/en',
        permanent: true,
      },
      {
        source: `/:module(${MODULES})`,
        has: [{ type: 'query', key: 'lang', value: 'en' }],
        destination: '/en/:module',
        permanent: true,
      },
      {
        source: '/dictionary',
        has: [{ type: 'query', key: 'lang', value: 'en' }],
        destination: '/en/dictionary',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
