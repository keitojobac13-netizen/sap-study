import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const MODULES = ['FI', 'CO', 'SD', 'MM', 'PP', 'ABAP', 'Basis', 'PS'];

/**
 * Set on the same warm paper as the site, so a shared link looks like the
 * page it opens. The indigo is the site accent; the modules are a plain
 * ruled row rather than badges, matching the home page's restraint.
 */
export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#faf9f7',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '96px',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            color: '#4338ca',
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: 2,
            marginBottom: 40,
          }}
        >
          <div style={{ width: 40, height: 3, background: '#4338ca' }} />
          SAPSTUDY.JP
        </div>

        <div
          style={{
            color: '#1c1917',
            fontSize: 84,
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: -2,
            marginBottom: 20,
          }}
        >
          SAP学習ポータル
        </div>

        <div style={{ color: '#44403c', fontSize: 32, marginBottom: 64 }}>
          Free, bilingual JP / EN learning for SAP consultants
        </div>

        <div
          style={{
            display: 'flex',
            gap: 28,
            paddingTop: 32,
            borderTop: '1px solid #e4e1dd',
            color: '#6f6862',
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: 1,
          }}
        >
          {MODULES.map((m) => (
            <div key={m}>{m}</div>
          ))}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
