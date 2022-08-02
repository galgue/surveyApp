import { createRouter } from 'server/createRouter';
import { authRouter } from './auth';
import { surveyRouter } from './survey';
import { userRouter } from './user';

export const appRouter = createRouter()
	.merge('auth.', authRouter)
	.merge('survey.', surveyRouter)
	.merge('user.', userRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
