import React, { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";
import { FaLongArrowAltLeft } from "react-icons/fa";

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(prevState => !prevState);
  };

  const onSubmit = async (data) => {
    const loginData = {
      email: data.email,
      password: data.password
    };

    try {
      const response = await axios.post('http://localhost:3000/api/v1/auth/login', loginData);
      console.log('Login Success:', response.data);
      localStorage.setItem('authToken', response.data.authToken);
      if (response.data.role === 'admin') {
        navigate('/admindashboard');
      } else {
        navigate('/profile');
      }
    } catch (error) {
      console.error('Login Error:', error.response?.data || error.message);
    }
  };

  return (
    <div className="w-full h-screen bg-zinc-300 flex">
      <div className="w-1/2 h-screen flex flex-col justify-center bg-zinc-950">
        <div className="w-full flex flex-col items-center justify-center text-white">
          <h1 className="nav-heading text-zinc-100 text-[3vw] font-semibold">AUTH TASK</h1>
          <h1 className="nav-heading text-green-500 text-[2vw]">User Login</h1>
        </div>

        <form className="relative w-full mt-10 flex flex-col items-center gap-2" onSubmit={handleSubmit(onSubmit)}>
          <input
            className="w-[23vw] rounded-lg bg-zinc-800 outline-none text-white p-3"
            {...register('email', { required: true })}
            type="email"
            placeholder="Enter your email"
          />
          <input
            className="relative w-[23vw] rounded-lg bg-zinc-800 outline-none text-white p-3"
            {...register('password', { required: true })}
            type={passwordVisible ? "text" : "password"}
            placeholder="Enter password"
          />
          <div className="absolute top-[4.65vw] right-[15vw] cursor-pointer text-white" onClick={togglePasswordVisibility}>
            {passwordVisible ? <IoEyeSharp className="text-xl text-white" /> : <IoEyeOffSharp className="text-xl text-white" />}
          </div>
          <input className="w-[23vw] bg-purple-600 font-semibold rounded-lg text-white text-lg px-8 py-2 mt-2 cursor-pointer" type="submit" value="Log In" />
        </form>

        <NavLink to="/signup" className="w-full flex justify-center pt-5">
          <div className="px-28 py-2 rounded-lg bg-yellow-600 text-white cursor-pointer">
            <h1>Create An Account</h1>
          </div>
        </NavLink>
      </div>

      <div className="w-1/2 h-screen bg-[url('../../bus.jpg')] bg-cover bg-center bg-no-repeat"></div>

      <NavLink to="/" className="w-fit absolute top-8 left-8 text-white cursor-pointer flex items-center gap-2 text-sm">
        <FaLongArrowAltLeft />
        <h1>Back to HomePage</h1>
      </NavLink>
    </div>
  );
};

export default LoginPage;