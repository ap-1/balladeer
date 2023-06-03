import { cn } from "@/lib/utils";
import { createElement } from "react";
import { cva, type VariantProps } from "class-variance-authority";

export const content = cva("", {
	variants: {
		border: {
			top: "border-t",
			bottom: "border-b",
		},
	},
});

export interface ContentProps<T extends keyof JSX.IntrinsicElements>
	extends VariantProps<typeof content>,
		Omit<React.HTMLProps<T>, keyof VariantProps<typeof content>> {
	outerClassName?: string;
}

export const Content = <T extends keyof JSX.IntrinsicElements = "div">({
	as,
	outerClassName,
	className,
	children,
	border,
	...rest
}: ContentProps<T>) => {
	{
		/* const Component = as ?? "div" as T as React.ElementType;

		<Component className={cn(content({ border }), outerClassName)} {...rest}>
			<div className={cn("mx-auto max-w-7xl px-8", className)}>
				{children}
			</div>
		</Component>; */
	}

	return createElement(
		as ?? "div",
		{
			className: cn(content({ border }), outerClassName),
			...rest,
		},
		<div className={cn("mx-auto max-w-7xl px-8", className)}>
			{children}
		</div>
	);
};
