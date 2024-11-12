import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const AdminDashboard = () => {

  const [user, setUser] = useState(null);

  useEffect(() => {
      const fetchUser = async () => {
          const config = {
              headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
          };
          try {
              const { data } = await axios.get('http://localhost:3000/api/v1/auth/profile', config);
              setUser(data);
          } catch (error) {
              console.error('Error fetching user profile:', error);
          }
      };

      fetchUser();
  }, []);

  return (
    <div className='w-full h-screen bg-zinc-950 flex flex-col items-center justify-start pt-40 leading-none tracking-widest'>

      <h1 className='text-zinc-900 font-bold text-[18vw] leading-none'>Welcome</h1>
      <h1 className='text-zinc-900 font-bold text-[3vw] leading-none'>Admin-{user?.firstName} {user?.lastName}</h1>

      <NavLink to='/admindashboard/admin' className='absolute bottom-5 text-zinc-100 text-xs font-bold cursor-pointer'>Click here to continue</NavLink>

    </div>
  )
}

export default AdminDashboard;