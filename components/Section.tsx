'use client'
import EditorPage from "@/components/EditorPage"
import Problem from "@/components/Problem"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import Image from "next/image"
import LeetImage from '@/public/images.png';
import { CloudUpload, Play } from "lucide-react";
import { useProbById, useProbSub, useSubResult } from "@/lib/api/QueriesandMurations"
import {useContext, useState} from "react";
import { ProbContext } from "@/context/ContextProvider"
import { Question, Submission } from "./Types/types"
import Loader from "./Loader"
const Section = ({slug}:{slug:string}) => {
  const {prob} = useContext(ProbContext);
  const {data:pid} = useProbById(slug.toString());
  const {mutateAsync:SubmitCode,isPending:loading} = useProbSub();
  const {mutateAsync:SubmitResult,isPending:resloading} = useSubResult();
  const [load,setLoad] = useState(false);
  if(!pid) return <h1>Something went wrong!</h1>
  const problem:Question = Object.assign(pid);
  const handleSubmit = async ()=>{
       const str = problem.testcases.length.toString() + "\n" + problem.testcases.join('').toString();
       const output = problem.expected_output.join('').toString();
       const sub:Submission = {
          source_code:prob.source_code,
          language_id:prob.language_id,
          stdin:str,
          expected_output:output,
       }
       try {
           const res = await SubmitCode(sub);
           if(res && res.error){
            alert(`Error Occurred: ${res.error}`);
            return;
           }
           if(res.token){
              setLoad(true);
              setTimeout(async()=>{
                setLoad(false);
                const obj:{token:string} = JSON.parse(res.token);
                try{
                  const submission = await SubmitResult(obj.token);
                  console.log(submission);
                }
                catch(error){
                  console.log(error);
                }
              },2000);
              
            }
       } catch (error) {
          console.log(error);
       }
  }
  return (
    <div className="w-full h-[100vh] bg-black/85 overflow-scroll">
    <div className="max-h-14 bg-black flex items-center justify-center px-5 w-full relative py-1">
       <Image className="absolute left-5" src={LeetImage} alt="Biticon" width={20} height={20}/>
       <div className="h-full py-1 flex-center gap-[1.5px]">
           <button className="bg-white/20 py-1 px-5 text-white rounded-l-md flex-center gap-2 hover:bg-white/30"><Play fill="white" className="text-white size-4"/>Run</button>
           <button onClick={handleSubmit} className="bg-white/20 py-1 px-5 text-green-500 rounded-r-md flex-center gap-2  hover:bg-white/30">{loading || resloading || load?<Loader width={20} height={20}/>:<CloudUpload className="text-green-500 size-5" />}{load?"Pending":"Submit"}</button>
       </div>
    </div>
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-[200px] rounded-lg border w-full"
    >
      <ResizablePanel defaultSize={50}>
         <Problem id={slug}/>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
         <EditorPage/>
      </ResizablePanel>
    </ResizablePanelGroup>
   </div>
  )
}

export default Section;
