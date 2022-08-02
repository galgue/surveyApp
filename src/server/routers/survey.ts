import { createAuthanticatedRouter, createRouter } from 'server/createRouter';
import { z } from 'zod';

export const surveyRouter = createRouter().merge(
	'auth.',
	createAuthanticatedRouter().mutation('create', {
		input: z.object({
			title: z.string(),
		}),
		resolve({ ctx, input }) {
			const newSurvey = ctx.prisma.survey.create({
				data: {
					title: input.title,
					creatorId: ctx.userId!,
				},
			});

			return newSurvey;
		},
	}),
);
