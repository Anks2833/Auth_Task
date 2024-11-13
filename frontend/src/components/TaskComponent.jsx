import React from 'react';

const TaskComponent = ({ task }) => {
    return (
        <div className='w-[30vw] h-[30vh] bg-black border-2 border-zinc-600 rounded-lg text-white py-3 px-6 overflow-auto'>
            <h1 className='font-semibold tracking-tight'>{task.taskName}</h1>
            <p className='font-extralight'>{task.taskDetails}</p>
        </div>
    );
};

export default TaskComponent;