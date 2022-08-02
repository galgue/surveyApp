import { createAuthanticatedRouter, createRouter } from 'server/createRouter';
import { z } from 'zod';

export const authRouter = createRouter().merge(
	'auth.',
	createAuthanticatedRouter().mutation('save-user', {
		input: z.object({
			userName: z.string(),
			userId: z.string(),
		}),
		async resolve({ ctx, input }) {
			const { prisma } = ctx;
			let user = prisma.user.findUnique({
				where: {
					id: input.userId,
				},
			});

			if (!user) {
				user = prisma.user.create({
					data: {
						id: input.userId,
						name: input.userName,
					},
				});
			}

			return user;
		},
	}),
);
