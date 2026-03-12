import PlannerForm from "./components/PlannerForm"
import { calculateLeaveAction, type PlannerResult } from "./actions"

interface PlannerPageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Planner({ searchParams }: PlannerPageProps) {
    let plannerResult: PlannerResult | null = null

    const params = await searchParams

    if (params.submitted === 'true') {
        try {
            plannerResult = null
        } catch (error) {
            console.error('Error processing results:', error)
        }
    }

    return (
        <main className="flex-1">
            <div className="max-w-4xl mx-auto px-6 py-16">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold lowercase italic mb-4 text-foreground transition-colors duration-[400ms]">
                        annual leave planner
                    </h1>
                    <p className="text-lg md:text-xl italic body-text text-muted-foreground transition-colors duration-[400ms] max-w-2xl mx-auto">
                        let's figure out how to maximize your time off
                    </p>
                </div>

                <PlannerForm calculateLeaveAction={calculateLeaveAction} initialResult={plannerResult} />
            </div>
        </main>
    )
}
