import type { Metadata } from "next";
import { TransitionLink } from "@/utils/TransitionLink";

export const metadata: Metadata = {
    title: "404 | maxmyleave",
    description: "page not found",
}

export default function NotFound() {
    return (
        <main className="flex-1 flex items-center justify-center px-6 py-20">
            <div className="text-center max-w-2xl">
                <h1 className="italic lowercase text-6xl md:text-8xl font-bold mb-6 text-foreground transition-colors duration-[400ms]">
                    404
                </h1>
                <h2 className="italic lowercase text-3xl md:text-4xl font-medium mb-4 text-foreground transition-colors duration-[400ms]">
                    page not found
                </h2>
                <p className="text-xl md:text-2xl italic body-text text-muted-foreground transition-colors duration-[400ms] mb-8">
                    whatever you're looking for isn't here
                </p>
                <div className="space-y-4 md:space-y-0 md:space-x-4 md:flex md:justify-center">
                    <TransitionLink
                        href="/"
                        className="inline-block px-8 py-3 italic lowercase font-medium transition-all duration-[400ms] border cursor-pointer"
                        style={{
                            backgroundColor: 'rgb(var(--foreground))',
                            color: 'rgb(var(--background))',
                            borderColor: 'transparent',
                            textDecoration: 'none'
                        }}
                    >
                        go home
                    </TransitionLink>
                    <TransitionLink
                        href="/faq"
                        className="inline-block px-8 py-3 italic lowercase font-medium border transition-all duration-[400ms] cursor-pointer"
                        style={{
                            borderColor: 'rgb(var(--border))',
                            color: 'rgb(var(--foreground))',
                            backgroundColor: 'transparent',
                            textDecoration: 'none'
                        }}
                    >
                        frequently asked questions
                    </TransitionLink>
                </div>
            </div>
        </main>
    )
}