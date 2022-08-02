import { prisma } from "server/context";
import { withUser } from "utils/auth0";

const GenerateUserPage = () => {
	return (
		<></>
	);
};

export const getServerSideProps = withUser({
	getServerSideProps: async ({ user }) => {

		if(!user || !user.sub) {
			return {
				redirect: {
					destination: '/login',
					permanent: true,
				}
			}
		}

		let userInDb = await prisma.user.findUnique({
			where: {
				id: user?.sub,
			},
		});

		if (!userInDb) {
			userInDb = await prisma.user.create({
				data: {
					id: user.sub,
					name: user.nickname || '',
				},
			});
		}

		if(!userInDb) {
			return {
				redirect: {
					destination: '/login',
					permanent: true,
				}
			}
		}

		return {
			redirect: {
				destination: '/',
				permanent: true,
			}
		}
	},
});

export default GenerateUserPage;
