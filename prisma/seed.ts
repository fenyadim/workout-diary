import { db } from '@/lib/prisma'
import { IExecrise } from '@/types/exercises'

const BASE_IMG =
	'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises'

async function main() {
	const res = await fetch(
		'https://raw.githubusercontent.com/fenyadim/free-exercise-db-ru/refs/heads/main/exercises.json',
	)
	const exercises: IExecrise[] = await res.json()

	console.log(`Импортируем ${exercises.length} упражнений...`)

	for (const ex of exercises) {
		await db.exercise.create({
			data: {
				name: ex.name_ru,
				description: ex.instructions_ru?.[0] ?? '',
				instructions: ex.instructions_ru ?? [],
				primaryMuscle: ex.primaryMuscle?.[0] ?? 'other',
				muscles: ex.secondaryMuscle ?? [],
				equipment: ex.equipment ?? null,
				level: ex.level ?? 'beginner',
				category: ex.category ?? 'strength',
				imageUrl: ex.images?.[0] ? `${BASE_IMG}/${ex.images[0]}` : null,
				imageUrl2: ex.images?.[1] ? `${BASE_IMG}/${ex.images[1]}` : null,
			},
		})
	}
	console.log('Готово!')
}

main()
	.catch(console.error)
	.finally(() => db.$disconnect)
