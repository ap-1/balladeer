"use client";

import { Content } from "@/components/content";
import { ScrollText } from "lucide-react";

function Devices(props: any) {
	return (
		<>
			<Content
				as="section"
				className="relative grid grid-cols-4 gap-4 p-4 overflow-hidden bg-orange-500 rounded-md max-w-7xl dark:bg-sky-500"
			>
				{props.devices.map((device: any) => (
					<div
						key={device.reference}
						className="relative z-10 p-4 rounded-md shadow-lg bg-secondary"
					>
						<p className="flex flex-row items-center gap-2 mt-1 text-xl font-extrabold sm:text-2xl sm:tracking-tight ">
							<ScrollText /> {device.type}
						</p>
						<p className="mt-2 text-base font-semibold">
							{'"' + device.reference + '"'}
						</p>
						<p className="mt-2 text-base ">{device.description}</p>
					</div>
				))}
			</Content>
		</>
	);
}

export { Devices };
