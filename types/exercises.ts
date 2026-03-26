import { MUSCLES_GROUP } from '@/features/exercises'

export interface IExecrise {
	name: string // en name
	force: string
	level: string
	mechanic: string
	equipment: string
	primaryMuscle: string[]
	secondaryMuscle: string[]
	instructions: string[]
	category: string
	images: string[]
	id: string
	name_ru: string
	instructions_ru: string[]
}

export interface IExecriseAPIItem extends Pick<
	IExecrise,
	'id' | 'name' | 'level' | 'category'
> {
	imageUrl: string
	primaryMuscle: (typeof MUSCLES_GROUP)[number]
}

export interface IExecriseAPIReturn {
	items: IExecriseAPIItem[]
	total: number
	pages: number
}
