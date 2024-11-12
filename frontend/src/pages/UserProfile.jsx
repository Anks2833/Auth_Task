import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { FaArrowRightFromBracket } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';

const UserProfile = () => {
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
        <div className='w-full h-screen bg-zinc-950 flex flex-col items-center justify-start pt-40 tracking-widest'>
            <h1 className='text-zinc-800 font-bold text-[18vw] leading-none'>Welcome</h1>
            {user && <h1 className='text-zinc-800 font-bold text-[4vw] text-left leading-none'>User-{user.firstName} {user.lastName}</h1>}

            <NavLink to='/profile/tasks' className='w-fit cursor-pointer absolute bottom-4 text-white flex items-center justify-center gap-1'>
              <h1>View Your Tasks</h1>
              <FaArrowRightFromBracket />
            </NavLink>
        </div>
    );
};

export default UserProfile;