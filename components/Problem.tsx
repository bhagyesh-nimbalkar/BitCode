'use client';

import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@radix-ui/react-tabs'; 
import { History, NotebookText, SquareCheck, Terminal } from 'lucide-react';
import ProblemDesc from './ProblemDesc';
import TestResult from './TestResult';
import TestCase from './TestCase';
import { useProbById } from '@/lib/api/QueriesandMurations';
import Loader from './Loader';


export default function App({id}:{id:string}) {
  const {data:problems,isPending:loading} = useProbById(id);
  const [activeTab, setActiveTab] = useState("description");
  
  if(loading) return <div className='w-full h-[100vh] bg-zinc-800'><Loader width={30} height={30}/></div>
  if(!problems) return <h1>Something went wrong!</h1>
  const problem = Object.assign(problems);
  return (
    <div className="w-full h-[100vh] overflow-scroll">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full  bg-white/5  flex gap-3 px-5 py-1 relative">
        <div className='flex-center gap-2 py-1 px-3 hover:bg-white/10 rounded-lg'>
         <NotebookText className='size-5 text-sky-700'/>
          <TabsTrigger
            value="description"
            className={`text-white text-sm ${
              activeTab === "description" ? "opacity-100" : "opacity-40"
            }`}
          >
            Description
          </TabsTrigger>
       </div>
       <div className='flex-center gap-2 py-1 px-3 hover:bg-white/10 rounded-lg'>
        <History className='size-5 text-sky-700'/>
          <TabsTrigger
            value="submissions"
            className={`text-white text-sm ${
              activeTab === "submissions" ? "opacity-100" : "opacity-40"
            }`}
          >
            Submissions
          </TabsTrigger>
        </div>
        <div className='flex-center gap-2 py-1 px-3 hover:bg-white/10 rounded-lg'>
        <SquareCheck className='size-5 text-green-500'/>
          <TabsTrigger
            value="testcase"
            className={`text-white text-sm ${
              activeTab === "testcase" ? "opacity-100" : "opacity-40"
            }`}
          >
            Testcase
          </TabsTrigger>
       </div>
       <div className='flex-center gap-2 py-1 px-3 hover:bg-white/10 rounded-lg'>
         <Terminal className='size-5 text-green-500'/>
          <TabsTrigger
            value="testresult"
            className={`text-white text-sm ${
              activeTab === "testresult" ? "opacity-100" : "opacity-40"
            }`}
          >
            TestResult
          </TabsTrigger>
       </div>
        </TabsList>
        <TabsContent value="description" className='-full h-full'>
           <ProblemDesc problem={problem}/>
        </TabsContent>
        <TabsContent value="submissions">
          {/* Content for Submissions */}
        </TabsContent>
        <TabsContent value="testcase">
           <TestCase/>
        </TabsContent>
         <TabsContent value="testresult">
           <TestResult/>
        </TabsContent>
      </Tabs>
    </div>
  );
}
