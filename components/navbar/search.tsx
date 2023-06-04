"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { observable } from "@legendapp/state";
import { useSelector } from "@legendapp/state/react";
import { SignedIn, SignedOut, useClerk } from "@clerk/nextjs";

import { pages, links } from "@/lib/pages";
import { themes } from "@/components/navbar/theme";
import { UserPlus, UserMinus, Search as SearchIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";

const state = observable({ searchOpen: false });

export const Search = () => {
	const router = useRouter();
	const isOpen = useSelector(() => state.searchOpen.get());

	const { setTheme } = useTheme();
	const { signOut, openSignIn } = useClerk();

	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				state.searchOpen.set(true);
			} else if (e.key === "Escape") {
				state.searchOpen.set(false);
			}
		};

		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, []);

	const handler = (func: (arg0: string) => void) => {
		return (value: string) => {
			state.searchOpen.set(false);
			func(value);
		};
	};

	return (
		<>
			<Button
				asChild
				variant="outline"
				onClick={() => state.searchOpen.set(true)}
				className="w-full pl-4 pr-2 md:w-80"
			>
				<div className="flex flex-row justify-between h-10">
					<div className="flex flex-row gap-2">
						<SearchIcon className="w-4 h-4 my-auto" />
						Search Balladeer...
					</div>

					<kbd className="hidden sm:block rounded bg-muted px-[0.4rem] py-[0.2rem] font-mono text-sm font-semibold">
						⌘ K
					</kbd>
				</div>
			</Button>

			<CommandDialog open={isOpen} onOpenChange={state.searchOpen.set}>
				<CommandInput
					autoFocus
					placeholder="Type a command or search..."
				/>
				<CommandList className="pb-1">
					<CommandEmpty>No results found.</CommandEmpty>
					<CommandGroup heading="Pages">
						{pages.map((page) => (
							<CommandItem
								key={page.title}
								value={page.href}
								onSelect={handler(router.push)}
							>
								<page.Icon className="w-4 h-4 mr-2" />
								{page.title}
							</CommandItem>
						))}
					</CommandGroup>

					<CommandGroup heading="Theme">
						{themes.map((theme) => (
							<CommandItem
								key={theme.name}
								value={theme.value}
								onSelect={handler(setTheme)}
							>
								<theme.Icon className="w-4 h-4 mr-2" />
								{theme.name}
							</CommandItem>
						))}
					</CommandGroup>

					<CommandGroup heading="Utility">
						<SignedIn>
							<CommandItem
								value="signOut"
								onSelect={handler(() => signOut())}
							>
								<UserMinus className="w-4 h-4 mr-2" />
								Sign out
							</CommandItem>
						</SignedIn>

						<SignedOut>
							<CommandItem
								value="signIn"
								onSelect={handler(() => openSignIn())}
							>
								<UserPlus className="w-4 h-4 mr-2" />
								Sign in
							</CommandItem>
						</SignedOut>
					</CommandGroup>

					<CommandGroup heading="Links">
						{links.map((link) => (
							<CommandItem
								key={link.title}
								value={link.href}
								onSelect={handler((href) =>
									window.open(href, "_blank")
								)}
							>
								<link.Icon className="w-4 h-4 mr-2" />
								{link.title}
							</CommandItem>
						))}
					</CommandGroup>
				</CommandList>
			</CommandDialog>
		</>
	);
};
