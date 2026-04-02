import { LucideIcon } from 'lucide-react'

import { ColorsType } from '../ui/program-card'

export interface IProgramCard {
  title: string
  count: number
  icon: LucideIcon
  color?: ColorsType
}
