import { Prisma, PrismaClient } from '@prisma/client'
import { DefaultArgs } from '@prisma/client/runtime/library'

export type IDatabaseConnection = PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>

export const databaseConnection = new PrismaClient()
