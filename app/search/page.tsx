"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { observable } from "@legendapp/state";
import { useSelector } from "@legendapp/state/react";

import { Navbar } from "@/components/navbar";
import { Content } from "@/components/content";
import { Loader2, Library, Search as LucideSearchIcon } from "lucide-react";

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
	number_of_pages_median?: number;
	first_sentence: string[];
	author_name: string[];
	subject?: string[];
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
		const end = Math.min(page * 5, numFound - 1);

		return data.docs.slice((page - 1) * 5, end);
	}
};

const FormSchema = z.object({
	search: z.string().nonempty("Please enter the name of a book"),
});

type Schema = z.infer<typeof FormSchema>;

const state = observable({ data: [] as Doc[], searching: false });

export default function Search() {
	const data = useSelector(() => state.data.get());
	const searching = useSelector(() => state.searching.get());

	const form = useForm<Schema>({
		resolver: zodResolver(FormSchema),
		defaultValues: { search: "" },
	});

	const search = (query: string) => {
		state.searching.set(true);
		fetchResults(query, 1)
			.then((data) => state.data.set(data))
			.catch(console.error)
			.finally(() => state.searching.set(false));
	};

	const searchIcon = searching ? (
		<Loader2 className="w-7 h-7 animate-spin" />
	) : (
		<LucideSearchIcon className="w-7 h-7" />
	);

	const resultsIcon = searching ? (
		<Loader2 className="w-6 h-6 my-auto animate-spin" />
	) : (
		<Library className="w-6 h-6 my-auto" />
	);

	const Sample = ({ title }: { title: string }) => {
		return (
			<Button
				variant="outline"
				disabled={searching}
				onClick={() => search(title)}
			>
				{title}
			</Button>
		);
	};

	return (
		<>
			<Navbar currentTitle="Search" />
			<Content
				as="header"
				className="py-16"
			>
				<h1 className="pb-4 text-4xl font-extrabold">
					Search for a book
				</h1>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit((data: Schema) =>
							search(data.search)
						)}
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

						<Button
							type="submit"
							disabled={searching}
							className="mb-auto h-14"
						>
							{searchIcon}
						</Button>
					</form>
				</Form>

				<div className="mt-8">
					<h2 className="mb-4 text-2xl font-bold">Samples</h2>

					<div className="flex flex-wrap gap-2">
						<Sample title="The Great Gatsby" />
						<Sample title="Animal Farm" />
						<Sample title="The Catcher in the Rye" />
						<Sample title="Hamlet" />
						<Sample title="To Kill a Mockingbird" />
						<Sample title="1984" />
					</div>
				</div>
			</Content>

			<Content
				as="main"
				className="pt-8"
				outerClassName="border-t border-border"
			>
				<h2 className="flex flex-row gap-2 mb-4 text-2xl font-bold">
					Search results
					{resultsIcon}
				</h2>

				<ScrollArea className="w-full px-6 pt-6 border rounded-md h-72">
					{data.map((doc, j) => (
						<div key={j}>
							<div className="flex flex-row justify-between">
								<p>
									{doc.title}, {doc.author_name[0]} (
									{doc.first_publish_year})
								</p>
								<p>
									{doc.number_of_pages_median ?? "unknown"}{" "}
									pages
								</p>
							</div>

							<div>
								{doc.subject
									?.slice(0, 10)
									.map((subject, k, { length }) => (
										<span
											key={k}
											className="text-muted-foreground"
										>
											{subject}{" "}
											{k + 1 < length && (
												<span>&middot; </span>
											)}
										</span>
									))}
							</div>

							<Separator className="my-4" />
						</div>
					))}
				</ScrollArea>
			</Content>
		</>
	);
}
