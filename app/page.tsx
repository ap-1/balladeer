"use client";

import { observable } from "@legendapp/state";
import { useSelector } from "@legendapp/state/react";

import { Navbar } from "@/components/navbar";
import { Content } from "@/components/content";

export const revalidate = 0;

const state = observable({ message: "" });

export default function Home() {
	const message = useSelector(() => state.message.get());

	const generate = async () => {
		const response = await fetch("/api/queryLLM", {
			method: "POST",
			body: JSON.stringify({ input: "computers" }),
		});

		const stream = response.body;

		if (!stream) {
			return console.error("Could not access stream");
		}

		const reader = stream.getReader();

		try {
			const decoder = new TextDecoder();

			while (true) {
				const { done, value } = await reader.read();

				if (done) {
					break;
				}

				state.message.set((prev) => prev + decoder.decode(value));
			}
		} catch (error) {
			console.error(error);
		} finally {
			reader.releaseLock();
		}
	};

	return (
		<>
			<Navbar currentTitle="Home" />
			<Content as="main" className="py-8">
				<button className="mb-2" onClick={generate}>
					Click me to generate text
				</button>
				{message}
			</Content>
		</>
	);
}
