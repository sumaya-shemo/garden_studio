import { cx } from '../lib/cx'

export function LeafOutline({ className = '' }) {
  return (
    <svg
      viewBox="0 0 320 480"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M160 18C250 122 260 306 160 462 60 306 70 122 160 18Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M160 58v382M160 152c-46-12-75-46-87-94M160 152c46-12 75-46 87-94M160 258c-39-12-65-40-75-84M160 258c39-12 65-40 75-84M160 352c-31-10-52-32-60-66M160 352c31-10 52-32 60-66"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  )
}

export function LeafSprig({ className = '' }) {
  return (
    <svg
      viewBox="0 0 120 160"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M60 152C60 100 60 54 60 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M60 128c-22 0-36-14-36-34 22 0 36 14 36 34ZM60 96c22 0 36-14 36-34-22 0-36 14-36 34ZM60 68C38 68 24 54 24 34c22 0 36 14 36 34Z"
        stroke="currentColor"
        strokeWidth="1.3"
      />
    </svg>
  )
}

export function Eyebrow({ children, tone = 'light', className = '' }) {
  return (
    <span
      className={cx(
        'inline-flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.22em]',
        tone === 'dark' ? 'text-sage' : 'text-moss',
        className,
      )}
    >
      <span className="h-px w-7 bg-clay" aria-hidden="true" />
      {children}
    </span>
  )
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  action,
  tone = 'light',
  className = '',
  titleClassName = '',
  descriptionClassName = '',
}) {
  return (
    <header
      className={cx(
        'flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between lg:gap-16',
        className,
      )}
    >
      <div className="max-w-2xl">
        {eyebrow ? <Eyebrow tone={tone}>{eyebrow}</Eyebrow> : null}
        <h2
          id={id}
          className={cx(
            'mt-5 text-[2.35rem] leading-[1.05] tracking-[-0.03em] sm:text-5xl',
            tone === 'dark' ? 'text-cream' : 'text-forest',
            titleClassName,
          )}
        >
          {title}
        </h2>
      </div>
      {description || action ? (
        <div className="max-w-md lg:pb-1.5">
          {description ? (
            <p
              className={cx(
                'text-base leading-relaxed',
                tone === 'dark' ? 'text-cream/65' : 'text-stone',
                descriptionClassName,
              )}
            >
              {description}
            </p>
          ) : null}
          {action ? <div className="mt-6">{action}</div> : null}
        </div>
      ) : null}
    </header>
  )
}
