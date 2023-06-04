"use client";

import Image from "next/image";
import Link from "next/link";
import { observable } from "@legendapp/state";
import { useSelector } from "@legendapp/state/react";

import { Navbar } from "@/components/navbar";
import { Content } from "@/components/content";
import { Input } from "@/components/ui/input";

import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useState } from "react";

export const revalidate = 0;

const state = observable({ message: "" });

export default function Home() {
	const [search, setSearch] = useState("");

	return (
		<>
			<Navbar currentTitle="Home" />
			<Content
				as="section"
				className="grid grid-cols-1 gap-3 my-16 sm:grid-cols-2 sm:gap-0"
			>
				<div className="flex items-center max-w-lg">
					<div className="flex flex-col gap-y-3">
						<h1 className="font-sans text-6xl font-black">
							Studying just got smarter.
						</h1>
						<h2 className="text-xl">
							Create concise and insightful book summaries in
							minutes with AI-powered text summarization.
						</h2>

						<div className="flex items-center w-full max-w-full mt-3 space-x-2 sm:max-w-sm">
							<Input
								type="text"
								placeholder="Summarize a book right now!"
								value={search}
								onChange={(e) => setSearch(e.target.value)}
							/>
							<Link
								href={{
									pathname: "/search",
									query: { search: search },
								}}
							>
								<Button type="submit">
									<Search className="w-5 h-5" />
								</Button>
							</Link>
						</div>
					</div>
				</div>

				<Image
					src="/images/student-going-to-school.svg"
					alt="student-going-to-school"
					className="mx-auto dark:invert"
					height={400}
					width={400}
				></Image>
			</Content>

			<Content
				as="section"
				className="mt-16"
				outerClassName="border-t border-border"
			>
				<h1 className="flex justify-center mx-auto font-sans text-4xl font-black">
					How it Works
				</h1>

				<div className="grid grid-cols-1 gap-8 mt-8 sm:grid-cols-3 ">
					<div className="flex flex-col items-center">
						<Image
							src="/images/web-design.svg"
							alt="search"
							height={300}
							width={300}
							className="mx-auto dark:invert"
						></Image>

						<div className="flex flex-row items-center">
							<div className="flex items-center justify-center w-8 h-8 text-white bg-orange-500 rounded-md dark:bg-sky-500">
								1
							</div>
							<div className="ml-4 text-lg font-semibold ">
								Search for your book
							</div>
						</div>

						<div className="mt-2 text-sm text-center text-gray-600">
							Search for the book you want to summarize.
						</div>
					</div>

					<div className="flex flex-col items-center">
						<Image
							src="/images/surreal-hourglass.svg"
							alt="surreal-hourglass"
							className="mx-auto dark:invert"
							height={300}
							width={300}
						></Image>

						<div className="flex flex-row items-center">
							<div className="flex items-center justify-center w-8 h-8 text-white bg-orange-500 rounded-md dark:bg-sky-500">
								2
							</div>
							<div className="ml-4 text-lg font-semibold">
								Wait for the magic
							</div>
						</div>
						<div className="mt-2 text-sm text-center text-gray-600">
							Our AI will summarize the book for you.
						</div>
					</div>

					<div className="flex flex-col items-center">
						<Image
							src="/images/work-from-home.svg"
							className="mx-auto dark:invert"
							alt="work-from-home"
							height={300}
							width={300}
						></Image>

						<div className="flex flex-row items-center">
							<div className="flex items-center justify-center w-8 h-8 text-white bg-orange-500 rounded-md dark:bg-sky-500">
								3
							</div>
							<div className="ml-4 text-lg font-semibold">
								View your summary
							</div>
						</div>
						<div className="mt-2 text-sm text-center text-gray-600">
							View the summary and start studying!
						</div>
					</div>
				</div>
			</Content>

			<Content
				as="section"
				className="px-4 py-16 mx-auto text-center max-w-7xl sm:px-6 lg:px-8"
				outerClassName="bg-secondary mt-16"
			>
				<h2 className="text-base font-semibold tracking-wide text-orange-600 uppercase dark:text-sky-500">
					AI-powered text summarization
				</h2>
				<p className="mt-1 text-4xl font-extrabold sm:text-5xl sm:tracking-tight lg:text-6xl">
					Try it out now!
				</p>
				<p className="max-w-xl mx-auto mt-5 text-xl ">
					Improve your studying experience and productivity workflow
					with our AI-powered text summarization. With Balladeer, you
					can get the gist of the book in minutes instead of hours.
				</p>
			</Content>

			<Content
				as="section"
				className="grid grid-cols-1 mt-16 sm:grid-cols-2 sm:gap-x-2 gap-x-0"
			>
				<div className="flex flex-col justify-center gap-y-2 sm:items-end">
					<h1 className="flex justify-center font-sans text-4xl font-bold text-center sm:text-end">
						Free, easy to use, and no ads.
					</h1>

					<div className="text-lg text-center sm:text-end">
						With Balladeer, you can get the gist of the book in
						minutes instead of hours. You can also use Balladeer to
						summarize your notes and lectures.
					</div>

					<a
						href="/search"
						className="mt-2 ml-auto text-lg font-semibold text-orange-500 dark:text-sky-500 sm:ml-0"
					>
						Get Started &rarr;
					</a>
				</div>

				<Image
					src="/images/surreal-flying-bulbs.svg"
					className="mx-auto dark:invert"
					alt="surreal-flying-bulbs"
					height={300}
					width={300}
				></Image>
			</Content>
		</>
	);
}
