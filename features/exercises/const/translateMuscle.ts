import { MUSCLES_GROUP } from './musclesGroup'

type TranslateMuscleType = {
	[key in (typeof MUSCLES_GROUP)[number]]: string
}

export const translateMuscle: TranslateMuscleType = {
	abdominals: 'Пресс',
	adductors: 'Бедра',
	calves: 'Голень',
	chest: 'Грудь',
	glutes: 'Ягодицы',
	lats: 'Спина',
	quadriceps: 'Квадрицепс',
	shoulders: 'Плечи',
}
