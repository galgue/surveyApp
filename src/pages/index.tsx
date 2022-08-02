import { useState } from 'react';
import { trpc } from 'utils/trpc';

const Home = () => {
	const [title, setTitle] = useState('');
	const { mutate: createSurvey } = trpc.useMutation('survey.create');

	const { data: surveys } = trpc.useQuery(['user.owned-surveys'], {
		ssr: false,
	});

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

export default Home;
