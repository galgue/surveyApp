import {
	withPageAuthRequired,
	UserProfile,
	getSession,
	PageRoute,
	WithPageAuthRequiredOptions,
} from '@auth0/nextjs-auth0';
import { GetServerSideProps, Redirect } from 'next';
import { ParsedUrlQuery } from 'querystring';
import type { ArgsPromiseType, ReturnPromiseType } from 'types/custom';

type GetServerSidePropsAuth0<P> = Required<
	WithPageAuthRequiredOptions<P>
>['getServerSideProps'];

type GetServerSidePropsAuth0Returns<P> = ReturnPromiseType<
	GetServerSidePropsAuth0<P>
>;
type GetServerSidePropsAuth0Args<P> = ArgsPromiseType<
	GetServerSidePropsAuth0<P>
>;

type GetServerSidePropsWithUser<P> = (
	args: GetServerSidePropsAuth0Args<P> & { user?: UserProfile },
) => Promise<GetServerSidePropsAuth0Returns<P>>;

type WithPageAuthRequiredAndUser = <P>(opt?: {
	returnTo?: string;
	getServerSideProps?: GetServerSidePropsWithUser<P>;
}) => PageRoute<P, ParsedUrlQuery>;

export const withPageAuthRequiredAndUser: WithPageAuthRequiredAndUser = (
	opts,
) => {
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
			return getServerSideProps({ ...context, user: user });
		},
	});
};

export const withUser = <P>({
	getServerSideProps,
	redirectToLogin = true,
}: {
	getServerSideProps: GetServerSidePropsWithUser<P>;
	redirectToLogin?: boolean
}) => {
	const getServerSidePropsWithUser: GetServerSideProps<P> = async (context) => {
		const user = getSession(context.req, context.res)?.user as
			| UserProfile
			| undefined;
		if (!user && (redirectToLogin === true)) {
			const redirect: Redirect = {
				destination: '/login',
				permanent: true,
			};
			return {
				redirect,
			};
		}
		return getServerSideProps({ ...context, user: user });
	};
	return getServerSidePropsWithUser;
};
