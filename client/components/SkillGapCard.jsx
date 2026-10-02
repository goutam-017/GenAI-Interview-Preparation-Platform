import { ChevronDown, Lightbulb } from 'lucide-react'
import React, { useState } from 'react'


const SkillGapCard = ({ gap, index }) => {
    const [showSolution, setShowSolution] = useState(false)

    const severityStyles = {
        high: {
            text: 'text-red-400',
            bg: 'bg-red-500/10',
            border: 'border-red-500/20',
            dot: 'bg-red-400',
            label: 'High Priority'
        },

        medium: {
            text: 'text-amber-400',
            bg: 'bg-amber-500/10',
            border: 'border-amber-500/20',
            dot: 'bg-amber-400',
            label: 'Medium Priority'
        },

        low: {
            text: 'text-green-400',
            bg: 'bg-green-800/80',
            border: 'border-green-700/70',
            dot: 'bg-green-500',
            label: 'Low Priority'
        }
    }

    const style = severityStyles[gap.severity] || severityStyles.low

    return (
        <div className="group rounded-2xl border border-slate-800/80 bg-[#0f141d] p-5 hover:border-slate-700 hover:bg-[#111722] transition-all duration-200">
            {/* ================= HEADER ================= */}
            <div className="flex items-center justify-between gap-5">
                {/* Left */}
                <div className="flex items-center gap-4 min-w-0">
                    {/* Number */}
                    <div className="w-10 h-10 rounded-xl bg-[#0b0f16] border border-slate-800 flex items-center justify-center flex-shrink-0">
                        <span className="text-[11px] font-bold text-slate-600">
                            {String(index + 1).padStart(2, '0')}
                        </span>
                    </div>

                    {/* Skill */}
                    <div className="min-w-0">
                        <h3 className="text-sm font-semibold text-slate-200">
                            {gap.skill}
                        </h3>

                        <div className="flex items-center gap-2 mt-1.5">
                            <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />

                            <span className="text-[10px] text-slate-600">
                                Requires additional preparation
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right */}
                <div className="flex items-center gap-3 flex-shrink-0">
                    {/* Priority */}
                    <span className={`inline-flex items-center gap-1.5 text-[10px] font-medium px-2.5 py-1.5 rounded-lg border ${style.bg} ${style.text} ${style.border}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                        {style.label}
                    </span>

                    {/* View Solution Button */}
                    <button
                        type="button"
                        onClick={() => setShowSolution(!showSolution)}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-800 bg-[#0b0f16] text-[10px] font-medium text-slate-400 hover:text-white hover:border-slate-700 transition-all"
                    >
                        <span>
                            {showSolution ? 'Solution' : 'Solution'}
                        </span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${showSolution ? 'rotate-180' : ''}`} />
                    </button>
                </div>
            </div>

            {/* ================= SOLUTION DROPDOWN ================= */}
            <div className={`grid transition-all duration-300 ease-in-out ${showSolution ? 'grid-rows-[1fr] opacity-100 mt-5' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
                <div className="overflow-hidden">
                    <div className="pt-4 border-t border-slate-800/70">
                        <div className="flex items-start gap-3">
                            {/* Solution Indicator */}
                            <div className="w-7 h-7 rounded-lg bg-[#ff2a6d]/10 border border-[#ff2a6d]/20 flex items-center justify-center flex-shrink-0">
                                <Lightbulb className="w-3.5 h-3.5 text-[#ff2a6d]" />
                            </div>

                            {/* Solution Content */}
                            <div className="min-w-0">
                                <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-600 mb-2">
                                    Recommended Solution
                                </p>

                                <p className="text-xs leading-5 text-slate-400">
                                    {gap.solution}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default SkillGapCard