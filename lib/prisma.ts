import { PrismaClient } from '@/app/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({
	connectionString: process.env.DATABASE_URL!,
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const g = globalThis as any

export const db: PrismaClient = g.prisma ?? new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') g.prisma = db
