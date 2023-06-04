import { useMemo } from "react";

import { links } from "@/lib/pages";
import { Link } from "@/components/link";
import { Content } from "@/components/content";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";

interface UserCardProps {
	name: string;
	username: string;
	description: string;
}

const UserCard = ({ name, username, description }: UserCardProps) => {
	const { url, avatarUrl } = useMemo(() => {
		const url = `https://github.com/${username}`;

		return {
			url,
			avatarUrl: `${url}.png`,
		};
	}, [username]);

	const initials = useMemo(
		() =>
			name
				.split(" ")
				.map((n) => n[0].toUpperCase())
				.join(""),
		[name]
	);

	return (
		<HoverCard>
			<HoverCardTrigger asChild>
				<Link href={url} external>
					{name}
				</Link>
			</HoverCardTrigger>

			<HoverCardContent className="w-50">
				<div className="flex flex-row gap-x-4">
					<Avatar>
						<AvatarImage src={avatarUrl} />
						<AvatarFallback>{initials}</AvatarFallback>
					</Avatar>

					<div className="space-y-1">
						<h4 className="text-sm font-semibold">@{username}</h4>
						<p className="text-sm">{description}</p>
					</div>
				</div>
			</HoverCardContent>
		</HoverCard>
	);
};

export const Footer = () => {
	return (
		<Content
			as="footer"
			className="flex flex-row justify-between py-8 text-muted-foreground"
			outerClassName="bg-secondary mt-8"
		>
			<div className="my-auto">
				Developed by{" "}
				<UserCard
					name="Anish Pallati"
					username="ap-1"
					description="hi"
				/>{" "}
				and{" "}
				<UserCard
					name="Kevin Liu"
					username="Kevin-Liu-01"
					description="🗿 what"
				/>{" "}
				for{" "}
				<Link href="https://hackjps-2023.devpost.com/" external>
					HackJPS 2023
				</Link>
				. Images from{" "}
				<Link href="https://popsy.co/illustrations" external>
					popsy.co
				</Link>
				.
			</div>

			<div className="flex flex-row my-auto gap-x-3">
				{links.map((link) => (
					<Link
						key={link.title}
						href={link.href}
						external
						className="transition-colors hover:text-orange-500 dark:hover:text-sky-500"
					>
						<link.Icon className="w-6 h-6" />
					</Link>
				))}
			</div>
		</Content>
	);
};
