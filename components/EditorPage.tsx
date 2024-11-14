'use client';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs'; 
import { CodeXml} from 'lucide-react';
import Edito from './Editor';

const EditorPage = () => {
  const [activeTab, setActiveTab] = useState("description");
  return (
    <div className="w-full h-[100vh] overflow-scroll">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full  bg-white/5  flex gap-3 py-1 px-5 relative">
        <div className='flex-center gap-2 px-3 hover:bg-white/10 py-1 rounded-lg'>
          <CodeXml className='size-5 text-green-500'/>
          <TabsTrigger
            value="description"
            className={`text-white text-sm ${
              activeTab === "description" ? "opacity-100" : "opacity-40"
            }`}
          >
            Code
          </TabsTrigger>
        </div>
        </TabsList>
        <TabsContent value="description" className='w-full h-full'>
             <Edito/>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default EditorPage;
