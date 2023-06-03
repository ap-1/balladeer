"use client";

import { useEffect } from "react";

import { Navbar } from "@/components/navbar";
import { Content } from "@/components/content";

export const revalidate = 0;

async function getData() {
	try {
		const res = await fetch("/api/call", {
			method: "POST",
			body: JSON.stringify({
				product: "computers",
			}),
		});

		if (!res.body) {
			throw new Error("No response body");
		}

		const reader = res.body.getReader();
		const chunks = [];

		while (true) {
			const chunk = await reader.read();

			if (chunk.done) {
				break;
			}

			chunks.push(chunk.value);
		}

		return chunks.join("");
	} catch (e) {
		console.log(e)
	}
}

export default function Home() {
	useEffect(() => void getData().then(console.log).catch(console.error));

	return (
		<>
			<Navbar currentTitle="Home" />
			<Content as="main" className="py-8">
				balladeer
			</Content>
		</>
	);
}
