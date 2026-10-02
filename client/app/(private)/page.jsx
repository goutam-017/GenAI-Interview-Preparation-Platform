import React from "react"
import { features, steps } from '@/assets/assets'
import { ArrowRightIcon, MessageCircleIcon, ZapIcon } from "lucide-react"
import Link from "next/link"

const Home = () => {
    return (
        <main className="min-h-screen overflow-hidden">
            {/* ================= HERO ================= */}
            <section className="relative mx-auto max-w-7xl px-6 pb-24 pt-20 lg:px-8 lg:pt-28">
                <div className="relative z-10 mx-auto max-w-4xl text-center">
                    {/* Badge */}
                    <div className="mx-auto mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-gray-300">
                        <ZapIcon size={15} className="text-[#e1034d]" />
                        AI-powered interview preparation
                    </div>

                    {/* Heading */}
                    <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-7xl">
                        Prepare for your interview.
                        <span className="block text-[#e1034d]">
                            Get answers when you need them.
                        </span>
                    </h1>

                    {/* Description */}
                    <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-gray-400 sm:text-lg">
                        PrepInterview.AI helps you prepare with a personalized interview report based on your profile, skills, and target role — and gives you a one-to-one AI conversation to ask questions, clear doubts, and get guidance whenever you need it.
                    </p>

                    {/* CTA */}
                    <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                        {/* Generate Interview Report */}
                        <Link
                            href='/interview'
                            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#e1034d] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#e1034d]/20 transition hover:bg-[#c90344] active:scale-[0.98] sm:w-auto"
                        >
                            Generate Interview Report

                            <ArrowRightIcon size={18} className="transition-transform group-hover:translate-x-1" />
                        </Link>

                        {/* Chat with AI */}
                        <Link
                            href='/chats'
                            className="group flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-7 py-3.5 text-sm font-semibold text-gray-300 transition hover:bg-white/[0.07] hover:text-white active:scale-[0.98] sm:w-auto"
                        >
                            Chat with AI

                            <MessageCircleIcon size={18} className="transition-transform group-hover:scale-105" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ================= FEATURES ================= */}
            <section id="features" className="py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <p className="text-sm font-semibold uppercase tracking-widest text-[#e1034d]">
                            Features
                        </p>

                        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                            Everything you need to prepare
                        </h2>

                        <p className="mt-4 text-gray-400">
                            One platform to practice, analyze, and improve your interview performance.
                        </p>
                    </div>

                    {/* Feature Grid */}
                    <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature) => {
                            const Icon = feature.icon

                            return (
                                <div key={feature.title} className="group rounded-2xl border border-white/10 bg-[#11161f] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#e1034d]/30 hover:bg-[#141a24]" >
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e1034d]/10 text-[#e1034d] transition group-hover:bg-[#e1034d] group-hover:text-white">
                                        <Icon size={21} />
                                    </div>

                                    <h3 className="mt-6 text-lg font-semibold">
                                        {feature.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-6 text-gray-400">
                                        {feature.description}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* ================= HOW IT WORKS ================= */}
            <section id="how-it-works" className="border-t border-white/5 py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    {/* Heading */}
                    <div className="mx-auto max-w-2xl text-center">
                        <p className="text-sm font-semibold uppercase tracking-widest text-[#e1034d]">
                            How it works
                        </p>

                        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                            Generate your interview report in {steps.length} simple steps
                        </h2>

                        <p className="mt-4 text-gray-400">
                            Give us the information you want, and let AI handle the preparation.
                        </p>
                    </div>

                    {/* Steps */}
                    <div className="relative mt-16">
                        {/* Connecting Line - Desktop */}
                        <div className="absolute left-[10%] right-[10%] top-8 hidden h-px bg-white/10 lg:block" />

                        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
                            {steps.map((step) => (
                                <div key={step.number} className="relative flex flex-col items-center text-center">
                                    {/* Step Number */}
                                    <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-[#e1034d]/30 bg-[#11161f] text-lg font-bold text-[#e1034d] shadow-[0_0_30px_rgba(225,3,77,0.08)] transition-all duration-300 hover:border-[#e1034d] hover:bg-[#e1034d] hover:text-white">
                                        {step.number}
                                    </div>

                                    {/* Step Title */}
                                    <h3 className="mt-6 text-base font-semibold leading-6 text-white">
                                        {step.title}
                                    </h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Home