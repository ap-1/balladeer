"use client";

import { useEffect } from "react";

import { Navbar } from "@/components/navbar";
import Image from "next/image";
import { Send } from "lucide-react";
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
		console.log(e);
	}
}

export default function Home() {
	useEffect(() => void getData().then(console.log).catch(console.error));

	return (
		<>
			<Navbar currentTitle="Home" />
			<Content as="main" className="py-8 ">
				<div className="grid grid-cols-2">
					<div className="flex items-center max-w-lg">
						<div>
							<h1 className="font-black text-6xl font-sans">
								Studying just got smarter.
							</h1>
							<h2 className="mt-4 text-xl">
								Create concise and insightful book summaries in
								minutes with AI-powered text summarization.
							</h2>
							<div className="flex flex-row items-center relative mt-6 bg-white dark:bg-gray-700 border border-gray-300 rounded-md overflow-hidden">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none py-2 ">
									<svg
										className="h-5 w-5 text-gray-400"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path
											fill-rule="evenodd"
											d="M9 2a7 7 0 1 0 0 14A7 7 0 0 0 9 2zM1 9a8 8 0 1 1 16 0A8 8 0 0 1 1 9zm2 0a6 6 0 1 1 12 0A6 6 0 0 1 3 9z"
											clip-rule="evenodd"
										/>
									</svg>
								</div>
								<input
									type="text"
									placeholder="Summarize a book right now!"
									className="w-full pl-10 pr-4 focus:outline-none focus:border-blue-500 py-2 "
								/>
								<div className="bg-orange-400 px-3 py-2">
									<Send />
								</div>
							</div>
						</div>
					</div>
					<Image
						src="/images/student-going-to-school.svg"
						alt="schoolgirl"
						height={400}
						width={400}
						className=" mx-auto"
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
