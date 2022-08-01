import { createRouter } from 'server/createRouter';
import { z } from 'zod';

export const authRouter = createRouter()
	.query('current-user', {
		resolve({ ctx }) {
			return ctx.user
		},
	})
	.mutation('login', {
		input: z.object({
			userName: z.string(),
		}),
		async resolve() {},
	});
