"use client";

import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Navbar } from "@/components/navbar";
import { Content } from "@/components/content";
import { Search as SearchIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";

interface Doc {
	title: string;
	first_publish_year: number;
	number_of_pages_median: number;
	first_sentence: string[];
	author_name: string[];
	subject: string[];
}

const fetchResults = async (search: string, page: number): Promise<Doc[]> => {
	const url = new URL("https://openlibrary.org/search.json");
	url.searchParams.set("title", search);

	const response = await fetch(url);
	const data = await response.json();

	const { numFound } = data;

	if (numFound === 0) {
		return [];
	} else {
		const end = Math.min(page * 10, numFound - 1);

		return data.docs.slice((page - 1) * 10, end);
	}
};

const FormSchema = z.object({
	search: z.string().min(1),
});

type Schema = z.infer<typeof FormSchema>;

export default async function Search() {
	const [data, setData] = useState<Doc[]>([]);

	const form = useForm<Schema>({
		resolver: zodResolver(FormSchema),
		defaultValues: { search: "The Great Gatsby" },
	});

	const onSubmit = (data: Schema) => (
		fetchResults(data.search, 1).then(setData).catch(console.error)
	);

	return (
		<>
			<Navbar currentTitle="Search" />
			<Content as="header" className="py-16">
				<h1 className="pb-4 text-4xl font-extrabold">
					Search for a book
				</h1>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex items-center w-full space-x-2"
					>
						<FormField
							control={form.control}
							name="search"
							render={({ field }) => (
								<FormItem className="flex-grow">
									<FormControl>
										<Input
											className="h-14"
											placeholder="What book are you searching for?"
											{...field}
										/>
									</FormControl>

									<FormDescription>
										Make sure to search for the book name
										and not the author.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button type="submit" className="mb-auto h-14">
							<SearchIcon className="w-7 h-7" />
						</Button>
					</form>
				</Form>
			</Content>

			<Content
				as="main"
				className="pt-16"
				outerClassName="border-t border-border"
			>
				<h2 className="mb-4 text-2xl font-bold">Search results</h2>

				<ScrollArea className="w-full p-4 border rounded-md h-72">
					{data.map((doc, j) => (
						<div key={j}>
							{doc.title}
							<Separator className="my-2" />
						</div>
					))}
				</ScrollArea>
			</Content>
		</>
	);
}
