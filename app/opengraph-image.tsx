import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const MODULES = ['FI', 'CO', 'SD', 'MM', 'PP'];

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1d4ed8 0%, #4338ca 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Logo */}
        <div
          style={{
            background: 'white',
            borderRadius: 20,
            width: 88,
            height: 88,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 48,
          }}
        >
          <span style={{ color: '#1d4ed8', fontWeight: 900, fontSize: 28, letterSpacing: -1 }}>
            SAP
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            color: 'white',
            fontSize: 72,
            fontWeight: 900,
            textAlign: 'center',
            marginBottom: 16,
            lineHeight: 1.1,
          }}
        >
          SAP学習ポータル
        </div>

        {/* Subtitle */}
        <div
          style={{
            color: 'rgba(255,255,255,0.75)',
            fontSize: 28,
            textAlign: 'center',
            marginBottom: 56,
          }}
        >
          Free SAP Study Portal — Bilingual JP / EN
        </div>

        {/* Module badges */}
        <div style={{ display: 'flex', gap: 16 }}>
          {MODULES.map((m) => (
            <div
              key={m}
              style={{
                background: 'rgba(255,255,255,0.15)',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: 10,
                padding: '8px 20px',
                color: 'white',
                fontSize: 24,
                fontWeight: 700,
              }}
            >
              {m}
            </div>
          ))}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
