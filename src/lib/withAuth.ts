import { GetServerSideProps, PreviewData } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { UserCookie } from 'types/auth/UserCookie';
import { appJwt } from 'utils/jwt';

export const withAuth = <P, Q extends ParsedUrlQuery, D extends PreviewData>(getServerSideProps: GetServerSideProps<P, Q, D>) => {
	const authServerSideProps: GetServerSideProps<P, Q, D> = async (context) => {
		const { req } = context;

		if (
			!req.cookies.authorization ||
			!appJwt<UserCookie>().verify(req.cookies.authorization)
		) {
			return {
				redirect: {
					destination: '/login',
					permanent: false,
				},
			};
		}

		return await getServerSideProps(context);
	};
	return authServerSideProps;
};
