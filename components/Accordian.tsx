import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import Capsule from "./Capsule"

  type TopicsType= {
     title:string,
     items?:string[],
     hint?:string,
     icon?:React.ReactNode,
  }
  
  export function AccordionDemo({title,items,hint,icon}:TopicsType) {
    return (
    <div className="w-full flex items-center">
      <Accordion type="single" collapsible className="w-full relative px-1">
        {icon}
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-white no-underline px-5" >{title}</AccordionTrigger>
          <AccordionContent className="text-white flex gap-1">
             {items && items.map((ele,index)=>{
                 return <Capsule key={index} title={ele}/>
             })}
             {hint && <p className="px-3">{hint}</p>}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
    )
  }
  