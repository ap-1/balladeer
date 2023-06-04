"use client";

import { Content } from "@/components/content";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useCallback } from "react";
import { User, ArrowLeft, ArrowRight } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import AutoHeight from "embla-carousel-auto-height";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";

function Character(props: any) {
	const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
		Autoplay(),
		AutoHeight(),
		WheelGesturesPlugin(),
	]);

	useEffect(() => {
		if (emblaApi) {
			console.log(emblaApi.slideNodes()); // Access API
		}
	}, [emblaApi]);

	const scrollPrev = useCallback(() => {
		if (emblaApi) emblaApi.scrollPrev();
	}, [emblaApi]);

	const scrollNext = useCallback(() => {
		if (emblaApi) emblaApi.scrollNext();
	}, [emblaApi]);

	return (
		<>
			<Content
				as="section"
				className="relative py-4 px-0 overflow-hidden max-w-7xl bg-orange-500 dark:bg-sky-500 rounded-md  "
			>
				<div className="embla overflow-hidden w-full " ref={emblaRef}>
					<div className="embla__container items-start px-4 flex flex-row gap-4">
						{props.characters.map((character: any) => (
							<div
								key={character.name}
								className=" embla__slide min-w-0 relative flex-[0_0_100%] sm:flex-[0_0_50%] justify-center bg-secondary rounded-md p-8 shadow-lg"
							>
								<p className="mt-1 text-xl font-extrabold sm:text-2xl sm:tracking-tight flex flex-row items-center gap-2 ">
									<User /> {character.name}
								</p>
								<p className=" mt-2 text-base  ">
									{character.description}
								</p>
							</div>
						))}{" "}
					</div>
					<button
						className="embla__prev bg-background hover:bg-orange-500 hover:dark:bg-sky-500 duration-150 rounded-full p-2 absolute top-1/2 left-2 transform -translate-y-1/2 z-10 "
						onClick={scrollPrev}
					>
						<ArrowLeft />
					</button>
					<button
						className="embla__next bg-background hover:bg-orange-500 hover:dark:bg-sky-500 duration-150 rounded-full p-2 absolute top-1/2 right-2 transform -translate-y-1/2 z-10 "
						onClick={scrollNext}
					>
						<ArrowRight className="text-primary" />
					</button>
				</div>
			</Content>
		</>
	);
}

export { Character };
