"use client";

import Image from "next/image";
import { observable } from "@legendapp/state";
import { useSelector } from "@legendapp/state/react";

import { Navbar } from "@/components/navbar";
import { Content } from "@/components/content";
import { Character } from "@/components/chat/character";
import { Questions } from "@/components/chat/q&a";
import { Devices } from "@/components/chat/devices";
import { Input } from "@/components/ui/input";
import { Album, Users, Feather, BarChartHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
	return (
		<>
			<Navbar currentTitle="Home" />
			<Content
				as="section"
				className="relative flex justify-center px-4 py-8 mx-auto overflow-hidden text-center max-w-7xl sm:px-0"
				outerClassName="bg-orange-500 dark:bg-sky-500 "
			>
				<div className="relative z-10 dark:text-white text-primary">
					<p className="mt-1 text-4xl font-extrabold sm:text-5xl sm:tracking-tight lg:text-6xl">
						Hamlet
					</p>
					<p className="p-2 mt-4 max-w-lg text-base font-semibold tracking-wide uppercase border-2 border-orange-900 rounded-md dark:border-orange-100">
						{'"Who\'s there?"'}
					</p>
				</div>
			</Content>
			<Content
				as="section"
				className="relative flex flex-row items-center px-4 text-lg max-w-7xl "
				outerClassName="border-b border-border"
			>
				<div className="py-4 mr-4">Jump to:</div>
				<a href="#summary">
					<button className="h-full px-5 py-4 duration-150 hover:bg-secondary">
						Summary
					</button>
				</a>
				<a href="#characters">
					<button className="h-full px-5 py-4 duration-150 hover:bg-secondary">
						Characters
					</button>
				</a>
				<a href="#devices">
					<button className="h-full px-5 py-4 duration-150 hover:bg-secondary">
						Literary Devices
					</button>
				</a>
				<a href="#q&a">
					<button className="h-full px-5 py-4 duration-150 hover:bg-secondary">
						Q&A
					</button>
				</a>
			</Content>

			<Content
				as="section"
				className="relative flex flex-col px-4 py-8 text-lg max-w-7xl "
				outerClassName="border-b border-border"
				id="stats"
			>
				<div className="font-semibold text-xl flex items-center gap-2 mb-2">
					<BarChartHorizontal />
					Hamlet Overview:
				</div>
				<div className="grid grid-cols-4 gap-4">
					<div className="flex flex-col ">
						<div className="font-semibold">Name:</div>
						<div>Hamlet</div>
					</div>
					<div className="flex flex-col ">
						<div className="font-semibold">Published Year:</div>
						<div>1603</div>
					</div>
					<div className="flex flex-col ">
						<div className="font-semibold">Number of Pages:</div>
						<div>304</div>
					</div>
					<div className="flex flex-col ">
						<div className="font-semibold">Author:</div>
						<div>William Shakespeare</div>
					</div>
				</div>
			</Content>

			<Content
				as="section"
				className="relative flex flex-col px-4 py-8 text-lg max-w-7xl "
				outerClassName="border-b border-border"
				id="summary"
			>
				<div className="font-semibold text-xl flex items-center gap-2 mb-2">
					<Album />
					Summary:
				</div>
				First performed around 1600, Hamlet tells the story of a prince
				whose duty to revenge his father’s death entangles him in
				philosophical problems he can’t solve. Shakespeare’s best-known
				play is widely regarded as the most influential literary work
				ever written. Read a character analysis of Hamlet, plot summary,
				and important quotes.
			</Content>
			<Content
				as="section"
				className="relative flex flex-col px-4 py-8 text-lg max-w-7xl "
				outerClassName="border-b border-border"
				id="characters"
			>
				<div className="font-semibold text-xl flex items-center gap-2 mb-2">
					<Users />
					Characters:
				</div>
				<Character
					characters={[
						{
							name: "Hamlet",
							description:
								"Hamlet is the main character of the story and is very edgy.",
						},
						{ name: "The Ghost", description: "he is a guy" },
						{ name: "Claudius", description: "he is a guy" },
						{ name: "Gertrude", description: "he is a guy" },
						{ name: "Polonius", description: "he is a guy" },
						{ name: "Horatio", description: "he is a guy" },
					]}
				/>
			</Content>
			<Content
				as="section"
				className="relative flex flex-col px-4 py-8 text-lg max-w-7xl "
				outerClassName="border-b border-border"
				id="devices"
			>
				<div className="font-semibold text-xl flex items-center gap-2 mb-2">
					<Feather />
					Literary Devices:
				</div>
				<Devices
					devices={[
						{
							type: "Alliteration",
							reference:
								"I will speak daggers to her, but use none.",
							description:
								"Hamlet uses alliteration to emphasize his anger towards his mother.",
						},
					]}
				/>
			</Content>
			<Content
				as="section"
				className="relative flex flex-col px-4 py-8 text-lg max-w-7xl "
				outerClassName="border-b border-border"
				id="q&a"
			>
				<div className="font-semibold text-xl flex items-center gap-2 mb-2">
					<Feather />
					Q&A
				</div>
				<Questions
					questions={[
						{
							question: "What is the meaning of life?",
							answer: "42",
						},
					]}
				/>
			</Content>
		</>
	);
}
