import { TransitionLink } from "@/utils/TransitionLink"
import Link from "next/link"

export function Header() {
    return (
        <header className="border-b transition-all duration-[400ms]">
            <div className="container mx-auto px-4 py-6">
                <div className="flex items-center justify-center md:justify-start">
                    <TransitionLink href="/" className="flex items-center gap-3 group">
                        <span className="hover:underline text-2xl font-medium text-foreground transition-colors duration-[400ms] lowercase italic">maxmyleave</span>
                    </TransitionLink>
                </div>
            </div>
        </header>
    )
}
