"use client";

import { X, Menu } from "lucide-react";
import { observable } from "@legendapp/state";
import { useSelector } from "@legendapp/state/react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

import { Link } from "@/components/link";
import { Content } from "@/components/content";
import { SignInButton } from "@/components/signIn";
import { Button } from "@/components/ui/button";

import { pages } from "@/lib/pages";
import { NavMenu } from "@/components/navbar/menu";
import { Search } from "@/components/navbar/search";
import { ThemeSwitcher } from "@/components/navbar/theme";

export interface NavbarProps {
	currentTitle: (typeof pages)[number]["title"];
}

export type AdditionalProps = React.HTMLProps<HTMLDivElement> & NavbarProps;

export const Auth = ({ className, currentTitle }: AdditionalProps) => (
	<div className={className}>
		<SignedIn>
			<div className="pt-0 pr-1 lg:pt-1 lg:pr-0">
				<UserButton
					appearance={{
						elements: {
							userButtonPopoverFooter: "hidden",
						},
					}}
				/>
			</div>
		</SignedIn>

		<SignedOut>
			<SignInButton currentTitle={currentTitle} />
		</SignedOut>
	</div>
);

const state = observable({ menuOpen: false });

export const Navbar = ({ currentTitle }: NavbarProps) => {
	const menuOpen = useSelector(() => state.menuOpen.get());
	const MenuIcon = menuOpen ? X : Menu;

	return (
		<Content as="nav" border="bottom" className="flex flex-col ">
			<div className="flex justify-between">
				<div className="flex flex-row gap-x-8">
					<Link
						className="py-4 text-2xl font-bold"
						noUnderline
						href="/"
					>
						Balladeer
					</Link>

					<NavMenu
						className="hidden my-auto lg:block"
						currentTitle={currentTitle}
					/>
				</div>

				<div className="my-auto md:flex md:flex-row md:gap-x-2">
					<div className="hidden md:block">
						<Search />
					</div>

					<ThemeSwitcher />

					<Auth
						className="hidden lg:block"
						currentTitle={currentTitle}
					/>

					<Button
						variant="outline"
						className="px-2 ml-2 md:ml-0 lg:hidden"
						asChild
					>
						<MenuIcon
							className="w-10 h-10"
							onClick={() => state.menuOpen.set((open) => !open)}
						/>
					</Button>
				</div>
			</div>

			<div className="block mb-4 -mt-1 md:hidden">
				<Search />
			</div>

			{menuOpen && (
				<NavMenu
					className="block w-full py-2 mb-4 -mt-2 border rounded-md lg:hidden md:-mt-1"
					currentTitle={currentTitle}
				/>
			)}
		</Content>
	);
};
