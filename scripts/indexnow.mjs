// Tell Bing (and other IndexNow engines) about new or updated pages.
//
// Usage (after the deploy is live):
//   node scripts/indexnow.mjs https://sapstudy.jp/articles/foo https://sapstudy.jp/dictionary/bar
//   node scripts/indexnow.mjs --since 2026-11-20   # every sitemap URL with lastmod on/after the date
//   node scripts/indexnow.mjs --all                # every sitemap URL
//   add --dry-run to print the list without sending
//
// The key file lives at public/<KEY>.txt and must be reachable on the live site.

const HOST = 'sapstudy.jp';
const KEY = '44823cb07ac6d00a318ca0d22840bdac';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const sinceIdx = args.indexOf('--since');
const since = sinceIdx >= 0 ? args[sinceIdx + 1] : null;
const all = args.includes('--all');
const explicit = args.filter((a, i) => a.startsWith('https://') && args[i - 1] !== '--since');

async function sitemapUrls() {
  const xml = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
  const entries = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(([, body]) => ({
    loc: body.match(/<loc>(.*?)<\/loc>/)?.[1],
    lastmod: body.match(/<lastmod>(.*?)<\/lastmod>/)?.[1] ?? '',
  }));
  return entries
    .filter((e) => e.loc && (all || (since && e.lastmod.slice(0, 10) >= since)))
    .map((e) => e.loc);
}

// Set exitCode instead of calling process.exit(): exiting right after fetch
// trips a libuv assertion on Windows.
async function main() {
  const urls = explicit.length ? explicit : all || since ? await sitemapUrls() : [];
  if (!urls.length) {
    console.error('No URLs. Pass URLs, --since YYYY-MM-DD, or --all.');
    return 1;
  }
  if (urls.some((u) => new URL(u).host !== HOST)) {
    console.error(`Every URL must be on ${HOST}.`);
    return 1;
  }

  console.log(`${urls.length} URL(s):\n${urls.join('\n')}`);
  if (dryRun) return 0;

  const keyRes = await fetch(KEY_LOCATION);
  if (!keyRes.ok || (await keyRes.text()).trim() !== KEY) {
    console.error(`Key file is not live at ${KEY_LOCATION}. Deploy first.`);
    return 1;
  }

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList: urls }),
  });
  // 200 = accepted, 202 = accepted (key check pending). Anything else is a failure.
  console.log(`IndexNow: HTTP ${res.status} ${await res.text()}`);
  return res.status === 200 || res.status === 202 ? 0 : 1;
}

process.exitCode = await main();
