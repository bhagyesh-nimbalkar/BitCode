import React from 'react'
import { Textarea } from "@/components/ui/textarea"



const TestCase = () => {
  return (
    <div className='w-full h-full p-3'>
        <Textarea placeholder="TestCases" className='bg-zinc-900/30 border-none w-full text-white' rows={10}/>
    </div>
  )
}

export default TestCase;
