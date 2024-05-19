import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <div>
        <div>
            <img src='./GIF_character/Cat1.gif' className='justify-right' width={300} height={300}></img>
        </div>
        <div className='flex items-center justify-center'>
            <div className='
                fixed
                top-0
                left-0
                w-full
                h-screen
                z-[-1]'>
                    <Image src={`/photo/castle.png`} layout={'fill'} objectFit={'cover'} alt=''/>
            </div>
        </div>

    </div>
  )
}

export default page