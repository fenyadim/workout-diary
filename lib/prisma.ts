import { PrismaClient } from '@prisma/client/extension'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const g = globalThis as any

export const db = g.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') g.prisma = db
