import { PrismaClient } from '@prisma/client';
import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { getUserAuth0Id } from './utils/auth0';

declare global {
	var prisma: PrismaClient | undefined;
}

export const prisma =
	global.prisma ||
	new PrismaClient({
		log: ['query'],
	});

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export async function createContext({
	req,
	res,
}: trpcNext.CreateNextContextOptions) {
	const userId = getUserAuth0Id(req, res);
	return { req, res, prisma, userId };
}
export type Context = trpc.inferAsyncReturnType<typeof createContext>;
