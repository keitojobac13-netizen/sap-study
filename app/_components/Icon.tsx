type IconProps = {
  name: IconName;
  className?: string;
};

export type IconName =
  | 'menu'
  | 'globe'
  | 'search'
  | 'close'
  | 'book'
  | 'arrow-left'
  | 'arrow-right'
  | 'arrow-up'
  | 'check'
  | 'cross'
  | 'tip'
  | 'warn'
  | 'info'
  | 'mail';

/**
 * The site used emoji as its icon set, which renders as a different picture
 * on every platform and reads more casually than the material does. These are
 * one consistent stroke weight, inherit `currentColor`, and add no dependency.
 */
const PATHS: Record<IconName, React.ReactNode> = {
  menu: <path d="M3 6h18M3 12h18M3 18h18" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </>
  ),
  close: <path d="M6 6l12 12M18 6L6 18" />,
  book: (
    <>
      <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H19v16H5.5A1.5 1.5 0 0 1 4 18.5z" />
      <path d="M8 4v16" />
    </>
  ),
  'arrow-left': <path d="M19 12H5m0 0 6-6m-6 6 6 6" />,
  'arrow-right': <path d="M5 12h14m0 0-6-6m6 6-6 6" />,
  'arrow-up': <path d="M12 19V5m0 0-6 6m6-6 6 6" />,
  check: <path d="m5 13 4 4L19 7" />,
  cross: <path d="M6 6l12 12M18 6L6 18" />,
  tip: (
    <>
      <path d="M9 18h6M10 21h4" />
      <path d="M12 3a6 6 0 0 0-3.5 10.9c.3.3.5.7.5 1.1h6c0-.4.2-.8.5-1.1A6 6 0 0 0 12 3z" />
    </>
  ),
  warn: (
    <>
      <path d="M10.3 4.3 2.5 18a1.9 1.9 0 0 0 1.7 2.9h15.6A1.9 1.9 0 0 0 21.5 18L13.7 4.3a1.9 1.9 0 0 0-3.4 0z" />
      <path d="M12 9.5v4M12 17.2h.01" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 7.8h.01" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 6.5 8.5 6 8.5-6" />
    </>
  ),
};

export default function Icon({ name, className = 'w-4 h-4' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {PATHS[name]}
    </svg>
  );
}
