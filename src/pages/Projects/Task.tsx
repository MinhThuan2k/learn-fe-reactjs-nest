import clsx from 'clsx'
import { forwardRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'

interface Task {
  code: string
  title: string
  assignee: string
}
interface TaskProps {
  task: Task
  index: number
  processIdx: number
  moveTask: (
    fromProcessIdx: number,
    toProcessIdx: number,
    fromTaskIdx: number,
    toTaskIdx: number
  ) => void // Hàm di chuyển task
}

const Task = forwardRef<HTMLLIElement, TaskProps>(
  ({ task, index, processIdx, moveTask }: TaskProps, ref) => {
    const [{ isDragging }, drag] = useDrag({
      type: 'TASK',
      item: { id: task.code, index, processIdx },
      collect: (monitor) => ({
        isDragging: monitor.isDragging()
      })
    })

    const [, drop] = useDrop({
      accept: 'TASK',
      hover: (item: { index: number; processIdx: number }, monitor) => {
        if (item.index === index && item.processIdx === processIdx) {
          return
        }
        moveTask(item.processIdx, processIdx, item.index, index)
        item.index = index
        item.processIdx = processIdx
      }
    })

    return (
      <li
        ref={(node) => {
          drag(drop(node))
          if (ref) {
            typeof ref === 'function' ? ref(node) : (ref.current = node)
          }
        }}
        className={clsx('w-[calc(100%-7px)] bg-white shadow mb-1', {
          'opacity-50': isDragging
        })}
      >
        <div className='flex flex-col items-center justify-center'>
          <div className='w-10 min-h-10 bg-gray-200'></div>
          <div className='flex flex-col justify-center items-center p-2'>
            <span className='text-sm'>{task.title}</span>
            <div className='flex w-full items-center justify-between pt-1'>
              <div className='flex items-center'>
                <i className='fa-solid fa-square-check text-[#74C0FC]' />
                <span className='text-sm p-2'>{task.code}</span>
              </div>
              <div className='flex items-center text-sm'>
                <i className='fa-solid fa-equals px-3 text-[#e3a316]' />
                <a className='w-6 h-6 p-1 rounded-full bg-green-600 text-white text-center text-[10px] font-semibold cursor-pointer'>
                  {task.assignee}
                </a>
              </div>
            </div>
          </div>
        </div>
      </li>
    )
  }
)

export default Task
