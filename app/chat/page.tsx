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
				className="px-4 py-16 mx-auto text-center flex justify-center max-w-7xl sm:px-0 relative overflow-hidden"
				outerClassName="bg-orange-500"
			>
				<div className="relative z-10 dark:text-white text-primary">
					<p className="mt-1 text-4xl font-extrabold sm:text-5xl sm:tracking-tight lg:text-6xl">
						Hamlet
					</p>
					<p className="text-base font-semibold tracking-wide border-2 p-2 mt-4 border-orange-900 dark:border-orange-100 uppercase rounded-md">
						William Shakespeare
					</p>
				</div>
			</Content>
			<Content
				as="section"
				className="px-4 flex flex-row items-center max-w-7xl text-lg relative "
				outerClassName="border-b border-border"
			>
				<div className="py-4 mr-4">Jump to:</div>
				<button className="hover:bg-secondary duration-150 h-full px-5 py-4">
					Summary
				</button>
				<button className="hover:bg-secondary duration-150 h-full px-5 py-4">
					Characters
				</button>
				<button className="hover:bg-secondary duration-150 h-full px-5 py-4">
					Literary Devices
				</button>
				<button className="hover:bg-secondary duration-150 h-full px-5 py-4">
					Q&A
				</button>
			</Content>
			<Content
				as="section"
				className="px-4 py-8 flex flex-row items-center max-w-7xl text-lg relative "
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
