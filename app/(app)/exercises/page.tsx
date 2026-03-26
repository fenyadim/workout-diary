import { ExercisesPage } from '@/pagesLayer/exercises'
import { IExecriseAPIReturn } from '@/types/exercises'

export default async function ExercisesRoute({
	searchParams,
}: {
	searchParams: Promise<{ q?: string; muscle?: string; level?: string }>
}) {
	const params = new URLSearchParams({
		q: (await searchParams).q ?? '',
		muscle: (await searchParams).muscle ?? '',
		level: (await searchParams).level ?? '',
	})

	const data: IExecriseAPIReturn = await fetch(
		`http://localhost:3000/api/exercises?${params}`,
		{
			cache: 'no-store',
		},
	).then(r => r.json())

	const muscles = [...new Set(data.items.map(e => e.primaryMuscle))].sort()

	return <ExercisesPage exercisesItems={data.items} total={data.total} />
}
