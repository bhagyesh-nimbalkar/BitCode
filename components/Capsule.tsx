import React from 'react'

type CapsuleType = {
    title:string,
    color?:string,
    icon?:React.ReactNode,
}
const Capsule = ({title,color='white',icon}:CapsuleType) => {
  return (
    <div className='py-1 px-4 bg-white/5 rounded-full text-center'>
           <h1 className={`text-xs flex flex-center gap-1 ${color}`} style={{
              color,
           }}><span>{icon}</span>{title}</h1>
    </div>
  )
}

export default Capsule
