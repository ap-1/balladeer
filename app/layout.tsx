import localFont from "next/font/local";

import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/app/theme";
import { ClerkProvider } from "@clerk/nextjs";
import type { PropsWithChildren } from "react";

import "./globals.css";

const satoshi = localFont({
	src: "../fonts/Satoshi-Variable.woff2",
	variable: "--font-satoshi",
});

const stardom = localFont({
	src: "../fonts/Stardom-Regular.woff2",
	variable: "--font-stardom",
});

export const metadata = {
	title: "Balladeer",
	description: "balladeer",
};

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<ClerkProvider>
			<html lang="en" suppressHydrationWarning>
				<body
					className={cn(
						satoshi.variable,
						stardom.variable,
						"font-sans antialiased"
					)}
				>
					<ThemeProvider
						fontVariables={{
							"--font-satoshi": satoshi.variable,
							"--font-stardom": stardom.variable,
						}}
					>
						{children}
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
