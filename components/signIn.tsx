"use client";

import { UserPlus } from "lucide-react";
import { SignInButton as ClerkSignInButton } from "@clerk/nextjs";

import { pages } from "@/lib/pages";
import { Button } from "@/components/ui/button";
import { type NavbarProps } from "@/components/navbar";

export const SignInButton = ({ currentTitle }: NavbarProps) => {
	const redirectUrl = pages.find((page) => page.title === currentTitle)?.href;

	return (
		<ClerkSignInButton mode="modal" redirectUrl={redirectUrl}>
			<Button className="flex flex-row gap-2">
				Sign in
				<UserPlus className="w-4 h-4" />
			</Button>
		</ClerkSignInButton>
	);
};
