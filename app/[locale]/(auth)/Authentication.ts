
import { signIn } from "next-auth/react";
import {toAuthUrl} from "@/helpers/general";
export async function login(
	email: string,
	password: string,
	success: any,
	faild: any,
	successRedirect: boolean = false,
	redirect: boolean = false,
	callback: string = toAuthUrl('/dashboard')
) {
	const result = await signIn("credentials", {
		email: email,
		password: password,
		redirect: redirect,
		callbackUrl: callback,
	}).then((response) => {
		console.log("error: ", response?.error);
		console.log("ok: ", response?.ok);
		if (response?.ok) {
			if (successRedirect) window.location.replace(callback);
		} else {
			faild({
				title: "Failed!",
				message: "Please check your email or password again",
				type: "danger",
			});
		}
	});
}
