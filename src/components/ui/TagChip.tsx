import { cn } from '@/lib/utils'
import { Info, AlertTriangle, XCircle, CheckCircle, type LucideProps } from 'lucide-react'
import { type ReactNode, type ForwardRefExoticComponent, type RefAttributes } from 'react'

type Severity = 'info' | 'warning' | 'danger' | 'success'

interface TagChipProps {
  severity?: Severity
  children: ReactNode
  className?: string
}

type LucideIcon = ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>

const severityConfig: Record<
  Severity,
  { bg: string; text: string; Icon: LucideIcon }
> = {
  info: {
    bg: 'bg-primary/10 border border-primary/30',
    text: 'text-primary',
    Icon: Info,
  },
  warning: {
    bg: 'bg-warning/10 border border-warning/30',
    text: 'text-warning',
    Icon: AlertTriangle,
  },
  danger: {
    bg: 'bg-danger/10 border border-danger/30',
    text: 'text-danger',
    Icon: XCircle,
  },
  success: {
    bg: 'bg-success/10 border border-success/30',
    text: 'text-success',
    Icon: CheckCircle,
  },
}

export function TagChip({ severity = 'info', children, className }: TagChipProps) {
  const { bg, text, Icon } = severityConfig[severity]

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium',
        bg,
        text,
        className,
      )}
    >
      <Icon size={12} className={text} />
      {children}
    </span>
  )
}
