import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {
		DATABASE_URL: z.string().url(),

		OPENAI_API_KEY: z.string().min(1),
		COHERE_API_KEY: z.string().min(1),
		HUGGINGFACEHUB_API_KEY: z.string().min(1),

		REDIS_URL: z.string().url(),
		UPSTASH_REDIS_REST_URL: z.string().url(),
		UPSTASH_REDIS_REST_TOKEN: z.string().min(1),

		CLERK_SECRET_KEY: z.string().min(1),
	},
	client: {
		NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
	},
	runtimeEnv: process.env,
});
