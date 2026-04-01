import { ChevronRight, Dumbbell, Flame, Timer, Trophy, Zap } from 'lucide-react'

import { ProgramCard, StatsCard } from '@/features/dashboard'

export default function DashboardPage() {
  return (
    <div className="flex flex-col max-[390px]:px-6">
      {/* Header */}
      <div className="flex items-center justify-between pt-5 pb-3">
        <div className="flex flex-col gap-0.5">
          <span className="text-sm text-muted-foreground">Доброе утро,</span>
          <span className="text-xl font-extrabold text-foreground">Дима 👋</span>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
            <span className="text-sm font-bold text-white">A</span>
          </div>
        </div>
      </div>

      {/* Streak chip */}
      <div className="pb-4">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-primary/10">
          <Flame size={14} className="text-primary" />
          <span className="text-sm font-semibold text-primary">12 дней подряд</span>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 gap-2.5 pb-5">
        <StatsCard title="Тренировок" value="24" icon={Zap} isPrimary />
        <StatsCard title="Кг поднято" value="4 820" icon={Dumbbell} />
        <StatsCard title="Время" value="38 ч" icon={Timer} />
        <StatsCard title="Программы" value="3" icon={Trophy} />
      </div>

      {/* Programs section */}
      <div className="flex flex-col gap-3 pb-6">
        <div className="flex items-center justify-between">
          <span className="font-bold text-foreground">Мои программы</span>
          <span className="text-sm font-semibold text-primary">Все</span>
        </div>

        <ProgramCard />

        {/* Program 1 */}
        <div className="flex items-center gap-3.5 py-4 border-b border-border relative">
          <div className="w-11 h-11 rounded-[14px] bg-accent flex items-center justify-center shrink-0">
            <Dumbbell size={20} className="text-primary" />
          </div>
          <div className="flex flex-col gap-0.5 flex-1 min-w-0">
            <span className="text-[14px] font-semibold text-foreground">Силовая A/B</span>
            <span className="text-[12px] text-muted-foreground">5 упражнений · 3 дня/нед</span>
          </div>
          <ChevronRight size={18} className="text-muted-foreground" />
        </div>

        {/* Program 2 */}
        <div className="flex items-center gap-3.5 py-4">
          <div className="w-11 h-11 rounded-[14px] bg-[#e0f9f6] flex items-center justify-center shrink-0">
            <span className="text-lg">🏃</span>
          </div>
          <div className="flex flex-col gap-0.5 flex-1 min-w-0">
            <span className="text-[14px] font-semibold text-foreground">Кардио + тонус</span>
            <span className="text-[12px] text-muted-foreground">4 упражнения · 4 дня/нед</span>
          </div>
        </div>
      </div>
    </div>
  )
}
