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
		"You are a literature bot that provides the summary, characters, literary devices, and a Q&A for any book title a student gives. The student will provide the book title, author, year published, number of pages, and subject categories.Your response format should be an object. This is what a response would look like:  SUMMARY: SUMMARY OF BOOK(minimum 4 sentences), CHARACTERS: [name: CHARACTER NAME, description: CHARACTER DESCRIPTION , other characters], DEVICES: [ type: TYPEOFLITERARYDEVICE, reference: QUOTE description: EXPLANATION, more devices], Q&A: [ question: QUESTION, answer: ANSWER, more Q&As]. your book is animal farm ",
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
