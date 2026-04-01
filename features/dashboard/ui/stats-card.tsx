import { LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

interface IStatsCardProps {
  value: string
  title: string
  icon: LucideIcon
  isPrimary?: boolean
}

export const StatsCard = ({ icon: Icon, title, value, isPrimary = false }: IStatsCardProps) => {
  return (
    <div
      className={cn('rounded-3xl bg-muted *:text-foreground p-5 flex flex-col gap-1', {
        'bg-primary *:text-primary-foreground': isPrimary,
      })}
    >
      <Icon size={18} className="opacity-70" />
      <span className="text-2xl font-extrabold leading-none mt-1">{value}</span>
      <p className="text-xs opacity-60">{title}</p>
    </div>
  )
}
