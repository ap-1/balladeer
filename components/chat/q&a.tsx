"use client";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

function Questions(props: any) {
	return (
		<>
			<Accordion
				type="single"
				collapsible
				className="overflow-hidden border-2 border-orange-500 rounded-md dark:border-sky-500"
			>
				{props.questions.map((question: any) => (
					<AccordionItem
						value={question.question}
						key={question.question}
						className="relative z-10 p-4 "
					>
						<AccordionTrigger className="mt-1 text-lg font-semibold sm:text-xl sm:tracking-tight">
							<div className="flex flex-row items-center gap-2 ">
								<HelpCircle /> {question.question}
							</div>
						</AccordionTrigger>
						<AccordionContent className="mt-2 text-base tracking-wide ">
							{question.answer}
						</AccordionContent>
					</AccordionItem>
				))}{" "}
			</Accordion>
		</>
	);
}

export { Questions };
