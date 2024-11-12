import React from 'react'
import TaskComponent from '../components/TaskComponent'

const TasksPage = () => {
  return (
    <div className='w-full min-h-screen bg-zinc-950 flex flex-col gap-10 items-center justify-start pt-40 pb-10 tracking-widest'>

        <h1 className='text-white'>Following Are Your Tasks</h1>

        <div className='w-full h-full flex flex-wrap items-center justify-center gap-10'>
            <TaskComponent />
        </div>
        
    </div>
  )
}

export default TasksPage