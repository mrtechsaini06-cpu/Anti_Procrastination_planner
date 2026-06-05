import { useState } from 'react'
import Header from './components/Header'
import TaskInput from './components/TaskInput'
import TaskList from './components/TaskList'
import { breakdownTask } from './api/tasks'
import { RefreshCw, AlertCircle } from 'lucide-react'

export default function App() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handleSubmit = async (formData) => {
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const data = await breakdownTask(formData)
      setResult(data)
    } catch (err) {
      const msg = err?.response?.data?.detail || 'Something went wrong. Make sure the backend is running.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setResult(null)
    setError(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-[#0f0f1a] to-slate-900">
      {/* Glow effect */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-xl mx-auto px-4 py-10">
        <Header />

        {/* Main card */}
        <div className="bg-slate-900/80 border border-slate-700/50 rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
          {!result ? (
            <TaskInput onSubmit={handleSubmit} loading={loading} />
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-slate-200 font-semibold">Your Action Plan</h2>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg transition-all cursor-pointer"
                >
                  <RefreshCw size={13} />
                  New Task
                </button>
              </div>
              <TaskList
                tasks={result.tasks}
                encouragement={result.encouragement}
                estimatedTime={result.estimated_total_time}
              />
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mt-4 flex items-start gap-2 bg-red-500/10 border border-red-500/30 rounded-xl p-3">
              <AlertCircle size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}
        </div>

        <p className="text-center text-slate-600 text-xs mt-6">
          Powered by Gemini AI · Built for overthinkers everywhere
        </p>
      </div>
    </div>
  )
}
