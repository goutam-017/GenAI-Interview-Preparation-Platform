import { CheckCircle2, ChevronDown, ChevronUp, Target } from "lucide-react"
import { useState } from "react"

const QuestionCard = ({ item, index }) => {

    const [open, setOpen] = useState(false)

    return (
        <div className={`rounded-2xl border overflow-hidden transition-all ${open ? 'border-[#ff2a6d]/30 bg-[#111722]' : 'border-slate-800/80 bg-[#0f141d] hover:border-slate-700'}`}>
            <button type="button" onClick={() => setOpen(!open)} className="w-full p-5 text-left">
                <div className="flex items-start gap-4">
                    <span className={`flex-shrink-0 text-xs font-bold pt-1 ${open ? 'text-[#ff2a6d]' : 'text-slate-600'}`}>
                        {String(index + 1).padStart(2, '0')}
                    </span>

                    <div className="flex-1 min-w-0">
                        <h3 className="text-[15px] font-medium leading-6 text-slate-200">
                            {item.question}
                        </h3>
                    </div>

                    <div className="flex-shrink-0 text-slate-500">
                        {open ? (
                            <ChevronUp className="w-5 h-5" />
                        ) : (
                            <ChevronDown className="w-5 h-5" />
                        )}
                    </div>
                </div>
            </button>

            {open && (
                <div className="px-5 pb-5">
                    <div className="border-t border-slate-800 pt-5 ml-8 space-y-5">
                        {/* Intention */}
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Target className="w-4 h-4 text-[#ff2a6d]" />

                                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
                                    What the interviewer is testing
                                </span>
                            </div>
                            <p className="text-sm leading-6 text-slate-400">
                                {item.intention}
                            </p>
                        </div>

                        {/* Answer */}
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400" />

                                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
                                    Model Answer
                                </span>
                            </div>

                            <div className="rounded-xl bg-[#0b0f16] border border-slate-800 p-4">
                                <p className="text-sm leading-6 text-slate-300">
                                    {item.answer}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default QuestionCard