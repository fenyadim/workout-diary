import { ChevronRight, Dumbbell } from 'lucide-react'

interface IProgramCardProps {}

export const ProgramCard = ({}: IProgramCardProps) => {
  return (
    <div className="flex items-center gap-3.5 py-4 border-b border-border relative">
      <div className="w-11 h-11 rounded-[14px] bg-accent flex items-center justify-center shrink-0">
        <Dumbbell size={20} className="text-primary" />
      </div>
      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-foreground">Силовая A/B</h3>
        <p className="text-xs text-muted-foreground">5 упражнений · 3 дня/нед</p>
      </div>
      <ChevronRight size={18} className="text-muted-foreground" />
    </div>
  )
}
