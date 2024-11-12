import React from 'react'
import Footer from '../components/Footer'

const LandingPage = () => {
    return (
        <div className='relative w-full h-screen bg-black'>
            <div className='absolute top-0 left-0 -z-1 w-full h-screen'>
                <video className='w-full h-full object-cover brightness-50' src="../../auth_video.mp4" autoPlay loop muted></video>
            </div>

            <div className='absolute top-0 left-0 -z-1 w-full h-screen bg-black opacity-80'></div>

            <div className='absolute z-0 w-full h-full flex justify-center items-center px-24'>

                <div>
                    <h1 className='text-white text-[18vw] font-extrabold leading-none'>Welcome</h1>
                    <h1 className='text-white text-[3vw] ml-[60vw] leading-none tracking-widest'>To Auth Task</h1>
                </div>


            </div>

            <Footer />


        </div>
    )
}

export default LandingPage