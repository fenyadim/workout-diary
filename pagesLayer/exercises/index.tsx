import { Search, SlidersHorizontal } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { MUSCLES_GROUP, translateMuscle } from '@/features/exercises'
import { cn } from '@/lib/utils'
import { IExecriseAPIItem } from '@/types/exercises'

interface ExercisesPageProps {
  exercisesItems: IExecriseAPIItem[]
  total: number
  currentMuscle?: string
}

export const ExercisesPage = ({ exercisesItems, total, currentMuscle }: ExercisesPageProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-white pb-24">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-4 pb-3">
        <h1 className="text-[26px] font-extrabold text-foreground">Упражнения</h1>
        <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
          <SlidersHorizontal size={18} className="text-foreground" />
        </div>
      </div>

      {/* Search */}
      <div className="px-6 pb-4">
        <div className="flex items-center gap-2.5 h-12 rounded-2xl bg-muted px-4">
          <Search size={18} className="text-muted-foreground shrink-0" />
          <span className="text-[15px] text-muted-foreground">Поиск упражнений...</span>
        </div>
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 px-6 pb-4 overflow-x-auto scrollbar-none">
        <Link href={{ pathname: '/exercises', query: { muscle: '' } }}>
          <span
            className={cn(
              'inline-flex items-center h-9 px-4 rounded-full text-[13px] font-semibold whitespace-nowrap transition-colors',
              !currentMuscle ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
            )}
          >
            Все
          </span>
        </Link>
        {MUSCLES_GROUP.map((item) => (
          <Link key={item} href={{ pathname: '/exercises', query: { muscle: item } }}>
            <span
              className={cn(
                'inline-flex items-center h-9 px-4 rounded-full text-[13px] font-medium whitespace-nowrap transition-colors',
                currentMuscle === item
                  ? 'bg-primary text-white font-semibold'
                  : 'bg-muted text-muted-foreground'
              )}
            >
              {translateMuscle[item]}
            </span>
          </Link>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-3 px-6">
        {exercisesItems.map(({ id, name, imageUrl, primaryMuscle, level }) => (
          <Link key={id} href={`/exercises/${id}`}>
            <div className="rounded-[20px] bg-muted overflow-hidden flex flex-col">
              <div className="relative h-36">
                <Image
                  src={imageUrl}
                  alt={name}
                  fill
                  loading="eager"
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 50vw, 200px"
                />
              </div>
              <div className="px-3 pt-2.5 pb-3 flex flex-col gap-1">
                <p className="text-[13px] font-semibold text-foreground truncate">{name}</p>
                <p className="text-[11px] text-muted-foreground">
                  {translateMuscle[primaryMuscle]}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
