'use client'

import LeaveOptionsDisplay from "@/components/leave-options-display"
import type { LeaveResult, PlannerSummary } from "../types"

interface PlannerResultsProps {
    loading: boolean
    error: string | null
    results: LeaveResult[] | null
    annualLeaveDays: number
    planningYear: number
    summary: PlannerSummary | null
}

export default function PlannerResults({ loading, error, results, annualLeaveDays, planningYear, summary }: PlannerResultsProps) {
    if (error) {
        return (
            <div
                className="border p-6 mb-6 text-center transition-all duration-[400ms]"
                style={{
                    borderColor: 'rgb(var(--destructive))',
                    backgroundColor: 'rgb(var(--destructive) / 0.15)'
                }}
            >
                <div className="text-2xl mb-2">⚠️</div>
                <p className="italic" style={{ color: 'rgb(var(--destructive))' }}>{error}</p>
            </div>
        )
    }

    if (results === null) {
        if (loading) {
            return null
        }

        return (
            <div
                className="border-2 border-dashed p-12 text-center transition-all duration-[400ms]"
                style={{ borderColor: 'rgb(var(--border))' }}
            >
                <div className="text-4xl mb-4">📅</div>
                <h3 className="text-xl font-medium italic lowercase mb-3 text-foreground transition-colors duration-[400ms]">
                    your optimised leave picks will appear here
                </h3>
                <p className="body-text italic text-muted-foreground transition-colors duration-[400ms]">
                    fill out the form above to get started
                </p>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <h3 className="text-2xl font-medium italic lowercase mb-4 text-foreground transition-colors duration-[400ms]">
                your personalised leave picks
            </h3>
            <LeaveOptionsDisplay
                results={results}
                year={planningYear}
                region="england-and-wales"
                annualLeaveDays={annualLeaveDays}
                mandatoryLeaveDates={summary?.mandatory ?? []}
                nonWorkingMandatoryDates={summary?.nonWorking ?? []}
                ignoredMandatoryDates={summary?.ignored ?? []}
                remainingAllowance={summary?.remainingAllowance}
                overbooked={summary?.overbooked ?? false}
            />
        </div>
    )
}
