import Link from 'next/link'

type Variant = 'teal' | 'purple' | 'dark'

interface CTAButtonProps {
  href: string
  children: React.ReactNode
  variant?: Variant
  external?: boolean
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const variantStyles: Record<Variant, string> = {
  teal: 'text-white',
  purple: 'text-white',
  dark: 'text-white bg-gray-900 hover:bg-gray-700',
}

const variantBg: Record<Variant, string | undefined> = {
  teal: 'rgb(0, 201, 167)',
  purple: 'rgb(128, 72, 245)',
  dark: undefined,
}

const sizeStyles = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg font-bold',
}

export default function CTAButton({
  href,
  children,
  variant = 'teal',
  external = false,
  className = '',
  size = 'md',
}: CTAButtonProps) {
  const baseClass = `inline-flex items-center justify-center rounded-full font-semibold transition-opacity hover:opacity-90 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`
  const bg = variantBg[variant]

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClass}
        style={bg ? { backgroundColor: bg } : undefined}
      >
        {children}
      </a>
    )
  }

  return (
    <Link
      href={href}
      className={baseClass}
      style={bg ? { backgroundColor: bg } : undefined}
    >
      {children}
    </Link>
  )
}
