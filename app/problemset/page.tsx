import Nav from '@/components/Nav';
import { ProblemTable } from '@/components/ProblemTable';
import React from 'react'

const ProblemSet = async () => {
  return (
    <div className='w-full h-dvh flex flex-col gap-[200px ] relative bg-black/90'>
     <div className='w-full'>
      <Nav/>
     </div>
      <div className='w-full flex-center  justify-self-end'>
        <div className='w-[60%] flex-center h-full'>
            <ProblemTable/>
        </div>
      </div>
    </div>
  )
}

export default ProblemSet;
