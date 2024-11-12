import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDash = () => {
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [active, setActive] = useState('viewUsers');
    const [inputName, setInputName] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showTaskAssign, setShowTaskAssign] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

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

        const fetchUsers = async () => {
            const config = {
                headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
            };
            try {
                const { data } = await axios.get('http://localhost:3000/api/v1/auth/users', config);
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUser();
        fetchUsers();
    }, []);

    const handleSetActive = (view) => {
        setActive(view);
    };

    const handleInputChange = (event) => {
        setInputName(event.target.value);
        handleSearch(event.target.value);
    };

    const handleSearch = (searchInput) => {
        const input = searchInput.trim().toLowerCase();
        if (input === '') {
            setSearchResults([]);
        } else {
            const filteredUsers = users.filter(user =>
                `${user.firstName} ${user.lastName}`.toLowerCase().includes(input)
            );
            setSearchResults(filteredUsers);
        }
    };

    const handleAssignTaskClick = (user) => {
        setSelectedUser(user);
        setShowTaskAssign(true);
    };

    const handleBackToSearchResults = () => {
        setShowTaskAssign(false);
    };


    return (
        <div className='w-full h-screen bg-zinc-950 flex flex-col items-center justify-start pt-32'>
            <h1 className='text-zinc-900 font-bold text-[3vw] leading-none'>Welcome, {user?.firstName} {user?.lastName}</h1>

            <div className='flex justify-center gap-10 text-white mt-10'>
                <h1 className={`hover:text-blue-600 cursor-pointer ${active === 'viewUsers' ? 'text-blue-600' : ''}`} onClick={() => handleSetActive('viewUsers')}>View Users</h1>
                <h1 className={`hover:text-blue-600 cursor-pointer ${active === 'assignTasks' ? 'text-blue-600' : ''}`} onClick={() => handleSetActive('assignTasks')}>Assign Tasks</h1>
                <h1 className={`hover:text-blue-600 cursor-pointer ${active === 'viewTasks' ? 'text-blue-600' : ''}`} onClick={() => handleSetActive('viewTasks')}>View Tasks</h1>
            </div>

            {active === 'viewUsers' && (
                <div className="text-white mt-10 w-[90vw] h-[60vh] border border-white rounded-lg flex flex-col items-center pt-5 overflow-auto">
                    <div className='w-full flex justify-between items-center px-10'>
                        <h1 className="w-1/5 text-center">S.No.</h1>
                        <h1 className="w-1/5 text-center">Profile Picture</h1>
                        <h1 className="w-1/5 text-center">Name</h1>
                        <h1 className="w-1/5 text-center">Email</h1>
                        <h1 className="w-1/5 text-center">Status</h1>
                    </div>
                    {users.map((user, index) => (
                        <div key={user._id} className='w-full flex justify-between items-center px-10 py-4 border-t border-t-white'>
                            <h2 className="w-1/5 text-center">{index + 1}</h2>
                            <img src={user.profilePic} alt="Profile" className="w-12 h-12 rounded-full mx-auto object-cover object-center" />
                            <h2 className="w-1/5 text-center">{user.firstName} {user.lastName}</h2>
                            <h2 className="w-1/5 text-center">{user.email}</h2>
                            <h1 className="w-1/5 text-center">Not Active</h1>
                        </div>
                    ))}
                </div>
            )}

            {active === 'assignTasks' && (
                !showTaskAssign ? (
                    <div className="content text-white mt-10 w-[90vw] h-[60vh] border border-white rounded-xl flex flex-col items-center justify-start pt-5">
                        <div className='flex gap-5'>
                            <input type="text" placeholder='Enter Name Of Individual' className='w-[30vw] h-[5vh] bg-transparent border border-zinc-800 rounded-md text-white px-3' value={inputName} onChange={handleInputChange} />
                        </div>
                        <div className="mt-4 text-white text-lg flex flex-col gap-6">
                            {searchResults.map(user => (
                                <div key={user._id} className='flex justify-between gap-2 items-center'>
                                    <img src={user.profilePic} alt="Profile" className="w-12 h-12 rounded-full mx-auto object-cover object-center" />
                                    <p>{user.firstName} {user.lastName}</p>
                                    <button className='w-[10vw] h-[5vh] bg-blue-600 text-white rounded-md' onClick={() => handleAssignTaskClick(user)}>Assign Task</button>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="task-assignment-view text-white mt-10 w-[90vw] h-[60vh] border border-white rounded-xl flex flex-col gap-4 items-center justify-start pt-12">
                        <h2>Task Assignment for {selectedUser?.firstName} {selectedUser?.lastName}</h2>
                        <input type="text" placeholder='Enter Task Title' className='w-[30vw] h-[5vh] bg-transparent border border-zinc-800 rounded-md text-white px-3' />
                        <textarea placeholder='Enter Task Description' className='w-[30vw] h-[20vh] resize-none bg-transparent border border-zinc-800 rounded-md text-white px-3 py-2' />
                        <div className='flex justify-center gap-4'>
                            <button className='w-[10vw] h-[5vh] bg-red-600 text-white rounded-md' onClick={handleBackToSearchResults}>Go Back</button>
                            <button className='w-[10vw] h-[5vh] bg-blue-600 text-white rounded-md'>Assign</button>
                        </div>
                    </div>
                )
            )}

            {active === 'viewTasks' && (
                <div className="content text-white mt-10 w-[90vw] h-[60vh] border border-white rounded-xl flex justify-center pt-5">
                    {/* Content for viewing tasks */}
                    <p>Here you can view tasks.</p>
                </div>
            )}
        </div>
    )
}

export default AdminDash;