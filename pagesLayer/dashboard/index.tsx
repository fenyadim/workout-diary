import { Dumbbell, Flame, HeartPulse, Timer, Trophy, Zap } from 'lucide-react'
import Link from 'next/link'
import { Fragment } from 'react'

import { IProgramCard, ProgramCard, StatsCard } from '@/features/dashboard'
import { Button } from '@/shared/ui/button'
import { Separator } from '@/shared/ui/separator'

const PROGRAM_CARDS: IProgramCard[] = [
  {
    title: 'Силовая A/B',
    count: 5,
    icon: Dumbbell,
    color: 'yellow',
  },
  {
    title: 'Кардио + тонус',
    count: 4,
    icon: HeartPulse,
  },
]

export const DashboardPage = () => {
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
          <h2 className="font-bold">Мои программы</h2>
          <span className="text-sm font-semibold text-primary">Все</span>
        </div>

        <div>
          {PROGRAM_CARDS.length > 0 ? (
            PROGRAM_CARDS.map(({ title, color, count, icon }, idx) => (
              <Fragment key={`${idx}_${title}`}>
                <ProgramCard title={title} color={color} count={count} icon={icon} />
                {idx !== PROGRAM_CARDS.length - 1 && <Separator />}
              </Fragment>
            ))
          ) : (
            <div className="flex flex-col items-center">
              <p className="text-muted-foreground text-sm text-center pt-5">Программ нет</p>
              <Button className="w-min" variant="link">
                <Link href="#">Создать программу</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
