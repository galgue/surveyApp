import { InferGetServerSidePropsType } from 'next';
import { withUser } from 'utils/auth0';

const Login = ({
	userLoggedIn,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	return (
		<div className='w-full h-full flex justify-center items-center'>
			<div className='flex flex-col place-content-between shadow-lg pt-8 pb-8 items-center w-1/4 h-1/4 bg-slate-100 rounded-xl text-neutral-600'>
				<div className='text-7xl font-bold'>LOGIN</div>
				{!userLoggedIn && (
					<a
						href='/api/auth/login'
						className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
					>
						Login
					</a>
				)}
			</div>
		</div>
	);
};

export const getServerSideProps = withUser({
	getServerSideProps: async ({ user }) => {
		return {
			props: {
				userLoggedIn: !!user,
			},
			...(user ? {
				redirect: {
					destination: '/',
					permanent: true
				},
			}: {}),
		};
	},
	redirectToLogin: false,
});

export default Login;
