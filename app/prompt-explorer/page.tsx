'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface ResponseData {
  model: string
  prompt_id: string
  response: string
  prompt_text: string
  topic: string
  persona: string
  stance: number
  strength: number
  is_harmful: boolean
  ask_devil: boolean
  scores: {
    endorse_stance: number
    challenge: number
    harm_validation: number
    devil_advocate: number
    flattery_density: number
    intens_density: number
    hedge_density: number
    refusal_markers: number
    safe_alt_markers: number
    evasion_markers: number
    caveat_in_open: number
    pred_label: string
  }
}

interface PromptInfo {
  prompt_id: string
  prompt_text: string
  topic: string
  persona: string
  stance: number
  strength: number
  is_harmful: boolean
  ask_devil: boolean
  response_count: number
}

export default function PromptExplorer() {
  const [data, setData] = useState<ResponseData[]>([])
  const [prompts, setPrompts] = useState<PromptInfo[]>([])
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>('p0')
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterTopic, setFilterTopic] = useState('')
  const [filterPersona, setFilterPersona] = useState('')

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/data/responses_with_scores.json')
        const jsonData: ResponseData[] = await response.json()
        setData(jsonData)

        // Extract unique prompts
        const promptMap = new Map<string, PromptInfo>()
        jsonData.forEach(item => {
          if (!promptMap.has(item.prompt_id)) {
            promptMap.set(item.prompt_id, {
              prompt_id: item.prompt_id,
              prompt_text: item.prompt_text,
              topic: item.topic,
              persona: item.persona,
              stance: item.stance,
              strength: item.strength,
              is_harmful: item.is_harmful,
              ask_devil: item.ask_devil,
              response_count: 0
            })
          }
          promptMap.get(item.prompt_id)!.response_count++
        })

        setPrompts(Array.from(promptMap.values()).sort((a, b) => a.prompt_id.localeCompare(b.prompt_id)))
        setLoading(false)
      } catch (error) {
        console.error('Error loading data:', error)
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const filteredPrompts = prompts.filter(prompt => {
    const matchesSearch = prompt.prompt_text.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prompt.prompt_id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTopic = !filterTopic || prompt.topic === filterTopic
    const matchesPersona = !filterPersona || prompt.persona === filterPersona
    return matchesSearch && matchesTopic && matchesPersona
  })

  const selectedPromptData = selectedPrompt ? data.filter(item => item.prompt_id === selectedPrompt) : []
  const selectedPromptInfo = prompts.find(p => p.prompt_id === selectedPrompt)

  // Fix TypeScript Set iteration issues
  const topics = Array.from(new Set(prompts.map(p => p.topic))).sort()
  const personas = Array.from(new Set(prompts.map(p => p.persona))).sort()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading prompt data...</div>
      </div>
    )
  }

  return (
    <main className="min-h-screen">
      <div className="px-6 pt-8 pb-16 lg:px-12 lg:pt-12 lg:pb-20">
        {/* Header */}
        <div className="mb-12">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
              SychoBench Analysis Tool
            </p>
            <h1 className="mt-2 text-4xl font-bold text-gray-900 dark:text-white lg:text-5xl">
              Prompt Explorer
            </h1>
            <p className="mt-4 max-w-5xl text-lg text-gray-600 dark:text-gray-300">
              Explore individual prompts and compare how different models responded, scored, and were judged.
              Drill down into specific prompts to analyze model behavior patterns and scoring metrics.
            </p>
          </div>
        </div>

        {/* Navigation buttons - positioned above prompt selection */}
        <div className="fixed right-8 top-16 z-10 hidden xl:block">
          <div className="mb-6 flex w-80 justify-center gap-3">
            <Link
              href="/results"
              className="inline-flex w-24 items-center justify-center rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:border-gray-400 hover:text-gray-900 dark:border-neutral-700 dark:text-gray-300 dark:hover:border-neutral-500 dark:hover:text-white"
            >
              Results
            </Link>
            <Link
              href="/methodology"
              className="inline-flex w-24 items-center justify-center rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              Methods
            </Link>
          </div>
        </div>

        {/* Floating Prompt Selection Panel - positioned on right side */}
        <aside className="fixed right-8 top-32 z-10 hidden xl:block">
          <div className="w-80 rounded-2xl border border-gray-200/60 bg-white/80 p-5 shadow-xl backdrop-blur-md dark:border-neutral-700/60 dark:bg-neutral-900/80 max-h-[calc(100vh-200px)] overflow-hidden flex flex-col">
            <p className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Select a Prompt
            </p>
            
            {/* Search and Filters */}
            <div className="mt-4 space-y-3">
              <input
                type="text"
                placeholder="Search prompts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-neutral-600 rounded-lg bg-white/70 dark:bg-neutral-800/70 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              />
              
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={filterTopic}
                  onChange={(e) => setFilterTopic(e.target.value)}
                  className="px-2 py-1 text-xs border border-gray-200 dark:border-neutral-600 rounded bg-white/70 dark:bg-neutral-800/70 text-gray-900 dark:text-gray-100"
                >
                  <option value="">All Topics</option>
                  {Array.from(new Set(prompts.map(p => p.topic))).sort().map(topic => (
                    <option key={topic} value={topic}>{topic}</option>
                  ))}
                </select>
                
                <select
                  value={filterPersona}
                  onChange={(e) => setFilterPersona(e.target.value)}
                  className="px-2 py-1 text-xs border border-gray-200 dark:border-neutral-600 rounded bg-white/70 dark:bg-neutral-800/70 text-gray-900 dark:text-gray-100"
                >
                  <option value="">All Personas</option>
                  {Array.from(new Set(prompts.map(p => p.persona))).sort().map(persona => (
                    <option key={persona} value={persona}>{persona}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Prompt List */}
            <nav className="mt-4 flex-1 overflow-y-auto space-y-1 text-gray-600 dark:text-gray-300">
              {filteredPrompts.map((prompt, index) => {
                const isActive = selectedPrompt === prompt.prompt_id
                return (
                  <div key={prompt.prompt_id} className="relative">
                    {/* Timeline line */}
                    <div className={`absolute left-2 top-0 h-full w-px transition-colors duration-300 ${
                      isActive 
                        ? 'bg-blue-400 dark:bg-blue-500' 
                        : 'bg-gray-200 dark:bg-neutral-700'
                    }`} />
                    
                    {/* Timeline dot */}
                    <div className={`absolute left-1 top-3 h-2 w-2 rounded-full transition-all duration-300 ${
                      isActive
                        ? 'bg-blue-500 ring-4 ring-blue-100 dark:ring-blue-900/50 scale-125'
                        : 'bg-blue-400 ring-2 ring-white dark:ring-neutral-900'
                    }`} />
                    
                    {/* Prompt button */}
                    <button
                      onClick={() => setSelectedPrompt(prompt.prompt_id)}
                      className={`relative block w-full rounded-lg border py-2 pl-6 pr-3 text-left text-sm transition-all duration-300 ${
                        isActive
                          ? 'border-blue-200 bg-blue-50/80 text-blue-700 shadow-sm dark:border-blue-800/50 dark:bg-blue-900/30 dark:text-blue-200'
                          : 'border-transparent hover:border-blue-200 hover:bg-blue-50/50 hover:text-blue-600 dark:hover:border-blue-800/50 dark:hover:bg-blue-900/20 dark:hover:text-blue-400'
                      }`}
                    >
                      <span className={`block font-mono text-xs transition-all duration-300 ${
                        isActive ? 'font-semibold' : 'font-medium'
                      }`}>
                        {prompt.prompt_id}
                      </span>
                      <span className="block text-xs line-clamp-2 mt-1">
                        {prompt.prompt_text}
                      </span>
                      <div className="flex items-center gap-1 mt-2">
                        <span className={`text-xs px-1 py-0.5 rounded transition-colors duration-300 ${
                          isActive 
                            ? 'bg-blue-200/50 text-blue-700 dark:bg-blue-800/50 dark:text-blue-200' 
                            : 'bg-gray-200/50 text-gray-600 dark:bg-gray-700/50 dark:text-gray-400'
                        }`}>
                          {prompt.topic}
                        </span>
                        <span className={`text-xs transition-colors duration-300 ${
                          isActive 
                            ? 'text-blue-600 dark:text-blue-300' 
                            : 'text-gray-400 dark:text-gray-500'
                        }`}>
                          {prompt.response_count} responses
                        </span>
                      </div>
                    </button>
                    
                    {/* Hide timeline line for last item */}
                    {index === filteredPrompts.length - 1 && (
                      <div className="absolute left-2 top-8 h-full w-px bg-white dark:bg-neutral-900" />
                    )}
                  </div>
                )
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content Area */}
        <article className="space-y-16 xl:pr-96">
          {selectedPromptInfo ? (
            <div className="space-y-8">
              {/* Prompt Information */}
              <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-neutral-800 dark:bg-neutral-900/70">
                <h2 className="text-xl font-semibold mb-4">Prompt Details</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Prompt ID
                    </label>
                    <div className="font-mono text-blue-600 dark:text-blue-400">
                      {selectedPromptInfo.prompt_id}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Prompt Text
                    </label>
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-gray-900 dark:text-gray-100">
                      {selectedPromptInfo.prompt_text}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Topic
                      </label>
                      <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm">
                        {selectedPromptInfo.topic}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Persona
                      </label>
                      <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm">
                        {selectedPromptInfo.persona}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Stance
                      </label>
                      <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm">
                        {selectedPromptInfo.stance}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Strength
                      </label>
                      <div className="bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 px-3 py-1 rounded-full text-sm">
                        {selectedPromptInfo.strength}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Harmful:
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        selectedPromptInfo.is_harmful
                          ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                      }`}>
                        {selectedPromptInfo.is_harmful ? 'Yes' : 'No'}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Devil's Advocate:
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        selectedPromptInfo.ask_devil
                          ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                      }`}>
                        {selectedPromptInfo.ask_devil ? 'Yes' : 'No'}
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Model Responses */}
              <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-neutral-800 dark:bg-neutral-900/70">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                  Model Responses ({selectedPromptData.length})
                </h2>
                
                <div className="space-y-6">
                  {selectedPromptData.map((response, index) => (
                    <div key={index} className="rounded-xl border border-gray-200 bg-white/70 p-6 dark:border-neutral-700 dark:bg-neutral-950/50">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {response.model}
                        </h3>
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                          response.scores.pred_label === 'CHALLENGE'
                            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200'
                            : response.scores.pred_label === 'ENDORSE'
                            ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                        }`}>
                          {response.scores.pred_label}
                        </div>
                      </div>
                      
                      <div className="rounded-lg bg-gray-50 p-4 mb-4 dark:bg-neutral-900/50">
                        <div className="text-gray-900 dark:text-gray-100 whitespace-pre-wrap text-sm leading-relaxed">
                          {response.response}
                        </div>
                      </div>
                      
                      {/* Scores */}
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {Object.entries(response.scores).map(([key, value]) => {
                          if (key === 'pred_label') return null
                          return (
                            <div key={key} className="rounded bg-gray-100 p-3 dark:bg-neutral-800">
                              <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                                {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                              </div>
                              <div className="font-mono text-sm text-gray-900 dark:text-gray-100">
                                {typeof value === 'number' ? value.toFixed(2) : value}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          ) : (
            <section className="rounded-2xl border border-gray-200 bg-white p-12 shadow-sm dark:border-neutral-800 dark:bg-neutral-900/70 text-center">
              <div className="text-gray-500 dark:text-gray-400 text-lg">
                Select a prompt from the left panel to view detailed analysis
              </div>
            </section>
          )}
        </article>
      </div>
    </main>
  )
}
