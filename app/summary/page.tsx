"use client";

import { useState, useEffect, type SetStateAction, type Dispatch } from "react";

import { Navbar } from "@/components/navbar";
import { Content } from "@/components/content";
import {
	Album,
	Users,
	Feather,
	BarChartHorizontal,
	Lightbulb,
} from "lucide-react";

import { Character } from "@/components/chat/character";
import { Questions } from "@/components/chat/q&a";
import { Devices } from "@/components/chat/devices";
import { useSearchParams } from "next/navigation";

export default function Book() {
	const searchParams = useSearchParams();

	const title = searchParams?.get("title");
	const author = searchParams?.get("author");
	const year = searchParams?.get("year");
	const pages = searchParams?.get("pages");
	const subjects = searchParams?.get("subjects");
	const characters = searchParams?.get("characters");
	const firstSentence = searchParams?.get("firstSentence");

	const [summary, setSummary] = useState("");
	const [characterInfo, setCharacterInfo] = useState<string[]>([]);
	const [devices, setDevices] = useState("");
	const [questionsAndAnswers, setQuestionsAndAnswers] = useState("");

	const generate = async (
		question: string,
		setter: Dispatch<SetStateAction<string>>
	) => {
		const response = await fetch("/api/converse", {
			method: "POST",
			body: JSON.stringify({ input: question }),
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

				setter((prev) => prev + decoder.decode(value));
			}
		} catch (error) {
			console.error(error);
		} finally {
			reader.releaseLock();
		}
	};

	useEffect(() => {
		generate(
			`Give me a short summary (~4 sentences) of the novel ${title} by ${author} (${year})`,
			setSummary
		);
	}, [author, title, year]);

	return (
		<>
			<Navbar currentTitle="Home" />
			<Content
				as="section"
				className="relative flex justify-center px-4 py-8 mx-auto overflow-hidden text-center max-w-7xl sm:px-0"
				outerClassName="bg-orange-500 dark:bg-sky-500 "
			>
				<div className="relative z-10 dark:text-white text-primary">
					<p className="mt-1 text-4xl font-extrabold text-white dark:text-primary sm:text-5xl sm:tracking-tight lg:text-6xl">
						{title}
					</p>
					<p className="max-w-lg px-4 py-2 mt-4 text-base font-semibold tracking-wide text-white uppercase border-2 border-white rounded-md dark:text-primary">
						&ldquo;{firstSentence}&rdquo;
					</p>
				</div>
			</Content>

			<section className="flex flex-row flex-wrap items-center justify-around text-lg border-b border-border">
				<a href="#summary" className="flex-grow">
					<button className="w-full h-full px-5 py-4 duration-150 hover:bg-secondary">
						Summary
					</button>
				</a>

				<a href="#characters" className="flex-grow">
					<button className="w-full h-full px-5 py-4 duration-150 hover:bg-secondary">
						Characters
					</button>
				</a>

				<a href="#devices" className="flex-grow">
					<button className="w-full h-full px-5 py-4 duration-150 hover:bg-secondary">
						Devices
					</button>
				</a>

				<a href="#q&a" className="flex-grow">
					<button className="w-full h-full px-5 py-4 duration-150 hover:bg-secondary">
						Q&A
					</button>
				</a>
			</section>

			<Content
				as="section"
				className="relative flex flex-col py-8 text-lg"
				outerClassName="border-b border-border"
				id="stats"
			>
				<div className="flex items-center gap-2 mb-4 text-xl font-semibold">
					<BarChartHorizontal />
					{title} Overview
				</div>

				<div className="flex flex-row flex-wrap justify-between gap-4">
					<div className="flex flex-col">
						<div className="font-semibold">Name:</div>
						<div>{title}</div>
					</div>

					<div className="flex flex-col">
						<div className="font-semibold">Published Year:</div>
						<div>{year}</div>
					</div>

					<div className="flex flex-col">
						<div className="font-semibold">Number of Pages:</div>
						<div>{pages}</div>
					</div>

					<div className="flex flex-col">
						<div className="font-semibold">Author:</div>
						<div>{author}</div>
					</div>
				</div>
			</Content>

			<Content
				as="section"
				className="relative flex flex-col py-8 text-lg"
				outerClassName="border-b border-border"
				id="summary"
			>
				<div className="flex items-center gap-2 mb-4 text-xl font-semibold">
					<Album />
					Summary
				</div>
				{summary}
			</Content>

			<Content
				as="section"
				className="relative flex flex-col py-8 text-lg"
				outerClassName="border-b border-border"
				id="characters"
			>
				<div className="flex items-center gap-2 mb-4 text-xl font-semibold">
					<Users />
					Characters
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
				className="relative flex flex-col py-8 text-lg"
				outerClassName="border-b border-border"
				id="devices"
			>
				<div className="flex items-center gap-2 mb-4 text-xl font-semibold">
					<Feather />
					Literary Devices
				</div>

				<Devices
					devices={[
						{
							type: "Alliteration",
							reference:
								"I will speak daggers to her, butvxc use none.",
							description:
								"Hamlet uses alliteration to emphasize his anger towards his mother.",
						},
						{
							type: "Alliteration",
							reference:
								"I will speak daggevcxrs to her, but use none.",
							description:
								"Hamlet uses alliteration to emphasize his anger towards his mother.",
						},
						{
							type: "Alliteration",
							reference:
								"I will speak daggers to vcxher, but use none.",
							description:
								"Hamlet uses alliteration to emphasize his anger towards his mother.",
						},
						{
							type: "Alliteration",
							reference:
								"I will speak dagvdcxgers to her, but use none.",
							description:
								"Hamlet uses alliteration to emphasize his anger towards his mother.",
						},
					]}
				/>
			</Content>

			<Content
				as="section"
				className="relative flex flex-col pt-8 text-lg"
				id="q&a"
			>
				<div className="flex items-center gap-2 mb-4 text-xl font-semibold">
					<Lightbulb />
					Q&A
				</div>

				<Questions
					questions={[
						{
							question: "What is the meaning of life?",
							answer: "42",
						},
						{
							question: "What is the meaning of life 2?",
							answer: "42",
						},
						{
							question: "What is the meaning of life 3?",
							answer: "42",
						},
						{
							question: "What is the meaning of life 4?",
							answer: "42",
						},
						{
							question: "What is the meaning of life 5?",
							answer: "42",
						},
						{
							question: "What is the meaning of life 6?",
							answer: "42",
						},
					]}
				/>
			</Content>
		</>
	);
}
