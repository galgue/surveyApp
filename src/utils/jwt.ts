import jwt from 'jsonwebtoken';

export const appJwt = <T extends object>() => ({
	sign(input: T){
		return jwt.sign(input, process.env.secret || '')
	},
	verify(signedInput: string) {
		const user = (jwt.verify(signedInput, process.env.secret || '') as T);
		return user;
	},
})