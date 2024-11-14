'use client';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableCaption
  } from "@/components/ui/table"
import { CircleAlert, CircleCheckBig } from "lucide-react"
import Footer from "./Footer"
import { useAllProb } from "@/lib/api/QueriesandMurations";
import Loader from "./Loader";
import Link from "next/link";
  
  export function ProblemTable() {
    const {data:problems,isPending:loading} = useAllProb();
    if(loading) return <div className='w-full h-[100vh] bg-zinc-800'><Loader width={30} height={30}/></div>
    if(!problems || !Array.isArray(problems)) return <h1>No Data Found!</h1>
    console.log(problems);
    // const problems:TableType[] = [
    //     {status:"attempted",title:"Two Sum",difficulty:"Easy"},
    //     {status:"accepted",title:"Add Two Numbers",difficulty:"Medium"},
    //     {status:"attempted",title:"Two Sum",difficulty:"Easy"},
    //     {status:"accepted",title:"Add Two Numbers",difficulty:"Hard"},
    //     {status:"attempted",title:"Two Sum",difficulty:"Easy"},
    //     {status:"accepted",title:"Add Two Numbers",difficulty:"Medium"},
    //     {status:"attempted",title:"Two Sum",difficulty:"Easy"},
    //     {status:"accepted",title:"Add Two Numbers",difficulty:"Medium"},
    // ]
    return (
      <Table className="mt-20">
        <TableCaption><Footer/></TableCaption>
        <TableHeader>
          <TableRow className="border-b-[0.5px] border-b-zinc-600 hover:bg-black/0">
            <TableHead className="w-[100px] text-zinc-400">Status</TableHead>
            <TableHead className='w-[70%] text-zinc-400'>Title</TableHead>
            <TableHead className="text-right text-zinc-400">Difficulty</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
        {problems && problems.map((e,index)=>{
            return (
            <TableRow key={index} className="border-0 even:bg-zinc-800 hover:even:bg-zinc-800 hover:bg-black/0">
             <TableCell className="font-medium text-white">{e.status==="accepted"?<CircleCheckBig className="text-green-500 size-5"/>:<CircleAlert className="text-yellow-500 size-5"/>}</TableCell>
             <TableCell className="text-white hover:text-blue-400 cursor-pointer"><Link href={`/problems/${e.id}`}>{e.title}</Link></TableCell>
             <TableCell className={`text-right text-white ${e.difficulty==="Easy"?'text-green-500':(e.difficulty==="Medium"?'text-yellow-500':'text-red-500')}`}>{e.difficulty}</TableCell>
           </TableRow>
           )
            })
        }
        </TableBody>
      </Table>
    )
  }
  