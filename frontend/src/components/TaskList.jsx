import { useState } from 'react'
import { CheckCircle2, Circle, Timer, ChevronDown, ChevronUp, Zap } from 'lucide-react'
import FocusTimer from './FocusTimer'

const difficultyConfig = {
  easy: { label: 'Easy', color: 'text-green-400 bg-green-400/10 border-green-400/20' },
  medium: { label: 'Medium', color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20' },
  hard: { label: 'Hard', color: 'text-red-400 bg-red-400/10 border-red-400/20' },
}

function TaskCard({ task, index, completed, onToggle }) {
  const [expanded, setExpanded] = useState(index === 0)
  const [timerOpen, setTimerOpen] = useState(false)
  const diff = difficultyConfig[task.difficulty] || difficultyConfig.easy

  return (
    <>
      {timerOpen && (
        <FocusTimer
          duration={task.duration}
          taskTitle={task.title}
          onClose={() => setTimerOpen(false)}
        />
      )}

      <div
        className={`border rounded-xl transition-all duration-300 animate-slide-up
          ${completed
            ? 'bg-slate-800/30 border-slate-700/30 opacity-60'
            : 'bg-slate-800/60 border-slate-700/50 hover:border-indigo-500/40'
          }`}
        style={{ animationDelay: `${index * 60}ms` }}
      >
        {/* Card Header */}
        <div className="flex items-start gap-3 p-4">
          {/* Checkbox */}
          <button
            onClick={() => onToggle(task.id)}
            className="mt-0.5 flex-shrink-0 cursor-pointer transition-transform hover:scale-110"
          >
            {completed
              ? <CheckCircle2 size={22} className="text-green-400" />
              : <Circle size={22} className="text-slate-500 hover:text-indigo-400 transition-colors" />
            }
          </button>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-slate-500 font-mono">#{task.id}</span>
              <h3 className={`font-semibold text-sm ${completed ? 'line-through text-slate-500' : 'text-slate-100'}`}>
                {task.title}
              </h3>
            </div>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className={`text-xs px-2 py-0.5 rounded-full border ${diff.color}`}>
                {diff.label}
              </span>
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <Timer size={11} />
                {task.duration} min
              </span>
            </div>
          </div>

          {/* Expand toggle */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-slate-500 hover:text-slate-300 cursor-pointer flex-shrink-0 mt-0.5 transition-colors"
          >
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>

        {/* Expanded content */}
        {expanded && (
          <div className="px-4 pb-4 pt-0 border-t border-slate-700/30 mt-0">
            <p className="text-slate-400 text-sm mt-3 leading-relaxed">{task.description}</p>
            {!completed && (
              <button
                onClick={() => setTimerOpen(true)}
                className="mt-3 flex items-center gap-2 text-xs text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 px-3 py-1.5 rounded-lg transition-all cursor-pointer"
              >
                <Timer size={13} />
                Start {task.duration}min Focus Timer
              </button>
            )}
          </div>
        )}

        {/* Motivational note */}
        {task.motivational_note && (
          <div className="mx-4 mb-4 px-3 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-lg flex items-start gap-2">
            <Zap size={14} className="text-indigo-400 flex-shrink-0 mt-0.5" />
            <p className="text-indigo-300 text-xs leading-relaxed">{task.motivational_note}</p>
          </div>
        )}
      </div>
    </>
  )
}

export default function TaskList({ tasks, encouragement, estimatedTime }) {
  const [completed, setCompleted] = useState(new Set())

  const toggleTask = (id) => {
    setCompleted((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const completedCount = completed.size
  const totalCount = tasks.length
  const progressPercent = (completedCount / totalCount) * 100

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Encouragement banner */}
      <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-xl p-4">
        <p className="text-indigo-200 text-sm leading-relaxed">✨ {encouragement}</p>
        <p className="text-slate-400 text-xs mt-1">Estimated total: ~{estimatedTime} minutes</p>
      </div>

      {/* Progress bar */}
      <div>
        <div className="flex justify-between text-xs text-slate-400 mb-2">
          <span>{completedCount} of {totalCount} tasks done</span>
          <span>{Math.round(progressPercent)}%</span>
        </div>
        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        {completedCount === totalCount && totalCount > 0 && (
          <p className="text-green-400 text-sm text-center mt-3 font-semibold animate-bounce-in">
            🎉 You crushed it! Every single task done!
          </p>
        )}
      </div>

      {/* Task cards */}
      <div className="space-y-3">
        {tasks.map((task, index) => (
          <TaskCard
            key={task.id}
            task={task}
            index={index}
            completed={completed.has(task.id)}
            onToggle={toggleTask}
          />
        ))}
      </div>
    </div>
  )
}
