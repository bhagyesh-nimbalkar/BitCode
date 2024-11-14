import React from 'react'

type LoaderType = {
    width?:number,
    height?:number,
    color?:string,
}
const Loader = ({width,height,color}:LoaderType) => {
  return (
    <div className='w-full h-full flex-center'>
          <div style={{
             width,
             height,
             borderColor:color,
          }} className='w-8 h-8 border-b-4 border-t-4 border-l-4 border-r-4 border-r-transparent border-white rounded-full animate-spin'>
              
          </div>
    </div>
  )
}

export default Loader
