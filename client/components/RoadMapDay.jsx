const RoadMapDay = ({ plan, isLast }) => {
    return (
        <div className="relative flex gap-5">
            {/* Timeline */}
            <div className="flex flex-col items-center">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff2a6d] mt-2 z-10" />
                {!isLast && (<div className="w-px flex-1 bg-slate-800 mt-2" />)}
            </div>

            {/* Content */}
            <div className="flex-1 pb-8">
                <div className="rounded-2xl border border-slate-800/80 bg-[#0f141d] p-5 hover:border-slate-700 transition-colors">
                    <div className="flex items-center gap-3 mb-5">
                        <span className="inline-flex items-center justify-center rounded-full border border-[#ff2a6d] bg-[#ff2a6d]/30 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#ff2a6d]">
                            Day {plan.days}
                        </span>

                        {/* <span className="w-1 h-1 rounded-full bg-slate-700" /> */}

                        <h3 className="text-sm font-semibold text-white">
                            {plan.focus}
                        </h3>
                    </div>

                    <div className="space-y-3">
                        {plan.tasks.map((task, index) => (
                            <div key={index} className="flex items-start gap-3">
                                <span className="text-slate-600 mt-0.5">
                                    •
                                </span>

                                <p className="text-sm leading-5 text-slate-400">
                                    {task}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}


export default RoadMapDay