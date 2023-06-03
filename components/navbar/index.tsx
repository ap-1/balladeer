import Link from "next/link";

import { pages } from "@/lib/pages";
import { Content } from "@/components/content";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/navbar/theme";

interface NavbarProps {
	currentTitle: (typeof pages)[number]["title"];
}

export const Navbar = ({ currentTitle }: NavbarProps) => {
	return (
		<Content
			as="nav"
			border="bottom"
			className="py-4 flex flex-row justify-between"
		>
			<section>
				{pages.map((page) => (
					<Link
						key={page.href}
						href={page.href}
						legacyBehavior
						passHref
					>
						<Button variant="outline">
							<page.Icon className="mr-2 h-4 w-4 my-auto" />
							{page.title}
						</Button>
					</Link>
				))}
			</section>

			<section>
				<ThemeSwitcher />
			</section>
		</Content>
	);
};
