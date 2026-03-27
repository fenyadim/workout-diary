import { Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { MUSCLES_GROUP, translateMuscle } from '@/features/exercises'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/shared/ui/input-group'
import { IExecriseAPIItem } from '@/types/exercises'

interface ExercisesPageProps {
  exercisesItems: IExecriseAPIItem[]
  total: number
}

const levelsVariant = {
  beginner: 'success',
  intermediate: 'yellow',
  advanced: 'destructive',
}

export const ExercisesPage = ({ exercisesItems, total }: ExercisesPageProps) => {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-extrabold">Упражнения</h1>
        <p className="text-sm opacity-60">В базе имеется {total} упражнений</p>
      </div>
      <InputGroup>
        <InputGroupInput placeholder="Поиск упражнений..." />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
      </InputGroup>
      <div className="flex flex-wrap gap-1.5">
        <Link
          href={{
            pathname: '/exercises',
            query: { muscle: '' },
          }}
        >
          <Button>Все</Button>
        </Link>
        {MUSCLES_GROUP.map((item, idx) => (
          <Link
            key={`${idx}_${item}`}
            href={{
              pathname: '/exercises',
              query: { muscle: item },
            }}
          >
            <Button>{translateMuscle[item]}</Button>
          </Link>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-5">
        {exercisesItems.map(({ id, name, imageUrl, primaryMuscle, level }) => (
          <Card key={id} className="relative py-0 gap-0">
            <div className="absolute top-2 left-2 rounded-2xl z-1 bg-background">
              <Badge variant={levelsVariant[level]}>{level}</Badge>
            </div>
            <div className="relative h-40">
              <Image
                src={imageUrl}
                alt={name}
                fill={true}
                loading="eager"
                className="object-top object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="bg-white  px-3 pt-3 pb-4">
              <h2 className="truncate font-medium">{name}</h2>
              <p className="text-sm opacity-60">{translateMuscle[primaryMuscle]}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
