"use client";

import Image from "next/image";
import { observable } from "@legendapp/state";
import { useSelector } from "@legendapp/state/react";

import { Navbar } from "@/components/navbar";
import { Content } from "@/components/content";
import { Input } from "@/components/ui/input";

import { Send, BookMarked } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
	return (
		<>
			<Navbar currentTitle="Home" />
			<Content
				as="heading"
				className="flex flex-col gap-3 my-16 sm:gap-0 sm:flex-row"
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
							/>
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
		</>
	);
}
