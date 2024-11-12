import { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";
import { FaLongArrowAltLeft } from "react-icons/fa";
import Bot_Model from '../components/Bot_Model';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const SignupPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(prevState => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(prevState => !prevState);
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/auth/signup', data);
      localStorage.setItem('authToken', response.data.authToken);
      navigate("/profile");
    } catch (error) {
      console.error('Signup Error:', error.response?.data || error.message);
    }
  };

  return (
    <div className="w-full h-screen bg-zinc-300 flex">
      <div className="w-1/2 h-screen flex flex-col justify-center bg-zinc-950">
        <div className="w-full flex flex-col items-center justify-center text-white">
          <h1 className="nav-heading text-zinc-100 text-[3vw] font-semibold">AUTH TASK</h1>
          <h1 className="nav-heading text-green-500 text-[2vw]">New User</h1>
        </div>

        <form className="relative w-full mt-10 flex flex-col items-center gap-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-2">
            <input className="w-[11vw] rounded-lg bg-zinc-800 outline-none text-white p-3" {...register('firstName', { required: true })} placeholder="Enter First Name" />
            <input className="w-[11vw] rounded-lg bg-zinc-800 outline-none text-white p-3" {...register('lastName', { required: true })} placeholder="Enter Last Name" />
          </div>
          <input className="w-[22.5vw] rounded-lg bg-zinc-800 outline-none text-white p-3" {...register('email', { required: true })} placeholder="Enter Your E-mail" />
          <input
            className="relative w-[22.5vw] rounded-lg bg-zinc-800 outline-none text-white p-3"
            {...register('password', { required: true })}
            type={passwordVisible ? "text" : "password"}
            placeholder="Enter password"
          />
          <input
            className="relative w-[22.5vw] rounded-lg bg-zinc-800 outline-none text-white p-3"
            {...register('confirmPassword', { required: true })}
            type={confirmPasswordVisible ? "text" : "password"}
            placeholder="Confirm password"
          />
          <div className="absolute top-[8.3vw] right-[15vw] cursor-pointer text-white" onClick={togglePasswordVisibility}>
            {passwordVisible ? <IoEyeSharp className="text-xl text-white" /> : <IoEyeOffSharp className="text-xl text-white" />}
          </div>
          <div className="absolute top-[12vw] right-[15vw] cursor-pointer text-white" onClick={toggleConfirmPasswordVisibility}>
            {confirmPasswordVisible ? <IoEyeSharp className="text-xl text-white" /> : <IoEyeOffSharp className="text-xl text-white" />}
          </div>
          <input className="w-[23vw] bg-purple-600 font-semibold rounded-lg text-white text-lg px-8 py-2 mt-2 cursor-pointer" type="submit" value="Register" />
        </form>

        <NavLink to="/login" className="w-full flex justify-center pt-5">
          <div className="px-28 py-2 rounded-lg bg-yellow-600 text-white cursor-pointer">
            <h1>Already With Us?</h1>
          </div>
        </NavLink>
      </div>

      <div className="w-1/2 h-screen bg-zinc-800">
        <Canvas style={{ height: '100%', width: '100%' }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <directionalLight position={[10, 10, 10]} intensity={1} />
          <Bot_Model />
          <OrbitControls />
        </Canvas>
      </div>

      <NavLink to="/" className="w-fit absolute top-8 left-8 text-white cursor-pointer flex items-center gap-2 text-sm">
        <FaLongArrowAltLeft />
        <h1>Back to HomePage</h1>
      </NavLink>
    </div>
  );
};

export default SignupPage;