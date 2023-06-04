"use client";

import { Content } from "@/components/content";

function Questions(props: any) {
	return (
		<>
			<Content
				as="section"
				className="relative p-4 overflow-hidden max-w-7xl bg-orange-500 dark:bg-sky-500 rounded-md grid grid-cols-4 gap-4"
			>
				{props.questions.map((question: any) => (
					<div
						key={question.question}
						className="relative z-10 bg-secondary rounded-md p-4 shadow-lg"
					>
						<p className="mt-1 text-xl font-extrabold sm:text-2xl sm:tracking-tight  ">
							{question.question}
						</p>
						<p className=" mt-2 text-base font-semibold tracking-wide ">
							{question.answer}
						</p>
					</div>
				))}
			</Content>
		</>
	);
}

export { Questions };
