import React, { useState, useCallback } from 'react'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { board } from './board'

export default function BoardPage() {
  const [boardData, setBoardData] = useState(board)

  const moveTask = useCallback(
    (fromProcessIdx, toProcessIdx, fromTaskIdx, toTaskIdx) => {
      console.log(fromProcessIdx, toProcessIdx, fromTaskIdx, toTaskIdx)

      setBoardData((prevBoardData) => {
        const newBoardData = [...prevBoardData]
        const task = newBoardData[fromProcessIdx].tasks.splice(
          fromTaskIdx,
          1
        )[0]
        newBoardData[toProcessIdx].tasks.splice(toTaskIdx, 0, task)
        return newBoardData
      })
    },
    []
  )

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='w-full h-screen flex flex-row bg-white'>
        <div className='sticky w-10 h-[75%] mb-10 bg-white z-20'></div>
        <div className='flex flex-row gap-4 min-w-max px-15'>
          {boardData.map((process, processIdx) => (
            <Process
              key={processIdx}
              process={process}
              processIdx={processIdx}
              moveTask={moveTask}
            />
          ))}
        </div>
        <div className='sticky right-3 w-10 h-[75%] mb-10 bg-white z-20'></div>
      </div>
    </DndProvider>
  )
}

const Task = ({ task, index, processIdx, moveTask }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { id: task.code, index, processIdx },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  })

  const [, drop] = useDrop({
    accept: 'TASK',
    hover: (item, monitor) => {
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
      ref={(node) => drag(drop(node))}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className='w-[calc(100%-7px)] bg-white shadow mb-1'
    >
      <div className='flex flex-col items-center justify-center'>
        <div className='w-10 min-h-10 bg-gray-200'></div>
        <div className='flex flex-col justify-center items-center p-2'>
          <span className='text-sm'>{task.title}</span>
          <div className='flex w-full items-center justify-between pt-1'>
            <div className='flex items-center'>
              <i
                className='fa-solid fa-square-check'
                style={{ color: '#74C0FC' }}
              />
              <span className='text-sm p-2'>{task.code}</span>
            </div>
            <div className='flex items-center'>
              <i
                className='fa-solid fa-equals px-3'
                style={{ color: '#e3a316' }}
              />
              <span className='text-sm py-1 px-2 rounded-full bg-green-700 text-white'>
                {task.assignee}
              </span>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

const Process = ({ process, processIdx, moveTask }) => {
  const [, drop] = useDrop({
    accept: 'TASK',
    drop: (item, monitor) => {
      console.log('drop item ', item)

      moveTask(item.processIdx, processIdx, item.index, process.tasks.length)
    }
  })

  return (
    <ul
      ref={drop}
      className='flex flex-col items-center w-64 bg-[#F7F8F9] shadow-lg rounded-sm'
    >
      <span className='sticky top-0 w-64 text-sm text-[#626f86] font-medium p-3 bg-[#F7F8F9] border-b border-b-gray-300 z-10'>
        {process.title_process}
      </span>
      {process.tasks.map((task, index) => {
        return task ? (
          <Task
            key={task.code}
            task={task}
            index={index}
            processIdx={processIdx}
            moveTask={moveTask}
          />
        ) : null
      })}
    </ul>
  )
}
