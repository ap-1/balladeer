"use client";

import { useEffect, useCallback } from "react";
import { Content } from "@/components/content";
import { User, ArrowLeft, ArrowRight } from "lucide-react";

import useEmblaCarousel from "embla-carousel-react";

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
				className="relative px-0 py-4 overflow-hidden bg-orange-500 rounded-md max-w-7xl dark:bg-sky-500 "
			>
				<div className="w-full overflow-hidden embla " ref={emblaRef}>
					<div className="flex flex-row items-start gap-4 px-4 embla__container">
						{props.characters.map((character: any) => (
							<div
								key={character.name}
								className=" embla__slide min-w-0 relative flex-[0_0_100%] sm:flex-[0_0_50%] justify-center bg-secondary rounded-md p-8 shadow-lg"
							>
								<p className="flex flex-row items-center gap-2 mt-1 text-xl font-extrabold sm:text-2xl sm:tracking-tight ">
									<User /> {character.name}
								</p>
								<p className="mt-2 text-base ">
									{character.description}
								</p>
							</div>
						))}{" "}
					</div>
					<button
						className="absolute z-10 p-2 duration-150 transform -translate-y-1/2 rounded-full embla__prev bg-background hover:bg-orange-500 hover:dark:bg-sky-500 top-1/2 left-2 "
						onClick={scrollPrev}
					>
						<ArrowLeft />
					</button>
					<button
						className="absolute z-10 p-2 duration-150 transform -translate-y-1/2 rounded-full embla__next bg-background hover:bg-orange-500 hover:dark:bg-sky-500 top-1/2 right-2 "
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
