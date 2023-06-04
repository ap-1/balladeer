import { Home, BookMarked, Github, Package } from "lucide-react";

export const pages = [
	{
		title: "Home",
		href: "/",
		protected: false,
		Icon: Home,
	},
	{
		title: "Search",
		href: "/search",
		protected: false,
		Icon: BookMarked,
	},
] as const;

export const links = [
	{
		title: "GitHub",
		href: "https://github.com/ap-1/balladeer",
		Icon: Github,
	},
	{
		title: "Devpost",
		href: "https://devpost.com/software/balladeer",
		Icon: Package,
	},
] as const;
