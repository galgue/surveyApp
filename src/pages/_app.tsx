import { withTRPC } from '@trpc/next';
import type { AppType } from 'next/dist/shared/lib/utils';
import type { AppRouter } from 'server/routers/app';
import 'styles/globals.css';
import { UserProvider, useUser } from '@auth0/nextjs-auth0';
import Link from 'next/link';
import superjson from 'superjson';

const TopHeader = () => {
	const { user, isLoading, error } = useUser();

	return (
		<div className='w-screen h-24 shadow-md bg-emerald-600 flex items-center'>
			<div className='flex-1'></div>
			<div className='text-5xl flex-1'>Survey App</div>
			<div className='flex-1'>
				{isLoading && <>loading</>}
				{!isLoading && !user && <Link href='/login'>login</Link>}
				{!!user && (
					<div>
						<a href='/api/auth/logout'>Logout</a>
					</div>
				)}
			</div>
		</div>
	);
};

const MyApp: AppType = ({ Component, pageProps }) => {
	return (
		<UserProvider>
			<div className='w-screen h-screen flex flex-col'>
				<TopHeader />
				<div className='flex-grow'>
					<Component {...pageProps} />
				</div>
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
			headers() {
				return {
					// optional - inform server that it's an ssr request
					...ctx?.req?.headers,
					'x-ssr': '1',
				};
			},
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
