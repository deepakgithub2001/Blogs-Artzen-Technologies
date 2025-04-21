import React from 'react'
import NavBar from './NavBar'
import image from '../assets/Deepak.jpg'
import Footer from './Footer'

function About({ para = "Our Blog App is a dynamic platform for sharing ideas, stories, and insights. It offers a seamless experience for writers and readers alike, fostering creativity and engagement. With user-friendly features and diverse content, we empower voices to inspire, inform, and connect the world through meaningful conversations." }) {
  return (
    <>
      <NavBar />
      <div className='flex flex-col md:flex-row justify-around items-center h-auto md:h-[81vh] mx-5 md:mx-20 gap-10 text-xl text-justify font-serif mt-5'>
        <img className='rounded-lg max-w-xs md:max-w-sm' src={image} alt="About Us Image" />
        <h1 className='p-5 rounded leading-relaxed max-w-prose'>{para}</h1>
      </div>
      <Footer />
    </>
  )
}

export default About;