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

export const themes = [
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

const state = observable({ mounted: false, open: false });

export const ThemeSwitcher = () => {
	const { resolvedTheme, setTheme } = useTheme();
	const currentTheme = themes.find(({ value }) => value === resolvedTheme)!;

	useEffect(() => {
		state.mounted.set(true);
	}, []);

	const isMounted = useSelector(() => state.mounted.get());
	const themeIcon = isMounted ? (
		<currentTheme.Icon className="w-5 h-5" />
	) : (
		<Loader2 className="w-5 h-5 animate-spin" />
	);

	const isOpen = useSelector(() => state.open.get());
	const onSelection = (theme: (typeof themes)[number]["value"]) => {
		return () => {
			setTheme(theme);
			state.open.set(false);
		};
	};

	return (
		<Popover open={isOpen} onOpenChange={state.open.set}>
			<PopoverTrigger>
				<Button variant="outline" className="px-2 mt-auto">
					{themeIcon}
				</Button>
			</PopoverTrigger>

			<PopoverContent
				align="end"
				className="flex flex-col p-1 gap-y-1 w-30"
			>
				{themes.map((theme) => (
					<Button
						variant="ghost"
						key={theme.value}
						className="flex flex-row justify-start gap-2"
						onClick={onSelection(theme.value)}
					>
						<theme.Icon className="w-4 h-4 my-auto" />
						{theme.name}
					</Button>
				))}
			</PopoverContent>
		</Popover>
	);
};
