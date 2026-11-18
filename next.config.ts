import type { NextConfig } from 'next';
import { glossaryTerms } from './app/_lib/glossary';
import { hasTermPage } from './app/_lib/term-page-ids';

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
      // Vercel's default address serves the same site, and Google indexed it
      // alongside sapstudy.jp. Send every page there to the real domain.
      // Preview deployments have their own hosts and are left alone.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'sap-study-green.vercel.app' }],
        destination: 'https://sapstudy.jp/:path*',
        permanent: true,
      },
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
      // Every term used to have a page, most with only the one-paragraph
      // definition. Those thin pages are gone; send their URLs to the term's
      // entry on the glossary, which opens it from the fragment.
      ...glossaryTerms
        .filter((t) => !hasTermPage(t.id))
        .map((t) => ({
          source: `/dictionary/${t.id}`,
          destination: `/dictionary#${t.id}`,
          permanent: true,
        })),
    ];
  },
};

export default nextConfig;
