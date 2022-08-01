import {
	withPageAuthRequired,
	UserProfile,
	getSession,
	PageRoute
} from '@auth0/nextjs-auth0';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { ParsedUrlQuery } from 'querystring';

type WithPageAuthRequiredAndUser = <P>(opt?: {
	returnTo?: string
	getServerSideProps?: (context: GetServerSidePropsContext & { user: UserProfile }) => Promise<GetServerSidePropsResult<P>>
}) => PageRoute<P, ParsedUrlQuery>;

export const withPageAuthRequiredAndUser: WithPageAuthRequiredAndUser = (opts) => {
	if (!opts) {
		return withPageAuthRequired();
	}

	const { getServerSideProps, returnTo } = opts;

	if (!getServerSideProps) {
		return withPageAuthRequired({
			returnTo: returnTo,
		});
	}

	
	return withPageAuthRequired({
		returnTo: returnTo,
		getServerSideProps: (context) => {
			const user = getSession(context.req, context.res)?.user as UserProfile;
			return getServerSideProps({...context, user: user});
		},
	});
}
