'use client';

import { useEffect } from 'react';

type Gtag = (command: 'event', name: string, params: Record<string, string>) => void;

/**
 * Sends a GA4 `affiliate_click` event when a reader opens an affiliate link,
 * so placements and articles can be compared. The links are rendered on the
 * server with `data-ad-name` / `data-ad-slot`; one listener on the document
 * covers every one of them without making the article body a client component.
 *
 * GA reports: register `ad_name`, `ad_slot` and `ad_page` as event-scoped
 * custom dimensions to break the event down by them.
 */
export default function AffiliateClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.('a[data-ad-name]');
      if (!(link instanceof HTMLAnchorElement)) return;
      const gtag = (window as unknown as { gtag?: Gtag }).gtag;
      // No gtag: the GA tag is blocked or not loaded yet. (An opted-out
      // browser has gtag, but GA itself drops the hit.)
      if (typeof gtag !== 'function') return;
      gtag('event', 'affiliate_click', {
        ad_name: link.dataset.adName ?? '',
        ad_slot: link.dataset.adSlot ?? '',
        ad_page: location.pathname,
      });
    };
    // Capture, and middle-clicks too: the links open in a new tab.
    document.addEventListener('click', onClick, true);
    document.addEventListener('auxclick', onClick, true);
    return () => {
      document.removeEventListener('click', onClick, true);
      document.removeEventListener('auxclick', onClick, true);
    };
  }, []);

  return null;
}
