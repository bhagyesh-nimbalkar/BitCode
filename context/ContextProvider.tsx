'use client';
import React, { createContext, useState } from 'react'

type CurrentProbProps = {
    source_code:string;
    language_id:number;
}
type ContextProps = {
    prob:CurrentProbProps,
    setProb:React.Dispatch<React.SetStateAction<CurrentProbProps>>;
}
const initialState:CurrentProbProps = {source_code:"#include <bits/stdc++.h>\nusing namespace std;\n\n\nint main(){\n\n}",language_id:105};
const initialContext:ContextProps = {prob:initialState,setProb:()=>{}};
export const ProbContext = createContext<ContextProps>(initialContext);
const ContextProvider = ({children}:{children:React.ReactNode}) => {
  const [prob,setProb] = useState<CurrentProbProps>(initialState);
  const value = {prob,setProb};
  return (
    <ProbContext.Provider value={value}>
        {children}
    </ProbContext.Provider>
  )
}

export default ContextProvider;
