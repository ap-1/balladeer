"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { observable } from "@legendapp/state";
import { useSelector } from "@legendapp/state/react";

import { Navbar } from "@/components/navbar";
import { Content } from "@/components/content";

import {
	Check,
	CheckCheck,
	Loader2,
	Library,
	Search as LucideSearchIcon,
} from "lucide-react";

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
	const searchParams = useSearchParams();

	const searchMessage = searchParams?.get("search");

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
				className="hover:bg-orange-500 hover:text-white dark:hover:bg-sky-500"
			>
				{title}
			</Button>
		);
	};

	//search for the book if the search query is in the url
	useEffect(() => {
		if (searchMessage) {
			setTimeout(() => form.setValue("search", searchMessage), 0);
			search(searchMessage);
		}
	}, [form, searchMessage]);

	const HandleSubmit = ({
		title,
		author,
		year,
		pages,
		subjects,
	}: {
		title: string;
		author: string;
		year: string;
		pages: string;
		subjects: string;
	}) => {};

	return (
		<>
			<Navbar currentTitle="Search" />
			<Content as="header" className="py-16">
				<h1 className="pb-4 text-4xl font-extrabold">
					Search for a book
				</h1>

				<div className="flex flex-col gap-8 sm:flex-row">
					<div>
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
												Make sure to search for the book
												name and not the author.
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
								<Sample title="The Crucible" />
							</div>
						</div>
					</div>

					<Image
						src="/images/searching-location-on-the-phone.svg"
						alt="searching-location-on-the-phone"
						className="mx-auto dark:invert"
						width={300}
						height={300}
					/>
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

				<ScrollArea className="w-full px-6 pt-6 border rounded-md h-80">
					{data.map((doc, j) => (
						<div key={j}>
							<div className="flex flex-row justify-between gap-6">
								<div className="flex-grow">
									<div className="flex flex-row justify-between">
										<p>
											{doc.title}, {doc.author_name[0]} (
											{doc.first_publish_year})
										</p>
										<p>
											{doc.number_of_pages_median ??
												"unknown"}{" "}
											pages
										</p>
									</div>

									<div className="text-muted-foreground">
										{doc.subject
											?.slice(0, 10)
											.map((subject, k, { length }) => (
												<span key={k}>
													{subject}{" "}
													{k + 1 < length && (
														<span>&middot; </span>
													)}
												</span>
											)) ?? (
											<span>unknown categories</span>
										)}
									</div>
								</div>

								<Button
									variant="outline"
									className="h-12 ml-1 my-auto hover:bg-orange-500 hover:text-white dark:hover:bg-sky-500"
								>
									{j === 0 ? (
										<CheckCheck className="w-4 h-4" />
									) : (
										<Check className="w-4 h-4" />
									)}
								</Button>
							</div>

							<Separator className="my-4" />
						</div>
					))}
				</ScrollArea>
			</Content>
		</>
	);
}
