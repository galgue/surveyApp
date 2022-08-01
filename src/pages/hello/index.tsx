import { withAuth } from 'lib/withAuth';
import { GetServerSideProps } from 'next';
import { trpc } from 'utils/trpc';

const HelloPage = () => {
	const helloData = trpc.useQuery([
		'hello',
		{
			text: 'ido',
		},
	]);

	return <div>{helloData.data?.greeting}</div>;
};

export const getServerSideProps = withAuth(
	async (context) => {
		return {
			props: {},
		};
	},
);

export default HelloPage;
