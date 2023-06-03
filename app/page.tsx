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

				<div className="mt-16 ">
					<h1 className="flex justify-center font-black mx-auto text-4xl font-sans">
						How it Works
					</h1>

					<div className="mt-8 grid grid-cols-3 gap-8">
						<div className="flex flex-col items-center">
							<Image
								src="/images/web-design.svg"
								alt="search"
								height={300}
								width={300}
								className=" mx-auto"
							></Image>
							<div className="flex flex-row items-center">
								<div className="flex items-center justify-center h-8 w-8 rounded-md bg-orange-500 text-white">
									1
								</div>
								<div className=" ml-4 text-lg font-semibold">
									Search for your Book
								</div>
							</div>

							<div className="mt-2 text-center text-sm text-gray-600">
								Search for the book you want to summarize.
							</div>
						</div>

						<div className="flex flex-col items-center">
							<Image
								src="/images/surreal-hourglass.svg"
								alt="wait"
								height={300}
								width={300}
								className=" mx-auto"
							></Image>
							<div className="flex flex-row items-center">
								<div className="flex items-center justify-center h-8 w-8 rounded-md bg-orange-500 text-white">
									2
								</div>
								<div className="ml-4 text-lg font-semibold">
									Wait for the magic
								</div>
							</div>
							<div className="mt-2 text-center text-sm text-gray-600">
								Our AI will summarize the book for you.
							</div>
						</div>

						<div className="flex flex-col items-center">
							<Image
								src="/images/work-from-home.svg"
								alt="study"
								height={300}
								width={300}
								className=" mx-auto"
							></Image>
							<div className="flex flex-row items-center">
								<div className="flex items-center justify-center h-8 w-8 rounded-md bg-orange-500 text-white">
									3
								</div>
								<div className="ml-4 text-lg font-semibold">
									Download your summary
								</div>
							</div>
							<div className="mt-2 text-center text-sm text-gray-600">
								Download the summary and start studying!
							</div>
						</div>
					</div>
				</div>

				<div className="bg-gray-200 mt-16">
					<div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
						<div className="text-center">
							<h2 className="text-base font-semibold text-orange-600 tracking-wide uppercase">
								AI-powered text summarization
							</h2>
							<p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
								Try it out now!
							</p>
							<p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
								Improve your studying experience and
								productivity workflow with our AI-powered text
								summarization. With Balladeer, you can get the
								gist of the book in minutes instead of hours.
							</p>
						</div>
					</div>
				</div>

				<div className="mt-16">
					<div className="grid grid-cols-2">
						<div className="flex flex-col items-end justify-center">
							<h1 className="flex justify-center font-bold text-4xl font-sans">
								Free, easy to use, and no ads.
							</h1>

							<div className="mt-2 text-end text-lg text-gray-900">
								With Balladeer, you can get the gist of the book
								in minutes instead of hours. You can also use
								Balladeer to summarize your notes and lectures.
							</div>
							<p>
								<a
									href="#"
									className="mt-2 text-lg font-semibold text-orange-500"
								>
									Get Started &rarr;
								</a>
							</p>
						</div>
						<Image
							src="/images/surreal-flying-bulbs.svg"
							alt="study"
							height={300}
							width={300}
							className=" mx-auto"
						></Image>
					</div>
				</div>
			</Content>
		</>
	);
}
