import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { UserCookie } from "types/auth/UserCookie";
import { appJwt } from "utils/jwt";

export async function createContext({req, res}: trpcNext.CreateNextContextOptions) {

  let user: UserCookie | undefined = undefined;

	console.log('cookies', JSON.stringify(req.cookies))
	if(req.cookies.authorization) {
		user = appJwt<UserCookie>().verify(req.cookies.authorization);
	}

	return { user, req, res }
}
export type Context = trpc.inferAsyncReturnType<typeof createContext>;