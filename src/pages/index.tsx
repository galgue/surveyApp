import type { InferGetServerSidePropsType } from 'next';
import { withUser } from 'utils/auth0';

const Home = ({
	user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	return <div className='flex flex-col gap-2'>welcome {user?.nickname}</div>;
};

export const getServerSideProps = withUser({
	getServerSideProps: async ({ user }) => {
		return {
			props: {
				user,
			},
		};
	},
});

export default Home;
