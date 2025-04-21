import React from 'react'
import image from '../assets/image.png'

function Hero() {
    return (
        <div className='px-4 py-8'>
            <div className='flex flex-col-reverse md:flex-row items-center justify-center gap-6'>
                {/* Image Section */}
                <div className='w-full md:w-1/2 flex justify-center'>
                    <img
                        className='h-60 sm:h-72 md:h-[400px] lg:h-[500px] object-contain'
                        src={image}
                        alt="hero"
                    />
                </div>
                {/* Text Section */}

                <div className='w-full md:w-1/2 text-center md:text-left'>
                    <h1 className='text-3xl sm:text-4xl md:text-5xl text-slate-900 font-serif leading-snug'>
                        Write and Share your own stories on{" "}
                        <span className='bg-amber-500 text-white rounded px-2 py-1'>
                            WRITE!
                        </span>
                    </h1>
                </div>
            </div>
        </div>
    )
}

export default Hero;
