import { cx } from '../lib/cx'

const base =
  'group inline-flex items-center justify-center gap-2 rounded-full font-medium transition duration-300 ease-out disabled:pointer-events-none disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2'

const variants = {
  primary:
    'bg-forest text-cream shadow-[0_12px_30px_-18px_rgba(18,36,27,0.9)] hover:-translate-y-0.5 hover:bg-forest-deep active:translate-y-0',
  secondary:
    'border border-forest/25 bg-transparent text-forest hover:border-forest/60 hover:bg-forest/[0.04]',
  light:
    'bg-cream text-forest shadow-[0_12px_30px_-18px_rgba(0,0,0,0.55)] hover:-translate-y-0.5 hover:bg-white active:translate-y-0',
  outlineLight:
    'border border-cream/25 text-cream hover:border-cream/60 hover:bg-cream/10',
  clay:
    'bg-clay text-white shadow-[0_12px_30px_-18px_rgba(138,67,39,0.85)] hover:-translate-y-0.5 hover:bg-clay-deep active:translate-y-0',
  quiet:
    'border border-line bg-white/50 text-forest hover:border-stone/40 hover:bg-white',
}

const sizes = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-7 py-3.5 text-[0.95rem]',
}

function buttonClasses({ variant = 'primary', size = 'md', className = '' } = {}) {
  return cx(base, variants[variant], sizes[size], className)
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  children,
  ...props
}) {
  return (
    <button
      type={type}
      className={buttonClasses({ variant, size, className })}
      {...props}
    >
      {children}
    </button>
  )
}

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) {
  return (
    <a className={buttonClasses({ variant, size, className })} {...props}>
      {children}
    </a>
  )
}
