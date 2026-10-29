import { cx } from '../lib/cx'

export function LogoMark({ className = '' }) {
  return (
    <svg
      viewBox="0 0 44 44"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <circle cx="22" cy="22" r="21" stroke="currentColor" strokeOpacity="0.22" />
      <path
        d="M22 36V15"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M22 27.5c-6.4 0-10.6-4.3-10.6-10.2 6.4 0 10.6 4.3 10.6 10.2Z"
        fill="currentColor"
        fillOpacity="0.55"
      />
      <path
        d="M22 21.8c0-5.9 4.4-10.2 10.8-10.2 0 5.9-4.4 10.2-10.8 10.2Z"
        fill="currentColor"
      />
      <circle cx="22" cy="36" r="1.5" fill="var(--color-clay)" />
    </svg>
  )
}

export function Logo({ tone = 'dark', className = '' }) {
  return (
    <span
      className={cx(
        'inline-flex items-center gap-3',
        tone === 'light' ? 'text-cream' : 'text-forest',
        className,
      )}
    >
      <LogoMark className="h-10 w-10 shrink-0" />
      <span className="flex flex-col">
        <span className="font-display text-[1.32rem] leading-none tracking-[-0.02em]">
          Moss &amp; Meadow
        </span>
        <span
          className={cx(
            'mt-1 text-[0.5rem] font-semibold uppercase tracking-[0.24em]',
            tone === 'light' ? 'text-sage' : 'text-moss',
          )}
        >
          Garden design studio
        </span>
      </span>
    </span>
  )
}
