'use client'

import { useState } from "react"

type AddRangeHandler = (start: string, end?: string) => void

type RemoveHandler = (date: string) => void

interface MustHaveDatesCardProps {
    planningYear: string
    dates: string[]
    disabled: boolean
    onAddRange: AddRangeHandler
    onRemoveDate: RemoveHandler
}

const dayOptions: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'short'
}

export default function MustHaveDatesCard({ planningYear, dates, disabled, onAddRange, onRemoveDate }: MustHaveDatesCardProps) {
    const [startInput, setStartInput] = useState('')
    const [endInput, setEndInput] = useState('')

    const handleAdd = () => {
        if (!startInput) {
            return
        }

        onAddRange(startInput, endInput || undefined)
        setStartInput('')
        setEndInput('')
    }

    return (
        <div
            className="border p-4 sm:p-6 transition-all duration-[400ms]"
            style={{
                borderColor: 'rgb(var(--border))',
                backgroundColor: 'rgb(var(--muted))',
                opacity: disabled ? 0.5 : 1
            }}
        >
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                    <h3 className="text-sm font-medium lowercase italic text-foreground transition-colors duration-[400ms]">
                        must-have dates
                    </h3>
                    <p className="mt-1 text-sm italic text-muted-foreground transition-colors duration-[400ms]">
                        ring-fence the days you already need off. we will prioritise these when building your plan.
                    </p>
                </div>
                {dates.length > 0 && (
                    <span
                        className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium italic transition-all duration-[400ms]"
                        style={{
                            borderColor: 'rgb(var(--border))',
                            color: 'rgb(var(--foreground))',
                            backgroundColor: 'rgb(var(--background))'
                        }}
                    >
                        {dates.length} pinned day{dates.length === 1 ? '' : 's'}
                    </span>
                )}
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3">
                <div className="flex min-w-0 flex-col gap-1.5">
                    <span className="text-xs uppercase tracking-wide text-muted-foreground transition-colors duration-[400ms]">start date</span>
                    <input
                        type="date"
                        value={startInput}
                        onChange={(e) => setStartInput(e.target.value)}
                        min={`${planningYear}-01-01`}
                        max={`${planningYear}-12-31`}
                        className="w-full min-w-0 max-w-full px-4 py-3.5 text-base border italic body-text transition-all duration-[400ms] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-foreground box-border rounded appearance-none"
                        style={{
                            borderColor: 'rgb(var(--border))',
                            backgroundColor: 'rgb(var(--background))',
                            color: 'rgb(var(--foreground))',
                            width: '100%',
                            minWidth: 0,
                            fontSize: '16px'
                        }}
                        disabled={disabled}
                    />
                </div>
                <div className="flex min-w-0 flex-col gap-1.5">
                    <span className="text-xs uppercase tracking-wide text-muted-foreground transition-colors duration-[400ms]">end date (optional)</span>
                    <input
                        type="date"
                        value={endInput}
                        onChange={(e) => setEndInput(e.target.value)}
                        min={`${planningYear}-01-01`}
                        max={`${planningYear}-12-31`}
                        className="w-full min-w-0 max-w-full px-4 py-3.5 text-base border italic body-text transition-all duration-[400ms] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-foreground box-border rounded appearance-none"
                        style={{
                            borderColor: 'rgb(var(--border))',
                            backgroundColor: 'rgb(var(--background))',
                            color: 'rgb(var(--foreground))',
                            width: '100%',
                            minWidth: 0,
                            fontSize: '16px'
                        }}
                        disabled={disabled}
                    />
                </div>
                <div className="flex items-end">
                    <button
                        type="button"
                        onClick={handleAdd}
                        className="w-full px-4 py-3.5 text-base italic lowercase font-medium transition-all duration-[400ms] border cursor-pointer"
                        style={{
                            backgroundColor: 'rgb(var(--foreground))',
                            color: 'rgb(var(--background))',
                            borderColor: 'transparent'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgb(var(--muted-foreground))'
                            e.currentTarget.style.borderColor = 'rgb(var(--muted-foreground))'
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgb(var(--foreground))'
                            e.currentTarget.style.borderColor = 'transparent'
                        }}
                        disabled={disabled}
                    >
                        add dates
                    </button>
                </div>
            </div>

            <p className="mt-3 text-xs italic text-muted-foreground transition-colors duration-[400ms]">
                select a start date and, if you need a block, an end date. we will reserve every day in that span before maximising your remaining allowance.
            </p>

            {dates.length > 0 && (
                <div className="mt-4">
                    <div className="text-xs uppercase tracking-wide text-muted-foreground transition-colors duration-[400ms] mb-2">
                        pinned days
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {dates.map(date => (
                            <span
                                key={date}
                                className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm italic transition-all duration-[400ms]"
                                style={{
                                    borderColor: 'rgb(var(--border))',
                                    backgroundColor: 'rgb(var(--background))',
                                    color: 'rgb(var(--foreground))'
                                }}
                            >
                                {new Date(date).toLocaleDateString('en-GB', dayOptions)}
                                <button
                                    type="button"
                                    onClick={() => onRemoveDate(date)}
                                    className="text-xs uppercase tracking-wide"
                                    style={{ color: 'rgb(var(--muted-foreground))' }}
                                >
                                    remove
                                </button>
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
