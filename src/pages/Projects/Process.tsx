import { useDrop } from 'react-dnd'
import Task from './Task'
import { useRef } from 'react'

interface TaskProps {
  code: string
  title: string
  assignee: string
}

interface ProcessProps {
  process: {
    title_process: string
    tasks: TaskProps[]
  }
  processIdx: number
  moveTask: (
    fromProcessIdx: number,
    toProcessIdx: number,
    fromTaskIdx: number,
    toTaskIdx: number
  ) => void
}

const Process = ({ process, processIdx, moveTask }: ProcessProps) => {
  const ref = useRef<HTMLUListElement>(null)
  const [, drop] = useDrop({
    accept: 'TASK',
    drop: (item: { processIdx: number; index: number }, monitor) => {
      moveTask(item.processIdx, processIdx, item.index, process.tasks.length)
    }
  })
  drop(ref)
  return (
    <ul
      ref={ref}
      className='flex flex-col items-center w-64 bg-[#F7F8F9] shadow-lg rounded-sm'
    >
      <li className='sticky top-0 w-64 text-xs text-[#626f86] font-medium p-3 bg-[#F7F8F9] border-b border-b-gray-300 z-1'>
        {process.title_process}
      </li>
      {process.tasks.map((task, index) =>
        task ? (
          <Task
            key={task.code}
            task={task}
            index={index}
            processIdx={processIdx}
            moveTask={moveTask}
          />
        ) : null
      )}
    </ul>
  )
}

export default Process
