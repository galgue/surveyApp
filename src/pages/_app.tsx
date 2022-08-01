import { withTRPC } from '@trpc/next';
import type { AppType } from 'next/dist/shared/lib/utils';
import type { AppRouter } from 'server/routers/app';
import 'styles/globals.css';
import { UserProvider } from '@auth0/nextjs-auth0';

const MyApp: AppType = ({ Component, pageProps }) => {
	return (
		<UserProvider>
			<div className='w-screen h-screen'>
				<Component {...pageProps} />
			</div>
		</UserProvider>
	);
};

export default withTRPC<AppRouter>({
	config({ ctx }) {
		/**
		 * If you want to use SSR, you need to use the server's full URL
		 * @link https://trpc.io/docs/ssr
		 */
		const url = process.env.VERCEL_URL
			? `https://${process.env.VERCEL_URL}/api/trpc`
			: 'http://localhost:3000/api/trpc';

		return {
			url,
			/**
			 * @link https://react-query.tanstack.com/reference/QueryClient
			 */
			// queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
		};
	},
	/**
	 * @link https://trpc.io/docs/ssr
	 */
	ssr: true,
})(MyApp);
