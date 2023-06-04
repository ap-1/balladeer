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
				as="section"
				className="relative flex justify-center px-4 py-16 mx-auto overflow-hidden text-center max-w-7xl sm:px-0"
				outerClassName="bg-orange-500"
			>
				<div className="relative z-10 dark:text-white text-primary">
					<p className="mt-1 text-4xl font-extrabold sm:text-5xl sm:tracking-tight lg:text-6xl">
						Hamlet
					</p>
					<p className="p-2 mt-4 text-base font-semibold tracking-wide uppercase border-2 border-orange-900 rounded-md dark:border-orange-100">
						William Shakespeare
					</p>
				</div>
			</Content>
			<Content
				as="section"
				className="relative flex flex-row items-center px-4 text-lg max-w-7xl "
				outerClassName="border-b border-border"
			>
				<div className="py-4 mr-4">Jump to:</div>
				<button className="h-full px-5 py-4 duration-150 hover:bg-secondary">
					Summary
				</button>
				<button className="h-full px-5 py-4 duration-150 hover:bg-secondary">
					Characters
				</button>
				<button className="h-full px-5 py-4 duration-150 hover:bg-secondary">
					Literary Devices
				</button>
				<button className="h-full px-5 py-4 duration-150 hover:bg-secondary">
					Q&A
				</button>
			</Content>
			<Content
				as="section"
				className="relative flex flex-row items-center px-4 py-8 text-lg max-w-7xl "
				outerClassName="border-b border-border"
			>
				First performed around 1600, Hamlet tells the story of a prince
				whose duty to revenge his father’s death entangles him in
				philosophical problems he can’t solve. Shakespeare’s best-known
				play is widely regarded as the most influential literary work
				ever written. Read a character analysis of Hamlet, plot summary,
				and important quotes.
			</Content>
		</>
	);
}
