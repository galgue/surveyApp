import { useState } from 'react';
import { trpc } from 'utils/trpc';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

const Home = () => {
	const [title, setTitle] = useState('');
	const { mutate: createSurvey } = trpc.useMutation('survey.auth.create', {
		onSuccess() {
			refetchSurveys();
		},
	});

	const { data: surveys, refetch: refetchSurveys } = trpc.useQuery(
		['user.auth.owned-surveys'],
		{
			ssr: true,
		},
	);

	return (
		<div className='flex flex-col gap-2'>
			<div>{surveys?.map((s) => JSON.stringify(s))}</div>
			<div>create new survey</div>
			<input
				className='text-black'
				type='text'
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<button
				disabled={!title}
				onClick={() => {
					createSurvey({
						title,
					});
				}}
			>
				save
			</button>
		</div>
	);
};

export const getServerSideProps = withPageAuthRequired();

export default Home;
