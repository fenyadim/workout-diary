import { ChevronRight } from 'lucide-react'

import { cn } from '@/lib/utils'

import { IProgramCard } from '../type/program-card'

export type ColorsType = 'yellow' | 'purple'

const COLOR_STYLE: Record<ColorsType, string> = {
  purple: 'bg-purple-400',
  yellow: 'bg-yellow-400',
} as const

export const ProgramCard = ({ title, count, color = 'purple', icon: Icon }: IProgramCard) => {
  return (
    <div className="flex items-center gap-3.5 py-4 relative">
      <div
        className={cn(
          'w-11 h-11 rounded-md flex items-center justify-center shrink-0',
          COLOR_STYLE[color]
        )}
      >
        <Icon size={20} className="text-background/90" />
      </div>
      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        <p className="text-xs text-muted-foreground">{count} упражнений</p>
      </div>
      <ChevronRight size={18} className="text-muted-foreground" />
    </div>
  )
}
