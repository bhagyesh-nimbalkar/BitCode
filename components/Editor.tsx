'use client';
import Editor from '@monaco-editor/react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import { useContext, useState } from "react"
import { ProbContext } from '@/context/ContextProvider'
  
  type SelectType = {
      language:string,
      defaulttemplate:string,
      code:string,
      language_code:number;
  }
const Edito = () => {
  const lang:SelectType[] = [
    {language:"C++",defaulttemplate:"#include <bits/stdc++.h>\nusing namespace std;\n\n\nint main(){\n\n}",code:"cpp",language_code:105},
    {language:"Java",defaulttemplate:"import java.io.*;\nimport java.util.*;\n\npublic class Main {\npublic static void main(String[] args){\n\n    }\n}",code:"java",language_code:62},
    {language:"Python",defaulttemplate:'import sys\ninput = sys.stdin.read\n\n\nif __name__ == "__main__":',code:"python",language_code:100}
];
  const [val,setVal] = useState(lang[0].language);
  const langinfo:SelectType | undefined = lang.find((e)=>e.language===val);
  const {prob,setProb} = useContext(ProbContext);
  return (
    <div className='w-full h-full'>
        <div className="border-b-[1px] py-1 flex flex-col gap-1">
            <Select value={val} onValueChange={(v)=>{
                setVal(v);
                const findVal = lang.find((e)=>e.language===v);
                if(!findVal) return;
                setProb({...prob,language_id:findVal.language_code,source_code:findVal.defaulttemplate});
            }}>
            <SelectTrigger className="w-[100px] bg-white/0 text-white border-transparent outline-none ring-0 hover:bg-white/10">
                <SelectValue placeholder="Select a Language" />
            </SelectTrigger>
            <SelectContent className=" text-white border-none text-sm z-30 bg-zinc-700">
                <SelectGroup>
                {lang.map((ele,index)=>{
                    return <SelectItem key={index} value={ele.language}>{ele.language}</SelectItem>
                })}
                </SelectGroup>
            </SelectContent>
            </Select>
           <Editor onChange={(e)=>{
            if(!e) return;
            setProb({...prob,source_code:e})
           }}  className="w-full" height="100vh"  theme="vs-dark"  value={langinfo && langinfo.defaulttemplate.toString()} language={langinfo && langinfo.code.toString()}/>
        </div>
    </div>
  )
}

export default Edito;
