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

export const metadata = {
	title: "Balladeer",
	description: "balladeer",
};

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<ClerkProvider>
			<html lang="en" suppressHydrationWarning>
				<body className={cn(satoshi.variable, "font-sans antialiased")}>
					<ThemeProvider fontVariable={satoshi.variable}>
						{children}
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
