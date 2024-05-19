import Image from 'next/image';
import React from 'react';

import cat1 from '../../../public/GIF_character/Cat1.gif';
import castle from '../../../public/photo/castle.png';

const page = () => {
  return (
    <div>
      <div>
        <Image
          src={cat1}
          alt='cat1'
          className='justify-right z-10 relative'
          width={300}
          height={300}
        />
      </div>
      <div className='flex items-center justify-center'>
        <div
          className='
                fixed
                top-0
                left-0
                w-full
                h-screen'
        >
          <Image src={castle} layout={'fill'} objectFit={'cover'} alt='' />
        </div>
      </div>
    </div>
  );
};

export default page;
