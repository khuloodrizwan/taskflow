export const formatDate = (dateString) => {
  const options = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }
  return new Date(dateString).toLocaleDateString('en-US', options)
}

export const formatDateShort = (dateString) => {
  const options = { 
    month: 'short', 
    day: 'numeric'
  }
  return new Date(dateString).toLocaleDateString('en-US', options)
}

export const getWeekDates = () => {
  const today = new Date()
  const dayOfWeek = today.getDay()
  const diff = today.getDate() - dayOfWeek
  const sunday = new Date(today.setDate(diff))
  
  const weekDates = []
  for (let i = 0; i < 7; i++) {
    const date = new Date(sunday)
    date.setDate(sunday.getDate() + i)
    weekDates.push(date.toISOString().split('T')[0])
  }
  
  return weekDates
}