"use client";

import { Content } from "@/components/content";

function Character(props: any) {
	return (
		<>
			<Content
				as="section"
				className="relative p-4 overflow-hidden max-w-7xl bg-orange-500 dark:bg-sky-500 rounded-md grid grid-cols-4 gap-4"
			>
				{props.characters.map((character: any) => (
					<div
						key={character.name}
						className="relative z-10 bg-secondary rounded-md p-4 shadow-lg"
					>
						<p className="mt-1 text-xl font-extrabold sm:text-2xl sm:tracking-tight  ">
							{character.name}
						</p>
						<p className=" mt-2 text-base  ">
							{character.description}
						</p>
					</div>
				))}
			</Content>
		</>
	);
}

export { Character };
