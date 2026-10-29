import { useEffect, useRef, useState } from 'react'
import { cx } from '../lib/cx'

export function Reveal({
  as: Tag = 'div',
  delay = 0,
  className = '',
  children,
  ...props
}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const element = ref.current
    if (!element || visible) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -48px 0px' },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [visible])

  return (
    <Tag
      ref={ref}
      className={cx('reveal', visible && 'is-visible', className)}
      style={{ transitionDelay: `${delay}ms` }}
      {...props}
    >
      {children}
    </Tag>
  )
}
