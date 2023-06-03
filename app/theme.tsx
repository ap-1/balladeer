"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useMemo, type PropsWithChildren } from "react";

interface ThemeProviderProps {
	fontVariables: Record<string, string>;
}

export const ThemeProvider = ({
	children,
	fontVariables,
}: PropsWithChildren<ThemeProviderProps>) => {
	const fontStyles = useMemo(
		() => `
			:root {
				${Object.entries(fontVariables)
					.map((key, value) => `${key}: ${value};`)
					.join("\n")}
			}
		`,
		[fontVariables]
	);

	return (
		<NextThemesProvider
			enableSystem
			attribute="class"
			defaultTheme="system"
			enableColorScheme={false}
		>
			<style jsx global>
				{fontStyles}
			</style>

			{children}
		</NextThemesProvider>
	);
};
