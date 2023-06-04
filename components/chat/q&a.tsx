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
				className="overflow-hidden text-orange-500 rounded-md dark:text-sky-500"
			>
				{props.questions.map((question: any) => (
					<AccordionItem
						value={question.question}
						key={question.question}
						className="relative z-10 p-4 text-primary"
					>
						<AccordionTrigger className="mt-1 text-lg font-semibold sm:text-xl sm:tracking-tight">
							<div className="flex flex-row items-center gap-2">
								<HelpCircle className="text-orange-500 dark:text-sky-500" /> {question.question}
							</div>
						</AccordionTrigger>

						<AccordionContent className="mt-2 text-base tracking-wide">
							{question.answer}
						</AccordionContent>
					</AccordionItem>
				))}{" "}
			</Accordion>
		</>
	);
}

export { Questions };
