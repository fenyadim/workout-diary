import { db } from '@/lib/prisma'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
	const s = req.nextUrl.searchParams
	const q = s.get('q') ?? ''
	const muscle = s.get('muscle') ?? ''
	const level = s.get('level') ?? ''
	const page = Math.max(1, Number(s.get('page') ?? 1))
	const limit = 24

	const where = {
		AND: [
			q ? { name: { contains: q, mode: 'insensitive' as const } } : {},
			muscle ? { primaryMuscle: muscle } : {},
			level ? { level } : {},
		],
	}

	const [items, total] = await Promise.all([
		db.exercise.findMany({
			where,
			select: {
				id: true,
				name: true,
				primaryMuscle: true,
				level: true,
				category: true,
				imageUrl: true,
			},
			orderBy: { name: 'asc' },
			skip: (page - 1) * limit,
			take: limit,
		}),
		db.exercise.count({ where }),
	])

	return Response.json({ items, total, pages: Math.ceil(total / limit) })
}
