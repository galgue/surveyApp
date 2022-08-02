import Error from 'next/error';
import { createRouter } from 'server/createRouter';
import { z } from 'zod';

export const surveyRouter = createRouter().mutation('create', {
	input: z.object({
		title: z.string(),
	}),
	resolve({ ctx, input }) {
		if (!ctx.userId) {
			throw new Error({ statusCode: 300 });
		}
		const newSurvey = ctx.prisma.survey.create({
			data: {
				title: input.title,
				creatorId: ctx.userId,
			},
		});

		return newSurvey;
	},
});
