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

const ProblemPage = async ({params}:{params:Promise<{slug:string}>}) => {
  const slug = (await params).slug;
  return(
   <div className="w-full h-[100vh] bg-black/85 overflow-scroll">
    <div className="max-h-14 bg-black flex items-center justify-center px-5 w-full relative py-1">
       <Image className="absolute left-5" src={LeetImage} alt="Biticon" width={20} height={20}/>
       <div className="h-full py-1 flex-center gap-[1.5px]">
           <button className="bg-white/20 py-1 px-5 text-white rounded-l-md flex-center gap-2 hover:bg-white/30"><Play fill="white" className="text-white size-4"/>Run</button>
           <button className="bg-white/20 py-1 px-5 text-green-500 rounded-r-md flex-center gap-2  hover:bg-white/30"><CloudUpload className="text-green-500 size-5"/>Submit</button>
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

export default ProblemPage
