import { Brain } from 'lucide-react'

export default function Header() {
  return (
    <header className="text-center mb-8">
      <div className="flex items-center justify-center gap-3 mb-3">
        <div className="w-10 h-10 bg-indigo-600/30 border border-indigo-500/50 rounded-xl flex items-center justify-center">
          <Brain size={22} className="text-indigo-400" />
        </div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          Anti-Procrastination Planner
        </h1>
      </div>
      <p className="text-slate-400 text-sm max-w-md mx-auto">
        Dump your big scary task. Get tiny, easy steps. Stop overthinking. Start doing.
      </p>
    </header>
  )
}
