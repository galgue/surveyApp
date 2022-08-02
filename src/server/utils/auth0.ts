import { getSession } from '@auth0/nextjs-auth0';
import { IncomingMessage, ServerResponse } from 'http';
import { NextApiRequest, NextApiResponse } from 'next';

export const getUserAuth0Id = (
	req: IncomingMessage | NextApiRequest,
	res: ServerResponse | NextApiResponse<any>,
) => {
	const userSession = getSession(req, res);
	if (!userSession) {
		return undefined;
	}

	const user = userSession.user as { sub: string };
	return user.sub;
};
