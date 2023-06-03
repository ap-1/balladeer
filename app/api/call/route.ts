"use server";

import { CallbackManager } from "langchain/callbacks";
import { PromptTemplate } from "langchain/prompts";
import { OpenAI } from "langchain/llms/openai";
import { LLMChain } from "langchain/chains";

// import { RedisCache } from "langchain/cache/redis";
// import { createClient } from "redis";
import { env } from "@/env.mjs";

import { NextResponse, type NextRequest } from "next/server";

// const client = createClient({
// 	url: env.UPSTASH_REDIS_REST_URL,
// });

// client
// 	.connect()
// 	.then(() => console.log("Redis client connected"))
// 	.catch(console.error);

const model = new OpenAI({
	streaming: true,
	// cache: new RedisCache(client),
	openAIApiKey: env.OPENAI_API_KEY,
});

const chain = new LLMChain({
	llm: model,
	prompt: new PromptTemplate({
		template: "What is a good name for a company that makes {product}?",
		inputVariables: ["product"],
	}),
});

const toStream = (product: string) =>
	new ReadableStream({
		async pull(controller) {
			const callbacks = CallbackManager.fromHandlers({
				handleLLMNewToken: controller.enqueue,
				handleLLMEnd: () => controller.close(),
			});

			await chain.call({ product }, callbacks);
		},
	});

export async function POST(request: NextRequest) {
	const res = await request.json();
	const stream = toStream(res.product);

	return new NextResponse(stream);
}
