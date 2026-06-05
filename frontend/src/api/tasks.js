import axios from 'axios'

const API_BASE = 'http://localhost:8000/api'

export const breakdownTask = async ({ task, mood, available_time }) => {
  const response = await axios.post(`${API_BASE}/breakdown`, {
    task,
    mood,
    available_time,
  })
  return response.data
}
