import Loader from '@/components/Loader';
import React from 'react'

const Loading = () => {
  return (
    <div className='w-full h-[100vh] flex-center bg-black/90'>
          <Loader width={30} height={30}/> 
    </div>
  )
}

export default Loading;
