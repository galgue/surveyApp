import { setCookie } from "cookies-next"
import type { UserCookie } from "types/auth/UserCookie";
import { appJwt } from "./jwt";

export const loginCookie = {
	set(userData: UserCookie) {
		setCookie('authorization', appJwt().sign(userData));
	}
}