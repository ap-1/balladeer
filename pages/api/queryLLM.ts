import { CallbackManager } from "langchain/callbacks";
import { PromptTemplate } from "langchain/prompts";
import { OpenAI } from "langchain/llms/openai";
import { LLMChain } from "langchain/chains";

// import { RedisCache } from "langchain/cache/redis";
// import { createClient } from "redis";

import { env } from "@/env.mjs";
import { z } from "zod";

import type { NextApiRequest, NextApiResponse } from "next";

// const client = createClient({
// 	url: env.UPSTASH_REDIS_URL,
// });

// client
// 	.connect()
// 	.then(() => console.log("Redis client connected"))
// 	.catch(console.error);

const prompt = new PromptTemplate({
	template: "What is a good name for a company that makes {product}?",
	inputVariables: ["product"],
});

const schema = z.object({
	input: z.string().min(1),
});

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		const body = JSON.parse(req.body);
		const query = schema.safeParse(body);

		if (!query.success) {
			return res.status(400).json({
				status: "error",
				message: "Invalid request",
				errors: query.error,
			});
		}

		res.writeHead(200, {
			"Content-Type": "application/octet-stream",
			"Transfer-Encoding": "chunked",
		});

		const model = new OpenAI({
			streaming: true,
			// cache: new RedisCache(client),
			openAIApiKey: env.OPENAI_API_KEY,
			callbacks: CallbackManager.fromHandlers({
				async handleLLMNewToken(token) {
					res.write(token);
				},
				async handleLLMEnd() {
					res.end();
				},
			}),
		});

		const chain = new LLMChain({ llm: model, prompt });
		await chain.call({ product: query.data.input });

		res.end();
	} catch (error: any) {
		console.error(error);

		res.status(500).json({
			status: "error",
			message: `Internal server error: ${error}`,
		});
	}
}
