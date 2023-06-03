"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type PropsWithChildren } from "react";

interface ThemeProviderProps {
	fontVariable: string;
}

export const ThemeProvider = ({
	children,
	fontVariable,
}: PropsWithChildren<ThemeProviderProps>) => {
	return (
		<NextThemesProvider
			enableSystem
			attribute="class"
			defaultTheme="system"
			enableColorScheme={false}
		>
			<style jsx global>
				{`
					:root {
						--font-satoshi: ${fontVariable};
					}
				`}
			</style>

			{children}
		</NextThemesProvider>
	);
};
