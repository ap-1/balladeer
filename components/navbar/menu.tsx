import { Link } from "@/components/link";

import { cn } from "@/lib/utils";
import { pages } from "@/lib/pages";

import {
	NavigationMenu,
	NavigationMenuList,
	NavigationMenuItem,
	NavigationMenuLink,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Auth, type AdditionalProps } from "@/components/navbar";

export const NavMenu = ({ className, currentTitle }: AdditionalProps) => (
	<NavigationMenu className={className}>
		<NavigationMenuList className="flex justify-between px-2 lg:px-0">
			<NavigationMenuItem className="flex flex-row gap-2">
				{pages.map((page) => (
					<Link
						key={page.title}
						href={page.href}
						legacyBehavior
						noUnderline
						passHref
					>
						<NavigationMenuLink
							className={cn(
								navigationMenuTriggerStyle(),
								"flex flex-row gap-2"
							)}
						>
							<page.Icon className="w-4 h-4" />
							{page.title}
						</NavigationMenuLink>
					</Link>
				))}
			</NavigationMenuItem>

			<NavigationMenuItem>
				<Auth className="block lg:hidden" currentTitle={currentTitle} />
			</NavigationMenuItem>
		</NavigationMenuList>
	</NavigationMenu>
);
