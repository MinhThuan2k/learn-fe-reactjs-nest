import { useMemo } from 'react'
import {
  ClipboardList,
  CalendarCheck,
  Briefcase,
  CheckSquare,
  PieChart,
  LayoutDashboard,
  ChartNoAxesCombined
} from 'lucide-react'

const icons = [
  ClipboardList,
  CalendarCheck,
  Briefcase,
  CheckSquare,
  PieChart,
  LayoutDashboard,
  ChartNoAxesCombined
]
const colors = [
  'text-indigo-400/20',
  'text-emerald-400/20',
  'text-yellow-400/20',
  'text-pink-400/20'
]
const sizes = [40, 48, 56, 64]

const boxContents = [
  {
    title: '📌 Design Sprint',
    desc: '10:00 AM - 11:30 AM'
  },
  {
    title: '✅ Code Review',
    desc: 'In Progress'
  },
  {
    title: '📦 Update project board',
    desc: '🛠️ Code review: John'
  },
  {
    title: '🗓️ Meeting at 10AM',
    desc: '✅ Finish UI Design'
  },
  {
    title: '📌 Team Standup',
    desc: '🚀 Deploy App'
  },
  {
    title: '🔔 Push notification',
    desc: '📊 Prepare monthly report'
  }
]

// Avoid center area: top 35%-65%, left 30%-70%
const getRandomPosition = () => {
  let top = Math.floor(Math.random() * 90)
  let left = Math.floor(Math.random() * 90)

  while (top > 35 && top < 65 && left > 30 && left < 70) {
    top = Math.floor(Math.random() * 90)
    left = Math.floor(Math.random() * 90)
  }

  return { top: `${top}%`, left: `${left}%` }
}

const RandomDecorations = () => {
  const iconItems = useMemo(() => {
    return Array.from({ length: 6 }).map((_, id) => {
      const Component = icons[Math.floor(Math.random() * icons.length)]
      const color = colors[Math.floor(Math.random() * colors.length)]
      const size = sizes[Math.floor(Math.random() * sizes.length)]
      const position = getRandomPosition()
      const delay = Math.floor(Math.random() * 1000)

      return (
        <div
          key={`icon-${id}`}
          className={`absolute animate-float-slow ${color} pointer-events-none`}
          style={{
            top: position.top,
            left: position.left,
            animationDelay: `${delay}ms`
          }}
        >
          <Component style={{ width: `${size}px`, height: `${size}px` }} />
        </div>
      )
    })
  }, [])

  const boxItems = useMemo(() => {
    return boxContents.map((item, idx) => {
      const position = getRandomPosition()
      const delay = Math.floor(Math.random() * 500)
      const rotate = [-3, -2, 2, 3][Math.floor(Math.random() * 4)]

      return (
        <div
          key={`box-${idx}`}
          className={`absolute hidden md:block animate-fade-in-up pointer-events-none`}
          style={{
            top: position.top,
            left: position.left,
            transform: `rotate(${rotate}deg) scale(0.95)`,
            animationDelay: `${delay}ms`
          }}
        >
          <div className='rounded-xl bg-white/40 backdrop-blur-lg p-4 shadow-md text-xs text-muted w-44'>
            <p>{item.title}</p>
            <p>{item.desc}</p>
          </div>
        </div>
      )
    })
  }, [])

  return (
    <>
      {iconItems}
      {boxItems}
    </>
  )
}

export default RandomDecorations
