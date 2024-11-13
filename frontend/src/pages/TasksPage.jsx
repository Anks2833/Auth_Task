import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskComponent from '../components/TaskComponent';

const TasksPage = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
      const fetchTasks = async () => {
          const config = {
              headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
          };
          try {
              const { data } = await axios.get('http://localhost:3000/api/v1/auth/my-tasks', config);
              setTasks(data);
          } catch (error) {
              console.error('Error fetching tasks:', error);
          }
      };
  
      fetchTasks();
  }, []);

    return (
        <div className='w-full min-h-screen bg-zinc-950 flex flex-col gap-10 items-center justify-start pt-40 pb-10 tracking-widest'>
            <h1 className='text-white'>Following Are Your Tasks</h1>
            <div className='w-full h-full flex flex-wrap items-center justify-center gap-10'>
                {tasks.map(task => (
                    <TaskComponent key={task._id} task={task} />
                ))}
            </div>
        </div>
    );
};

export default TasksPage;