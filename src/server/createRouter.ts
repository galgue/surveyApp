import * as trpc from '@trpc/server';
import { TRPCError } from '@trpc/server';

import type { Context } from './context';

export function createRouter() {
	return trpc.router<Context>();
}

export function createAuthanticatedRouter() {
	return createRouter().middleware(async ({ ctx, next }) => {
		if (!ctx.userId) {
			throw new TRPCError({ code: 'UNAUTHORIZED' });
		}
		return next();
	});
}
