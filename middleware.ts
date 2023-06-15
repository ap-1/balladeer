import { pages } from "@/lib/pages";
import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
	publicRoutes: [
		...pages.reduce((acc, page) => {
			if (!page.protected) {
				acc.push(page.href);
			}

			return acc;
		}, [] as string[]),
	],
});

export const config = {
	matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
