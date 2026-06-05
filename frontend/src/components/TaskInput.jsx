import { useState } from 'react'
import { Sparkles, Clock, Smile } from 'lucide-react'

const moods = [
  { value: 'motivated', label: '💪 Motivated', color: 'bg-green-500/20 border-green-500/50 text-green-300' },
  { value: 'neutral', label: '😐 Neutral', color: 'bg-blue-500/20 border-blue-500/50 text-blue-300' },
  { value: 'tired', label: '😴 Tired', color: 'bg-yellow-500/20 border-yellow-500/50 text-yellow-300' },
  { value: 'anxious', label: '😰 Anxious', color: 'bg-red-500/20 border-red-500/50 text-red-300' },
]

const timeOptions = [15, 30, 45, 60, 90, 120]

export default function TaskInput({ onSubmit, loading }) {
  const [task, setTask] = useState('')
  const [mood, setMood] = useState('neutral')
  const [availableTime, setAvailableTime] = useState(60)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!task.trim()) return
    onSubmit({ task, mood, available_time: availableTime })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      {/* Task Input */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          What's the task you've been putting off?
        </label>
        <textarea
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="e.g. Build a login page for my project, Study for Data Structures exam, Write my resume..."
          className="w-full bg-slate-800/60 border border-slate-600/50 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none transition-all duration-200"
          rows={3}
          required
        />
      </div>

      {/* Mood Selector */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-3">
          <Smile size={16} />
          How are you feeling right now?
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {moods.map((m) => (
            <button
              key={m.value}
              type="button"
              onClick={() => setMood(m.value)}
              className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all duration-200 cursor-pointer
                ${mood === m.value
                  ? m.color + ' scale-105 shadow-lg'
                  : 'bg-slate-800/40 border-slate-600/30 text-slate-400 hover:border-slate-500'
                }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Time Available */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-3">
          <Clock size={16} />
          How much time do you have?
        </label>
        <div className="flex flex-wrap gap-2">
          {timeOptions.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setAvailableTime(t)}
              className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all duration-200 cursor-pointer
                ${availableTime === t
                  ? 'bg-indigo-600/30 border-indigo-500 text-indigo-300 scale-105'
                  : 'bg-slate-800/40 border-slate-600/30 text-slate-400 hover:border-slate-500'
                }`}
            >
              {t >= 60 ? `${t / 60}h` : `${t}m`}
            </button>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading || !task.trim()}
        className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-indigo-500/25 disabled:cursor-not-allowed cursor-pointer"
      >
        {loading ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Breaking it down...
          </>
        ) : (
          <>
            <Sparkles size={18} />
            Break It Down
          </>
        )}
      </button>
    </form>
  )
}
