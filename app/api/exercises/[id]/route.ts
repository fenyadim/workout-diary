import { db } from '@/lib/prisma'
import { NextRequest } from 'next/server'

export async function GET(
	_req: NextRequest,
	ctx: RouteContext<'/api/exercises/[id]'>,
) {
	const { id } = await ctx.params
	const exercise = await db.exercise.findUnique({
		where: { id },
	})

	if (!exercise) return Response.json({ error: 'Not found' }, { status: 404 })

	return Response.json(exercise)
}
