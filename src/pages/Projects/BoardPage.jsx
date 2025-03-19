import React, { useState, useCallback } from 'react'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { board } from './board'
import MultiSelectDropdown from '@/components/dropdown/MultiSelectDropdown'
import { CircleUser } from 'lucide-react'
import clsx from 'clsx'
import { useOutsideClick } from '@/hooks/hooks'

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
    <div className='flex overflow-hidden px-10 max-lg:px-5'>
      <div className='flex-1 flex flex-col overflow-hidden bg-white'>
        <Head />
        <div className='flex-1 flex overflow-auto bg-white'>
          <DndProvider backend={HTML5Backend}>
            <div className='w-full h-screen flex flex-row bg-white'>
              <div className='sticky w-10 h-[75%] mb-10 bg-white z-20'></div>
              <div className='flex flex-row gap-4 min-w-max'>
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
        </div>
      </div>
    </div>
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
            <div className='flex items-center text-sm'>
              <i
                className='fa-solid fa-equals px-3'
                style={{ color: '#e3a316' }}
              />
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

const Process = ({ process, processIdx, moveTask }) => {
  const [, drop] = useDrop({
    accept: 'TASK',
    drop: (item, monitor) => {
      moveTask(item.processIdx, processIdx, item.index, process.tasks.length)
    }
  })

  return (
    <ul
      ref={drop}
      className='flex flex-col items-center w-64 bg-[#F7F8F9] shadow-lg rounded-sm'
    >
      <span className='sticky top-0 w-64 text-xs text-[#626f86] font-medium p-3 bg-[#F7F8F9] border-b border-b-gray-300 z-1'>
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

const Head = () => {
  const COUNTRIES = [
    { name: 'Austria', code: 'AU' },
    { name: 'Belgium', code: 'BL' },
    { name: 'Croatia', code: 'CR' },
    { name: 'Bulgaria', code: 'BG' },
    { name: 'Cyprus', code: 'CY' }
  ]
  const [label, setLabel] = useState()
  const [isOpenFilter, setIsOpenFilter] = useState(false)
  const dropdownRef = useOutsideClick(() => setIsOpenFilter(false))

  return (
    <div className='w-full h-40 flex flex-col justify-center'>
      <div className='flex gap-2 text-sm font-normal text-[#6B778C] max-md:text-xs'>
        <a href='#'>Project</a>
        <i>/</i>
        <a href='#'>VTH-WMS</a>
      </div>
      <div className='w-full flex items-center justify-between float-right max-sm:flex-col max-sm:items-start'>
        <span className='text-2xl font-medium max-md:text-xl'>
          VTH Sprint 1
        </span>
        <div className='flex items-center justify-center gap-3 text-sm text-[#42526E] font-semibold max-sm:ml-auto max-sm:justify-between'>
          <div className='pr-5 border-r border-r-gray-300'>
            <span className='text-xs'>
              <i className='fa-regular fa-clock px-1'></i> 3 days
            </span>
          </div>
          <i className='fa-solid fa-bolt cursor-pointer'></i>
          <i className='fa-regular fa-star cursor-pointer'></i>
          <i className='fa-solid fa-share-nodes cursor-pointer'></i>
          <button className='cursor-pointer py-1 px-2 bg-gray-200'>
            Start stand-up
          </button>
          <button className='cursor-pointer py-1 px-2 bg-gray-200'>
            Complete sprint
          </button>
        </div>
      </div>
      <div className='flex items-center justify-between py-5'>
        <div className='flex gap-3'>
          <div className='flex-1 relative text-[#6B778C] '>
            <input
              type='text'
              placeholder='Search'
              className='w-full min-w-28 border border-[#6B778C] rounded-xs pl-8 p-1 text-sm focus:outline-none focus:border-blue-700 transition-all duration-200'
            />
            <i className='fa-solid fa-magnifying-glass absolute left-2 top-1/2 transform -translate-y-1/2 text-xs text-[#6B778C]'></i>
          </div>

          <div className='flex font-semibold text-xs'>
            <a className='w-7 h-7 rounded-full text-center cursor-pointer'>
              <CircleUser
                color='#ffffff'
                className='bg-gray-500 rounded-full w-full h-full'
              />
            </a>
            <a className='w-7 h-7 -ml-1.5 p-1.5 rounded-full bg-green-600 text-white text-center cursor-pointer max-md:hidden'>
              TL
            </a>
            <a className='w-7 h-7 -ml-1.5 p-1.5 rounded-full bg-blue-600 text-white text-center cursor-pointer max-md:hidden'>
              TL
            </a>
            <a className='w-7 h-7 -ml-1.5 p-1.5 rounded-full bg-yellow-600 text-white text-center cursor-pointer max-md:hidden'>
              TL
            </a>
            <a className='-ml-1.5 p-1.5 rounded-full bg-gray-200 text-[#42526E] text-center cursor-pointer'>
              +10
            </a>
          </div>
          <div ref={dropdownRef}>
            <button
              className='lg:hidden cursor-pointer text-white text-sm px-2 py-1 bg-gray-400 rounded-xs whitespace-nowrap'
              onClick={() => setIsOpenFilter(!isOpenFilter)}
            >
              More +
            </button>
            <div
              className={clsx(
                'relative flex flex-row text-sm items-start justify-between gap-2 text-[#42526E] transition-all duration-300 z-10',
                'lg:flex',
                isOpenFilter
                  ? 'max-lg:flex max-lg:flex-col max-lg:absolute max-lg:bg-white max-lg:shadow-lg max-lg:rounded-md'
                  : 'max-lg:hidden'
              )}
            >
              <MultiSelectDropdown
                fieldValue={'code'}
                fieldTitle={'name'}
                options={COUNTRIES}
                title={'Label'}
                onChange={setLabel}
              />

              <MultiSelectDropdown
                fieldValue={'code'}
                fieldTitle={'name'}
                options={COUNTRIES}
                title={'Type'}
                onChange={setLabel}
              />
              <MultiSelectDropdown
                fieldValue={'code'}
                fieldTitle={'name'}
                options={COUNTRIES}
                title={'Custom filter'}
                onChange={setLabel}
              />
            </div>
          </div>
        </div>
        <div className='flex items-center justify-center gap-2 ml-1 mr-0 text-sm text-[#42526E] font-semibold'>
          <label className='text-[10px] text-[#999ea7] font-medium max-sm:hidden'>
            GROUP BY
          </label>
          <div className='bg-gray-200'>
            <MultiSelectDropdown
              fieldValue={'code'}
              fieldTitle={'name'}
              options={COUNTRIES}
              title={'None'}
              onChange={setLabel}
            />
          </div>
          <div className='bg-gray-200'>
            <MultiSelectDropdown
              fieldValue={'code'}
              fieldTitle={'name'}
              options={COUNTRIES}
              title={'Insights'}
              onChange={setLabel}
              icon={<i className='fa-solid fa-chart-line pr-1 py-1 order-1' />}
              styleTitle='max-xl:hidden order-2'
            />
          </div>
          <div className='bg-gray-200'>
            <MultiSelectDropdown
              fieldValue={'code'}
              fieldTitle={'name'}
              options={COUNTRIES}
              title={'View settings'}
              onChange={setLabel}
              icon={<i className='fa-solid fa-sliders pr-1 py-1 order-1' />}
              styleTitle='max-xl:hidden order-2'
            />
          </div>
        </div>
      </div>
    </div>
  )
}
