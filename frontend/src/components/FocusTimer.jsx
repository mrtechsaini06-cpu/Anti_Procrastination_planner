import { useState, useEffect, useRef } from 'react'
import { Play, Pause, RotateCcw, X } from 'lucide-react'

const RADIUS = 45
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export default function FocusTimer({ duration, taskTitle, onClose }) {
  const totalSeconds = duration * 60
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((s) => {
          if (s <= 1) {
            clearInterval(intervalRef.current)
            setRunning(false)
            return 0
          }
          return s - 1
        })
      }, 1000)
    } else {
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
  }, [running])

  const progress = secondsLeft / totalSeconds
  const strokeDashoffset = CIRCUMFERENCE * (1 - progress)

  const minutes = Math.floor(secondsLeft / 60)
  const seconds = secondsLeft % 60

  const reset = () => {
    setRunning(false)
    setSecondsLeft(totalSeconds)
  }

  const isFinished = secondsLeft === 0

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 w-80 text-center shadow-2xl animate-bounce-in">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-slate-300 text-sm font-medium">Focus Timer</h3>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <p className="text-slate-400 text-xs mb-6 truncate px-2">{taskTitle}</p>

        {/* SVG Ring */}
        <div className="flex justify-center mb-6">
          <svg width="120" height="120" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50" cy="50" r={RADIUS}
              fill="none"
              stroke="#1e293b"
              strokeWidth="8"
            />
            {/* Progress circle */}
            <circle
              cx="50" cy="50" r={RADIUS}
              fill="none"
              stroke={isFinished ? '#22c55e' : '#6366f1'}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={strokeDashoffset}
              transform="rotate(-90 50 50)"
              style={{ transition: 'stroke-dashoffset 1s linear' }}
            />
            {/* Time text */}
            <text x="50" y="46" textAnchor="middle" fill="#e2e8f0" fontSize="16" fontWeight="700">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </text>
            <text x="50" y="60" textAnchor="middle" fill="#94a3b8" fontSize="8">
              {isFinished ? 'Done!' : 'remaining'}
            </text>
          </svg>
        </div>

        {isFinished ? (
          <p className="text-green-400 font-semibold mb-4 animate-bounce-in">
            🎉 Great work! Task complete!
          </p>
        ) : null}

        {/* Controls */}
        <div className="flex justify-center gap-3">
          <button
            onClick={reset}
            className="p-3 bg-slate-700 hover:bg-slate-600 rounded-xl transition-colors cursor-pointer"
            title="Reset"
          >
            <RotateCcw size={18} className="text-slate-300" />
          </button>
          <button
            onClick={() => setRunning(!running)}
            disabled={isFinished}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 rounded-xl font-semibold text-white transition-colors cursor-pointer disabled:cursor-not-allowed"
          >
            {running ? <Pause size={18} /> : <Play size={18} />}
            {running ? 'Pause' : 'Start'}
          </button>
        </div>
      </div>
    </div>
  )
}
