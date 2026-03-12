"use client"

import { TransitionLink } from "@/utils/TransitionLink";

export default function Home() {
	return (
		<main className="flex-1">
			<section className="px-6 py-20 max-w-2xl mx-auto">
				<h1 className="italic lowercase text-4xl md:text-6xl font-bold mb-6 text-foreground transition-colors duration-[400ms]">
					max my leave
				</h1>
				<div className="space-y-4 text-lg body-text text-muted-foreground transition-colors duration-[400ms] mb-8">
					<p>
						my colleague told me there was a better way to plan annual leave.
					</p>
					<p>
						i made this because i didn't want to waste my time waiting for those 'work-tubers' to make a video on maximising their annual leave for [year]
					</p>
				</div>
				<div className="flex flex-wrap gap-3">
					<TransitionLink
						href="/planner"
						className="inline-block px-6 py-2.5 italic lowercase font-medium transition-all duration-[400ms] border cursor-pointer"
						style={{
							backgroundColor: "rgb(var(--foreground))",
							color: "rgb(var(--background))",
							borderColor: "transparent",
							textDecoration: "none"
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.backgroundColor = "rgb(var(--muted-foreground))";
							e.currentTarget.style.borderColor = "rgb(var(--muted-foreground))";
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.backgroundColor = "rgb(var(--foreground))";
							e.currentTarget.style.borderColor = "transparent";
						}}
					>
						use the planner
					</TransitionLink>
					<TransitionLink
						href="/faq"
						className="inline-block px-6 py-2.5 italic lowercase font-medium transition-all duration-[400ms] border cursor-pointer"
						style={{
							backgroundColor: "transparent",
							color: "rgb(var(--foreground))",
							borderColor: "rgb(var(--border))",
							textDecoration: "none"
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.backgroundColor = "rgb(var(--muted))";
							e.currentTarget.style.borderColor = "rgb(var(--foreground))";
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.backgroundColor = "transparent";
							e.currentTarget.style.borderColor = "rgb(var(--border))";
						}}
					>
						frequently asked questions
					</TransitionLink>
				</div>
			</section>
		</main>
	);
}
