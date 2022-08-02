import Error from 'next/error';
import { createAuthanticatedRouter, createRouter } from 'server/createRouter';

export const userRouter = createRouter().merge(
	'auth.',
	createAuthanticatedRouter().query('owned-surveys', {
		async resolve({ ctx }) {
			if (!ctx.userId) {
				throw new Error({ statusCode: 300 });
			}
			const userSurveys = await ctx.prisma.user.findUnique({
				where: { id: ctx.userId },
				include: { surveyCreate: true },
			});
			return userSurveys?.surveyCreate || [];
		},
	}),
);
