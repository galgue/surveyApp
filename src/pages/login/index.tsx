import { useState } from "react";
import { loginCookie } from "utils/loginCookie";
import { useRouter } from 'next/router'
import { trpc } from "utils/trpc";

const Login = () => {

	const router = useRouter();

	const currentUser = trpc.useQuery(['auth.current-user']);

	// const [name, setName] = useState('');

	// const onLogin = () => {
	// 	//todo: add to prisma

	// 	loginCookie.set({userId: 1, userName: name})
	// 	router.replace('/');
	// }

	// if (!!currentUser.data) {
	// 	router.replace('/');
	// }

	return (
		<div className="w-full h-full flex justify-center items-center">
			<div className="flex flex-col place-content-between shadow-lg pt-8 pb-8 items-center w-1/4 h-1/4 bg-slate-100 rounded-xl text-neutral-600">
				<div className="text-7xl font-bold">
					LOGIN
				</div>
				{/* <input type='text' className="rounded-md pl-3" value={name} onChange={e => setName(e.target.value)} placeholder='name'>
				</input> */}
				<a href="/api/auth/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
					Login
				</a>
			</div>
		</div>
	)
}

export default Login;