import { links } from "@/lib/pages";
import { Link } from "@/components/link";
import { Content } from "@/components/content";

export const Footer = () => {
	return (
		<Content
			as="footer"
			className="flex flex-row justify-between py-8 text-muted-foreground"
			outerClassName="bg-secondary mt-8"
		>
			<div className="my-auto">
				Developed by{" "}
				<Link href="https://github.com/ap-1" external>
					Anish Pallati
				</Link>{" "}
				and{" "}
				<Link href="https://github.com/Kevin-Liu-01" external>
					Kevin Liu
				</Link>{" "}
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
						className="transition-colors hover:text-primary"
					>
						<link.Icon className="w-6 h-6" />
					</Link>
				))}
			</div>
		</Content>
	);
};
