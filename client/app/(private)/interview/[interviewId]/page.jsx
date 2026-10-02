'use client'

import React, { useState } from 'react'
import SkillGapCard from '@/components/SkillGapCard'
import RoadMapDay from '@/components/RoadMapDay'
import QuestionCard from '@/components/QuestionCard'
import { SIDEBAR_NAV_ITEMS } from '@/assets/assets'
import { useInterview } from '@/hooks/useInterview'
import { LoaderIcon } from 'lucide-react'


export default function InterviewResult() {
    const { loading, interviewReport } = useInterview()

    const [activeNav, setActiveNav] = useState('technical')

    const activeItem = SIDEBAR_NAV_ITEMS.find((item) => item.id === activeNav)

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <LoaderIcon className="h-6 w-6 animate-spin text-[#e1034d]" />
            </div>
        )
    }

    /* No report */
    if (!interviewReport) {
        return (
            <div className="flex min-h-screen items-center justify-center text-slate-400">
                Interview report not found.
            </div>
        )
    }

    const { matchScore, technicalQuestions, behavioralQuestions, skillGaps, preparationPlans, } = interviewReport

    return (
        <div className="mt-18 h-[calc(100vh-4.5rem)] overflow-hidden text-slate-100">
            <div className="relative max-w-375 h-full overflow-hidden">
                <div className="flex h-full">
                    {/* ========== LEFT SIDEBAR ========== */}
                    <aside className="hidden md:block w-64 shrink-0 border-r-2 border-t border-slate-800/70 h-full overflow-hidden">
                        <div className="p-5">
                            {/* Interview Plan */}
                            <p className="text-[10px] uppercase tracking-[0.18em] font-bold text-slate-600 mb-3">
                                Sections
                            </p>

                            <div className="space-y-1">
                                {SIDEBAR_NAV_ITEMS.map((item) => {
                                    const Icon = item.icon
                                    const active = activeNav === item.id

                                    return (
                                        <button
                                            key={item.id}
                                            type="button"
                                            onClick={() => setActiveNav(item.id)}
                                            className={`relative w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all cursor-pointer ${active
                                                ? 'bg-[#ff2a6d]/10 text-white'
                                                : 'text-slate-500 hover:text-slate-300 hover:bg-slate-900'
                                                }`}
                                        >
                                            {active && (
                                                <span className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full bg-[#ff2a6d]" />
                                            )}

                                            <Icon className={`w-4 h-4 ${active ? 'text-[#ff2a6d]' : 'text-slate-600'}`} />

                                            <span className="text-xs font-medium">
                                                {item.label}
                                            </span>
                                        </button>
                                    )
                                })}
                            </div>

                            {/* ========== MATCH SCORE ========== */}
                            <div className="mt-8 pt-6 border-t border-slate-800/70">
                                <p className="text-[10px] uppercase tracking-[0.18em] font-bold text-slate-600 mb-4">
                                    Your Profile Match for this job role
                                </p>

                                <div className="rounded-xl border border-slate-800 bg-[#0d121a] p-4">
                                    <div className="flex items-center justify-between">

                                        <div className="relative w-12 h-12">
                                            <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
                                                <circle cx="24" cy="24" r="19" fill="none" stroke="currentColor" strokeWidth="4" className="text-slate-800" />

                                                <circle
                                                    cx="24"
                                                    cy="24"
                                                    r="19"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                    strokeLinecap="round"
                                                    strokeDasharray={`${2 * Math.PI * 19}`}
                                                    strokeDashoffset={`${2 * Math.PI * 19 -
                                                        (matchScore / 100) *
                                                        (2 * Math.PI * 19)
                                                        }`}
                                                    className="text-[#ff2a6d]"
                                                />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-white">
                                                {matchScore}%
                                            </p>

                                            <p className="text-[10px] text-slate-500 mt-1">
                                                Profile Match
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* ========== ONLY SCROLLABLE AREA ========== */}
                    <main className="flex-1 min-w-0 h-full overflow-y-auto overflow-x-hidden scrollbar-hide">
                        <div className="max-w-4xl mx-auto px-5 lg:px-10 py-8">
                            {/* Mobile Navigation */}
                            <div className="md:hidden mb-6 overflow-x-auto">
                                <div className="flex gap-2 min-w-max">
                                    {SIDEBAR_NAV_ITEMS.map((item) => {
                                        const Icon = item.icon

                                        return (
                                            <button
                                                key={item.id}
                                                type="button"
                                                onClick={() => setActiveNav(item.id)}
                                                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs ${activeNav === item.id
                                                    ? 'bg-[#ff2a6d] text-white'
                                                    : 'bg-slate-900 text-slate-400'
                                                    }`}
                                            >
                                                <Icon className="w-3.5 h-3.5" />
                                                {item.label}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>

                            {/* Page Header */}
                            <div className="mb-8">
                                <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-white">
                                    {activeItem?.label}
                                </h2>

                                <p className="text-sm text-slate-500 mt-2">
                                    Personalized preparation based on your interview analysis.
                                </p>
                            </div>

                            {/* ========== TECHNICAL QUESTIONS ========== */}
                            {activeNav === 'technical' && (
                                <section>
                                    <div className="grid grid-cols-3 gap-3 mb-6">
                                        <div className="rounded-xl border border-slate-800 bg-[#0d121a] p-4">
                                            <p className="text-[10px] uppercase tracking-wider text-slate-600">
                                                Questions
                                            </p>

                                            <p className="text-xl font-bold text-white mt-1">
                                                {technicalQuestions.length}
                                            </p>
                                        </div>

                                        <div className="rounded-xl border border-slate-800 bg-[#0d121a] p-4">
                                            <p className="text-[10px] uppercase tracking-wider text-slate-600">
                                                Match Score
                                            </p>

                                            <p className="text-xl font-bold text-[#ff2a6d] mt-1">
                                                {matchScore}%
                                            </p>
                                        </div>

                                        <div className="rounded-xl border border-slate-800 bg-[#0d121a] p-4">
                                            <p className="text-[10px] uppercase tracking-wider text-slate-600">
                                                Preparation
                                            </p>

                                            <p className="text-xl font-bold text-white mt-1">
                                                {preparationPlans.length} Days
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        {technicalQuestions.map((item, index) => (
                                            <QuestionCard key={index} item={item} index={index} />
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* ========== BEHAVIORAL QUESTIONS ========== */}
                            {activeNav === 'behavioral' && (
                                <section>
                                    <div className="rounded-2xl border border-slate-800 bg-[#0d121a] p-5 mb-6">
                                        <h3 className="text-sm font-semibold text-white">
                                            Behavioral Interview Strategy
                                        </h3>

                                        <p className="text-xs leading-5 text-slate-500 mt-2">
                                            Focus on specific experiences, explain your actions clearly, and connect your answer to the result or lesson learned.
                                        </p>
                                    </div>

                                    <div className="space-y-3">
                                        {behavioralQuestions.map((item, index) => (
                                            <QuestionCard key={index} item={item} index={index} />
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* ========== PREPARATION ROADMAP ========== */}
                            {activeNav === 'roadmap' && (
                                <section>
                                    <div className="rounded-2xl border border-[#ff2a6d]/20 bg-[#ff2a6d]/5 p-5 mb-7">
                                        <div>
                                            <h3 className="text-sm font-semibold text-white">
                                                Your {preparationPlans.length}-day preparation plan
                                            </h3>

                                            <p className="text-xs leading-5 text-slate-500 mt-1">
                                                Follow each day in sequence and focus on practical implementation rather than only reading theory.
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                        {preparationPlans.map((plan, index) => (
                                            <RoadMapDay key={plan.days} plan={plan} isLast={index === preparationPlans.length - 1} />
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* ========== SKILL GAPS ========== */}
                            {activeNav === 'skillgaps' && (
                                <section>
                                    {/* Summary */}
                                    <div className="grid grid-cols-3 gap-3 mb-6">
                                        {/* Total */}
                                        <div className="rounded-xl border border-slate-800 bg-[#0d121a] p-4">
                                            <p className="text-[10px] uppercase tracking-wider text-slate-600">
                                                Total Skills Gaps
                                            </p>

                                            <p className="text-xl font-bold text-white mt-1">
                                                {skillGaps.length}
                                            </p>
                                        </div>

                                        {/* High Priority */}
                                        <div className="rounded-xl border border-red-500/10 bg-[#0d121a] p-4">
                                            <p className="text-[10px] uppercase tracking-wider text-slate-600">
                                                High Priority
                                            </p>

                                            <p className="text-xl font-bold text-red-400 mt-1">
                                                {skillGaps.filter(gap => gap.severity === 'high').length}
                                            </p>
                                        </div>

                                        {/* Medium Priority */}
                                        <div className="rounded-xl border border-amber-500/10 bg-[#0d121a] p-4">
                                            <p className="text-[10px] uppercase tracking-wider text-slate-600">
                                                Medium Priority
                                            </p>

                                            <p className="text-xl font-bold text-amber-400 mt-1">
                                                {skillGaps.filter(gap => gap.severity === 'medium').length}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Skill Gap Cards */}
                                    <div className="space-y-3">
                                        {skillGaps.map((gap, index) => (
                                            <SkillGapCard key={index} gap={gap} index={index} />
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}