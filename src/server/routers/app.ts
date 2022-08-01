import { z } from 'zod';

import { createRouter } from 'server/createRouter';
import { authRouter } from './auth';

export const appRouter = createRouter()
	.merge('auth.', authRouter);

// export type definition of API
export type AppRouter = typeof appRouter;