import type { UserProfile } from '@auth0/nextjs-auth0';
import type { InferGetServerSidePropsType } from 'next';
import { withPageAuthRequiredAndUser } from 'utils/auth0';

const Home = ({
	user, customProp
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

	if(!user) {
		return <>
			damn
		</>
	}
	(user as UserProfile)

	return (
		<div className='flex flex-col gap-2'>
			{Object.entries(user).map(([k, v]) => (
				<div key={k}>{`${k}: ${v}`}</div>
			))}
		</div>
	);
};

export const getServerSideProps = withPageAuthRequiredAndUser({
	async getServerSideProps({user}) {
		console.log(user);
		return {
			props: {
				customProp: 'dada',
			}
		}
	},
	returnTo: '/login',
});

export default Home;
