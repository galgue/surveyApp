import { PrismaClient } from '@prisma/client';
import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { UserCookie } from 'types/auth/UserCookie';
import { appJwt } from 'utils/jwt';

export const prisma = new PrismaClient()

export async function createContext({
	req,
	res,
}: trpcNext.CreateNextContextOptions) {
	return { req, res, prisma };
}
export type Context = trpc.inferAsyncReturnType<typeof createContext>;
