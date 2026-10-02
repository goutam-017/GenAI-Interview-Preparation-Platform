'use client'

import React, { useState, useRef } from 'react'
import { Briefcase, User, UploadCloud, FileText, X, LoaderIcon, SendHorizontal, Trash2, Menu } from 'lucide-react'
import { useInterview } from '@/hooks/useInterview'
import { useRouter, usePathname } from "next/navigation"

export default function InterviewPlanGenerator() {
  const { handleGenerateInterviewReport, interviewReports, handleDeleteInterviewReportById } = useInterview()

  const router = useRouter()

  const [jobDescription, setJobDescription] = useState('')
  const [selfDescription, setSelfDescription] = useState('')
  const [file, setFile] = useState(null)
  const [customMessage, setCustomMessage] = useState("")
  const [isDragging, setIsDragging] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  // Sidebar open/close
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const fileInputRef = useRef(null)

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
    }
  }

  // Job Description AND Self Description are required.
  // Resume is optional.
  const canSubmit = jobDescription.trim().length > 0 && selfDescription.trim().length > 0 && customMessage.trim().length > 0

  const resetForm = () => {
    setJobDescription('')
    setSelfDescription('')
    setCustomMessage('')
    setFile(null)
    setIsDragging(false)

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const pathname = usePathname()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!canSubmit || isLoading) return
    setIsLoading(true)

    try {
      // API call
      const data = await handleGenerateInterviewReport({ jobDescription, selfDescription, customMessage, resumeFile: file })
      if (data) {
        resetForm()
      }
    } finally {
      setIsLoading(false)
    }
  }

  /*
 * Handle previous report click
 */
  const handleReportClick = (reportId) => {
    router.push(`${pathname}/${reportId}`)
    setIsSidebarOpen(false)
  }


  const handleDeleteReport = async (e, reportId) => {
    e.stopPropagation()
    const confirmed = window.confirm(
      'Are you sure you want to delete this interview report?'
    )
    if (!confirmed) {
      return
    }
    try {
      await handleDeleteInterviewReportById(reportId)
    } catch (error) {
      console.error('Delete interview report error:', error)
    }
  }

  return (
    <div className="w-full mt-18 text-slate-100 overflow-hidden">
      <div className="relative flex h-[calc(100vh-4.5rem)] w-full overflow-hidden">
        {/* MOBILE BACKDROP */}
        {isSidebarOpen && (
          <div onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px] md:hidden" />
        )}

        {/* left side bar for viewing previous reports and this div not scrollable but their content scrollable*/}
        <aside className={`absolute left-0 top-0 z-50 flex h-full w-64 shrink-0 flex-col overflow-hidden border-r border-t border-slate-800/80 bg-[#0c1017] transition-transform duration-300 ease-in-out md:relative md:z-auto md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          {/* SIDEBAR HEADER */}
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-800/80 px-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-[#ff2a6d]" />
              <h2 className="text-sm font-semibold text-white">
                Interview Reports
              </h2>
            </div>

            {/* CLOSE BUTTON - MOBILE ONLY */}
            <button
              type="button"
              onClick={() => setIsSidebarOpen(false)}
              className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white md:hidden">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* REPORT LIST */}
          <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-2 py-3 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-700">
            {interviewReports?.length > 0 ? (
              <div className="space-y-1">
                {interviewReports.map((report) => (
                  <button
                    key={report.id}
                    type="button"
                    onClick={() => handleReportClick(report.id)}
                    className="group flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-3 text-left transition-all duration-150 hover:bg-slate-800/70"
                  >
                    <FileText className="h-4 w-4 shrink-0 text-slate-500 group-hover:text-[#ff2a6d]" />
                    <span className="min-w-0 flex-1 truncate text-sm text-slate-300 group-hover:text-white">
                      {report.title || 'Interview Report'}
                    </span>

                    <span
                      role="button"
                      tabIndex={0}
                      onClick={(e) => handleDeleteReport(e, report.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          handleDeleteReport(e, report.id)
                        }
                      }}
                      className="shrink-0 rounded-md p-1.5 text-slate-600 opacity-0 transition-all hover:bg-red-500/10 hover:text-red-400 group-hover:opacity-100"
                      title="Delete report"
                    >
                      <Trash2 className="h-4 w-4" />
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-slate-800/60">
                  <FileText className="h-5 w-5 text-slate-600" />
                </div>
                <p className="text-sm text-slate-400">
                  No reports yet
                </p>
              </div>
            )}
          </div>

          {/* ========= SIDEBAR FOOTER ========= */}
          <div className="shrink-0 border-t border-slate-800/80 px-4 py-3">
            <p className="text-center text-[11px] text-[#ff2a6d]">
              Your interview reports history
            </p>
          </div>
        </aside>

        {/* right main side for containing the form user inputs and this is scorllable */}
        <div className="flex-1 min-w-0 h-full overflow-hidden">
          <button
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            className="absolute left-3 top-3 z-30 flex h-10 w-10 items-center justify-center rounded-lg border border-slate-800 bg-[#111722] text-slate-300 shadow-lg transition-colors hover:bg-slate-800 hover:text-white md:hidden">
            <Menu className="h-5 w-5" />
          </button>

          <main className="relative z-10 h-full w-full overflow-y-auto overflow-x-hidden px-4 py-12 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-700">
            {/* Header Title */}
            <div className="text-center mb-10 space-y-3">
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
                Generate Your Custom{' '}
                <span className="text-[#ff2a6d] drop-shadow-[0_0_24px_rgba(255,42,109,0.45)]">
                  Interview
                </span>{' '}
                Preparation Report
              </h1>

              <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto font-normal">
                Let our AI analyze the job requirements and your unique profile to build a winning strategy.
              </p>
            </div>

            {/* Main Card Container */}
            <form onSubmit={handleSubmit} className="w-full bg-[#111722]/90 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black/60">
              <p className="mb-7 text-center text-base text-[#ff2a6d] font-bold">
                “Upload your resume for a more personalized interview report.”
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* LEFT COLUMN */}
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 font-semibold text-slate-200 text-base">
                      <Briefcase className="w-5 h-5 text-[#ff2a6d]" />
                      <span>Target Job Description</span>
                    </div>

                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#ff2a6d]/15 text-[#ff2a6d] border border-[#ff2a6d]/30">
                      Required
                    </span>
                  </div>

                  <div className="relative flex-1 flex flex-col">
                    <textarea
                      id="jobDescription"
                      name="jobDescription"
                      value={jobDescription}
                      maxLength={5000}
                      onChange={(e) => setJobDescription(e.target.value)}
                      placeholder={`Paste the full job description here...${'\n'}e.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'`}
                      className="w-full h-80 lg:h-full min-h-[300px] bg-[#0c1017] text-slate-200 placeholder-slate-500 text-sm leading-relaxed p-4 rounded-xl border border-slate-800 focus:border-[#ff2a6d]/60 focus:ring-1 focus:ring-[#ff2a6d]/40 outline-none resize-none transition-all duration-200 scrollbar-hide"
                      required
                    />

                    <span className="absolute bottom-3 right-4 text-xs font-medium text-slate-500">
                      {jobDescription.length} / 5000 chars
                    </span>
                  </div>
                </div>

                {/* RIGHT COLUMN */}
                <div className="flex flex-col space-y-5">
                  {/* Profile Header */}
                  <div className="flex items-center gap-2 font-semibold text-slate-200 text-base">
                    <User className="w-5 h-5 text-[#ff2a6d]" />
                    <span>Your Profile</span>
                  </div>

                  {/* Self Description */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="selfDescription" className="text-xs font-medium text-slate-300">
                      Quick Self-Description{' '}
                      <span className="text-[#ff2a6d] font-normal">
                        (Required)
                      </span>
                    </label>

                    <textarea
                      id="selfDescription"
                      name="selfDescription"
                      value={selfDescription}
                      onChange={(e) => setSelfDescription(e.target.value)}
                      placeholder="Briefly describe your experience, key skills, and years of experience..."
                      className="w-full h-50 bg-[#0c1017] text-slate-200 placeholder-slate-500 text-sm leading-relaxed p-3.5 rounded-xl border border-slate-800 focus:border-[#ff2a6d]/60 focus:ring-1 focus:ring-[#ff2a6d]/40 outline-none resize-none transition-all duration-200 scrollbar-hide"
                      required
                    />
                  </div>

                  {/* Upload Resume */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-medium text-slate-300">
                        Upload Resume{' '}
                        <span className="text-[#ff2a6d] font-normal">
                          (Optional)
                        </span>
                      </label>
                    </div>

                    <input
                      ref={fileInputRef}
                      type="file"
                      id="resume"
                      accept=".pdf,.docx,.txt"
                      onChange={handleFileChange}
                      className="hidden"
                    />

                    {!file ? (
                      <div
                        onDragOver={(e) => {
                          e.preventDefault()
                          setIsDragging(true)
                        }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={`flex items-center justify-center gap-4 p-3.5 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 ${isDragging ? 'border-[#ff2a6d] bg-[#ff2a6d]/10' : 'border-slate-800/90 hover:border-slate-700 bg-[#0c1017]/70 hover:bg-[#0c1017]'}`}
                      >
                        {/* Upload Icon */}
                        <div className="w-10 h-10 rounded-full bg-[#ff2a6d]/10 flex items-center justify-center flex-shrink-0">
                          <UploadCloud className="w-6 h-6 text-[#ff2a6d]" />
                        </div>

                        {/* Upload Text */}
                        <div className="flex flex-col gap-1 justify-center items-center">
                          <p className="text-sm font-medium text-slate-200">
                            Click to upload or drag & drop
                          </p>

                          <p className="text-xs text-slate-500">
                            PDF or DOCX (Max 5MB)
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between p-3.5 bg-[#0c1017] border border-slate-800 rounded-xl">
                        <div className="flex items-center gap-3 overflow-hidden">
                          <FileText className="w-5 h-5 text-[#ff2a6d] flex-shrink-0" />
                          <div className="truncate text-sm">
                            <p className="text-slate-200 truncate font-medium">
                              {file.name}
                            </p>

                            <p className="text-xs text-slate-500">
                              {(file.size / 1024).toFixed(1)} KB • Ready
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setFile(null)
                            if (fileInputRef.current) {
                              fileInputRef.current.value = ''
                            }
                          }}
                          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* User Prompt & Submit */}
              <div className="mt-6 flex w-full items-stretch gap-2">
                {/* User Prompt */}
                <div className="relative flex-1">
                  <textarea
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    placeholder="Tell us anything you want to focus on for your interview preparation... (required)"
                    rows={1}
                    className="box-border block h-15 w-full resize-none rounded-4xl border border-slate-800 bg-[#0c1017] px-3.5 py-0 text-sm leading-[60px] text-slate-200 outline-none transition-all duration-200 placeholder:text-slate-500 focus:border-[#ff2a6d]/60 focus:ring-1 focus:ring-[#ff2a6d]/40 scrollbar-hide"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!canSubmit || isLoading}
                  className={`box-border flex h-15 w-15 shrink-0 items-center justify-center rounded-full text-white transition-all duration-200 ${!canSubmit || isLoading ? "cursor-not-allowed bg-slate-700/70 text-slate-400" : "bg-[#e1034d] hover:bg-[#c90344]"}`}
                >
                  {isLoading ? (
                    <LoaderIcon className="h-5 w-5 animate-spin" />
                  ) : (
                    <SendHorizontal size={18} />
                  )}
                </button>
              </div>
            </form>
          </main>
        </div>
      </div>
    </div>
  )
}