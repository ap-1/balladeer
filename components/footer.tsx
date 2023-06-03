import { Link } from "@/components/link";
import { Content } from "@/components/content";

export const Footer = () => {
	return (
		<Content
			as="footer"
			className="py-8 text-muted-foreground"
			outerClassName="bg-secondary mt-16"
		>
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
			.
		</Content>
	);
};
