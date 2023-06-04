import { NextApiRequest, NextApiResponse } from "next";

import { BufferMemory } from "langchain/memory";
import { UpstashRedisChatMessageHistory } from "langchain/stores/message/upstash_redis";
import { PromptTemplate } from "langchain/prompts";
import { CallbackManager } from "langchain/callbacks";

import { ChatOpenAI } from "langchain/chat_models/openai";
import { ConversationChain } from "langchain/chains";

import { getAuth } from "@clerk/nextjs/server";
import { env } from "@/env.mjs";
import { z } from "zod";

const prompt = new PromptTemplate({
	template:
		"You are an accurate, resourceful, and knowledgeable literature expert capable of answering any question with regards to any book. Follow the specific format of the query asked by your student. Here is their question: {input}",
	inputVariables: ["input"],
});

const schema = z.object({
	input: z.string().min(1),
});

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		const { userId } = getAuth(req);

		if (!userId) {
			return res.status(401).json({
				status: "error",
				message: "You must sign in to use this endpoint",
			});
		}

		const body = JSON.parse(req.body);
		const query = schema.safeParse(body);

		if (!query.success) {
			return res.status(400).json({
				status: "error",
				message: "Invalid request",
				errors: query.error,
			});
		}

		const memory = new BufferMemory({
			chatHistory: new UpstashRedisChatMessageHistory({
				sessionId: userId,
				config: {
					url: env.UPSTASH_REDIS_REST_URL,
					token: env.UPSTASH_REDIS_REST_TOKEN,
				},
			}),
		});

		res.writeHead(200, {
			"Content-Type": "application/octet-stream",
			"Transfer-Encoding": "chunked",
		});

		const model = new ChatOpenAI({
			streaming: true,
			modelName: "gpt-3.5-turbo",
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

		const chain = new ConversationChain({ llm: model, memory, prompt });
		await chain.call({ input: query.data.input });

		res.end();
	} catch (error: any) {
		console.error(error);

		res.status(500).json({
			status: "error",
			message: `Internal server error: ${error}`,
		});
	}
}
