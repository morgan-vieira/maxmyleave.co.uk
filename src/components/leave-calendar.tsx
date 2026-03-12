'use client'

import { useState, useEffect } from "react"

interface LeaveResult {
    leaveStartDate: string;
    leaveEndDate: string;
    breakStartDate: string;
    breakEndDate: string;
    leaveDates: string[];
    overlappingMandatoryDates: string[];
    totalLeaveDays: number;
    breakLength: number;
    freeDays: number;
    leaveDaysUsed: number;
    efficiency: number;
    type: 'bridge' | 'extension' | 'standalone';
    description: string;
}

interface LeaveCalendarProps {
    results: LeaveResult[];
    year: number;
    region?: string;
}

interface CalendarDay {
    date: Date;
    isCurrentMonth: boolean;
    isWeekend: boolean;
    isHoliday: boolean;
    leaveType?: 'annual' | 'free';
    resultIndex?: number;
}

export default function LeaveCalendar({ results, year, region = 'england-and-wales' }: LeaveCalendarProps) {
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [holidays, setHolidays] = useState<string[]>([]);

    const formatDateKey = (date: Date): string => {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');
        return `${y}-${m}-${d}`;
    };

    const formatCount = (count: number, noun: string): string => `${count} ${noun}${count === 1 ? '' : 's'}`;

    // Fetch holidays when component mounts
    useEffect(() => {
        fetch('https://www.gov.uk/bank-holidays.json')
            .then(res => res.json())
            .then((data: any) => {
                const events = data[region]?.events || [];
                const holidayDates = events
                    .filter((event: any) => event.date.startsWith(year.toString()))
                    .map((event: any) => event.date);
                setHolidays(holidayDates);
            })
            .catch(() => {
                // Fallback to some common holidays if API fails
                setHolidays([
                    `${year}-01-01`, // New Year's Day
                    `${year}-12-25`, // Christmas Day
                    `${year}-12-26`, // Boxing Day
                ]);
            });
    }, [year, region]);

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const isHoliday = (date: Date): boolean => holidays.includes(formatDateKey(date));

    const breakRanges = results.map(result => {
        const start = new Date(result.breakStartDate);
        const end = new Date(result.breakEndDate);
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);
        return { start, end };
    });

    const leaveDateSets = results.map(result => new Set(result.leaveDates));

    const getLeaveInfo = (date: Date): { leaveType?: 'annual' | 'free', resultIndex?: number } => {
        const dateStr = formatDateKey(date);

        for (let i = 0; i < results.length; i++) {
            const { start, end } = breakRanges[i];
            if (date >= start && date <= end) {
                const isAnnualLeave = leaveDateSets[i].has(dateStr);

                return {
                    leaveType: isAnnualLeave ? 'annual' : 'free',
                    resultIndex: i
                };
            }
        }

        return {};
    };

    const generateCalendarDays = (month: number): CalendarDay[] => {
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startDate = new Date(firstDay);
        const endDate = new Date(lastDay);

        // Start from the first Sunday of the week containing the first day
        startDate.setDate(startDate.getDate() - startDate.getDay());

        // End on the last Saturday of the week containing the last day
        endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));

        const days: CalendarDay[] = [];
        const currentDate = new Date(startDate);

        while (currentDate <= endDate) {
            const isCurrentMonth = currentDate.getMonth() === month;
            const isWeekend = currentDate.getDay() === 0 || currentDate.getDay() === 6;
            const leaveInfo = getLeaveInfo(currentDate);

            days.push({
                date: new Date(currentDate),
                isCurrentMonth,
                isWeekend,
                isHoliday: isHoliday(currentDate),
                ...leaveInfo
            });

            currentDate.setDate(currentDate.getDate() + 1);
        }

        return days;
    };

    const calendarDays = generateCalendarDays(selectedMonth);

    const getBreakAccentClasses = () => 'bg-blue-100 border-blue-300';

    return (
        <div className="space-y-6">
            {/* Month Navigation */}
            <div className="flex items-center justify-between">
                <button
                    onClick={() => setSelectedMonth(Math.max(0, selectedMonth - 1))}
                    disabled={selectedMonth === 0}
                    className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded"
                >
                    ← Previous
                </button>
                <h3 className="text-xl font-semibold">
                    {months[selectedMonth]} {year}
                </h3>
                <button
                    onClick={() => setSelectedMonth(Math.min(11, selectedMonth + 1))}
                    disabled={selectedMonth === 11}
                    className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded"
                >
                    Next →
                </button>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 text-xs">
                <div className="flex items-center gap-1">
                    <div className="w-4 h-4 bg-red-200 border border-red-300 rounded"></div>
                    <span>Annual Leave</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-4 h-4 bg-green-200 border border-green-300 rounded"></div>
                    <span>Free Days (Weekend/Holiday)</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-4 h-4 bg-yellow-200 border border-yellow-300 rounded"></div>
                    <span>Bank Holiday</span>
                </div>
            </div>

            {/* Calendar Grid */}
            <div className="border rounded-lg overflow-hidden">
                {/* Days of Week Header */}
                <div className="grid grid-cols-7 bg-gray-50">
                    {daysOfWeek.map(day => (
                        <div key={day} className="p-2 text-center text-sm font-medium text-gray-600 border-r border-gray-200 last:border-r-0">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7">
                    {calendarDays.map((day, index) => {
                        const result = day.resultIndex !== undefined ? results[day.resultIndex] : null;

                        return (
                            <div
                                key={index}
                                className={`
                                    min-h-[60px] p-1 border-r border-b border-gray-200 last:border-r-0
                                    ${!day.isCurrentMonth ? 'bg-gray-50 text-gray-400' : 'bg-white'}
                                    ${day.isHoliday ? 'bg-yellow-100' : ''}
                                    ${day.leaveType === 'annual' ? 'bg-red-100 border-red-200' : ''}
                                    ${day.leaveType === 'free' && result ? getBreakAccentClasses() : ''}
                                    ${day.isWeekend && !day.leaveType ? 'bg-gray-100' : ''}
                                `}
                            >
                                <div className="text-sm font-medium">
                                    {day.date.getDate()}
                                </div>
                                {day.leaveType && result && (
                                    <div className="text-xs mt-1">
                                        <div className={`px-1 py-0.5 rounded text-center ${day.leaveType === 'annual' ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'
                                            }`}>
                                            {day.leaveType === 'annual' ? 'Leave' : 'Free'}
                                        </div>
                                        <div className="text-xs text-gray-600 mt-0.5">
                                            #{(day.resultIndex ?? 0) + 1}
                                        </div>
                                    </div>
                                )}
                                {day.isHoliday && !day.leaveType && (
                                    <div className="text-xs mt-1">
                                        <div className="px-1 py-0.5 bg-yellow-200 text-yellow-800 rounded text-center">
                                            Holiday
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Results Summary */}
            <div className="space-y-2">
                <h4 className="font-medium">Break Summary:</h4>
                {results.map((result, index) => (
                    <div key={index} className="p-3 rounded border-l-4 border-blue-300 bg-blue-50">
                        <div className="flex justify-between items-start">
                            <div>
                                <span className="font-medium">Break #{index + 1}</span>
                                <div className="text-sm mt-1">{result.description}</div>
                                {result.leaveDates.length > 0 && (
                                    <div className="text-xs text-gray-600 mt-1">
                                        Book: {result.leaveDates.map(date => new Date(date).toLocaleDateString('en-GB')).join(', ')}
                                    </div>
                                )}
                            </div>
                            <div className="text-right text-sm space-y-0.5">
                                <div className="font-medium">
                                    {formatCount(result.leaveDaysUsed, 'new day')} → {formatCount(result.breakLength, 'day')} away ({formatCount(result.freeDays, 'free day')})
                                </div>
                                <div className="text-gray-600">Total leave during break: {formatCount(result.totalLeaveDays, 'day')}</div>
                                <div className="text-gray-600">Covers {formatCount(result.overlappingMandatoryDates.length, 'must-have day')}</div>
                                <div className="text-gray-600">{result.efficiency}x efficiency</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}