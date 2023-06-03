"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";
import { observable } from "@legendapp/state";
import { useSelector } from "@legendapp/state/react";
import { Loader2, Laptop, MoonStar, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

const themes = [
	{
		name: "Light",
		value: "light",
		Icon: Sun,
	},
	{
		name: "Dark",
		value: "dark",
		Icon: MoonStar,
	},
	{
		name: "System",
		value: "system",
		Icon: Laptop,
	},
] as const;

const state = observable({ mounted: false });

export const ThemeSwitcher = () => {
	const { resolvedTheme, setTheme } = useTheme();
	const currentTheme = themes.find(({ value }) => value === resolvedTheme)!;

	useEffect(() => {
		state.mounted.set(true);
	}, []);

	const isMounted = useSelector(() => state.mounted.get());
	const themeIcon = isMounted ? (
		<currentTheme.Icon className="h-5 w-5" />
	) : (
		<Loader2 className="h-5 w-5 animate-spin" />
	);

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="outline" className="px-2">
					{themeIcon}
				</Button>
			</PopoverTrigger>

			<PopoverContent align="end" className="flex flex-col gap-y-1 p-1 w-30">
				{themes.map((theme) => (
					<Button
						variant="ghost"
						key={theme.value}
						className="flex flex-row justify-start gap-2"
						onClick={() => setTheme(theme.value)}
					>
						<theme.Icon className="h-4 w-4 my-auto" />
						{theme.name}
					</Button>
				))}
			</PopoverContent>
		</Popover>
	);
};
