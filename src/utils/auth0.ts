import {
	withPageAuthRequired,
	UserProfile,
	getSession,
	PageRoute,
	WithPageAuthRequiredOptions
} from '@auth0/nextjs-auth0';
import { ParsedUrlQuery } from 'querystring';

type NodeCallback<T, R> = (node: R) => Promise<T>

type GetServerSidePropsAuth0<P> = Required<WithPageAuthRequiredOptions<P>>['getServerSideProps'];

type ReturnPromiseType<T extends (...args: any) => Promise<any>> = T extends (...args: any) => Promise<infer R> ? R : any;
type ArgsPromiseType<T extends (arg: any) => Promise<any>> = T extends (arg: infer R) => Promise<any> ? R : any;

type GetServerSidePropsAuth0Returns<P> = ReturnPromiseType<GetServerSidePropsAuth0<P>>
type GetServerSidePropsAuth0Args<P> = ArgsPromiseType<GetServerSidePropsAuth0<P>>

type WithPageAuthRequiredAndUser = <P>(opt?: {
	returnTo?: string
	getServerSideProps?: (args: GetServerSidePropsAuth0Args<P> & { user: UserProfile }) => Promise<GetServerSidePropsAuth0Returns<P>>
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
