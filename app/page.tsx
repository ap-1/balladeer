"use client";

import Image from "next/image";
import { observable } from "@legendapp/state";
import { useSelector } from "@legendapp/state/react";

import { Navbar } from "@/components/navbar";
import { Content } from "@/components/content";
import { Input } from "@/components/ui/input";

import { Send, BookMarked } from "lucide-react";
import { Button } from "@/components/ui/button";

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
			<Content as="main" className="py-8 ">
				<div className="grid grid-cols-2">
					<div className="flex items-center max-w-lg">
						<div className="flex flex-col gap-y-3">
							<h1 className="font-black text-6xl font-sans">
								Studying just got smarter.
							</h1>
							<h2 className="text-xl">
								Create concise and insightful book summaries in
								minutes with AI-powered text summarization.
							</h2>

							<div className="flex w-full max-w-sm items-center space-x-2 mt-3">
								<BookMarked className="w-10 h-10" />
								<Input
									type="text"
									placeholder="Summarize a book right now!"
								/>
								<Button type="submit" onClick={generate}>
									<Send className="w-5 h-5" />
								</Button>
							</div>
						</div>
					</div>

					<Image
						src="/images/student-going-to-school.svg"
						alt="student-going-to-school"
						className="mx-auto h-[400px] w-[400px]"
						height={960}
						width={960}
					></Image>
				</div>

				<div className="mt-16">
					<h1 className="font-black text-4xl font-sans">
						How it works
					</h1>

					<div className="mt-8 grid grid-cols-3 gap-8">
						<div className="flex flex-col items-center">
							<div className="flex items-center justify-center h-12 w-12 rounded-md bg-orange-500 text-white">
								1
							</div>
							<div className="mt-4 text-lg font-semibold">
								Upload your book
							</div>
							<div className="mt-2 text-center text-sm text-gray-600">
								Upload your book in PDF format to our website.
							</div>
						</div>

						<div className="flex flex-col items-center">
							<div className="flex items-center justify-center h-12 w-12 rounded-md bg-orange-500 text-white">
								2
							</div>
							<div className="mt-4 text-lg font-semibold">
								Wait for the magic
							</div>
							<div className="mt-2 text-center text-sm text-gray-600">
								Our AI will summarize the book for you.
							</div>
						</div>

						<div className="flex flex-col items-center">
							<div className="flex items-center justify-center h-12 w-12 rounded-md bg-orange-500 text-white">
								3
							</div>
							<div className="mt-4 text-lg font-semibold">
								Download your summary
							</div>
							<div className="mt-2 text-center text-sm text-gray-600">
								Download the summary and start studying!
							</div>
						</div>
					</div>
				</div>

				<div className="bg-gray-200">
					<div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
						<div className="text-center">
							<h2 className="text-base font-semibold text-orange-600 tracking-wide uppercase">
								AI powered text summarization
							</h2>
							<p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
								Our customers love us
							</p>
							<p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
								Lorem ipsum dolor sit amet consectetur
								adipisicing elit. Possimus magnam voluptatum
								commodi, minima, eligendi dolorum.
							</p>
						</div>
					</div>
				</div>
			</Content>
		</>
	);
}
