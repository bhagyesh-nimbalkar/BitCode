import { CircleAlert, CircleCheckBig, Lightbulb, Tag } from 'lucide-react';
import React from 'react'
import Capsule from './Capsule';
import { AccordionDemo } from './Accordian';
import { Question } from './Types/types';
//import { createQuestion } from '@/lib/api/api';

const ProblemDesc = ({problem}:{problem:Question}) => {
  // const problem:Question = {
  //    title:"1. Two Sum",
  //    status:"",
  //    difficulty:"Easy",
  //    testcases:['4 9\n2 7 11 15\n','3 6\n3 2 4\n','5 10\n1 2 3 4 6\n','6 15\n5 7 1 3 9 6\n'],
  //    expected_output:['0 1\n','1 2\n','3 4\n','1 5\n'],
  //    description:"Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.",
  //    examples:[{input:"nums = [2,7,11,15], target = 9",output:"[0,1]"},{input:"nums = [3,2,4], target = 6",output:"[1,2]"},{input:"nums = [3,3], target = 6",output:"[0,1]"}],
  //    input_format:['The first line of input will contain a single integer T', 'denoting the number of test cases. The description of the test cases follows.','The first line of the test case contains two space-separated integers — N T','The second line contains N space-separated integers — A1,A2,…,ANA1​,A2​,…,AN​'],
  //    output_format:['For each test case, output two comma seperated values of indexes'],
  //    constraints:["2 <= nums.length <= 104","-109 <= nums[i] <= 109","-109 <= target <= 109","Only one valid answer exists.",'Each test case consists of two lines of input.'],
  //    topics:["Array","Hash Table"],
  //    hints:["A really brute force way would be to search for all possible pairs of numbers but that would be too slow. Again, it's best to try out brute force solutions for just for completeness. It is from these brute force solutions that you can come up with optimizations."
  //       ,"So, if we fix one of the numbers, say x, we have to scan the entire array to find the next number y which is value - x where value is the input parameter. Can we change our array somehow so that this search becomes faster?",
  //       "The second train of thought is, without changing the array, can we use additional space somehow? Like maybe a hash map to speed up the search?"
  //    ],
  // }
  return (
    <div className='p-3 w-full h-full overflow-y-scroll'>
        <div className='w-full h-full flex flex-col gap-10'>
          <div className='w-full h-full flex flex-col gap-5'>
              <div className='w-full flex items-center justify-between'>
                      <h1 className='bold-heading text-2xl'>{problem.title}</h1>
                      <div>{problem.status==='accepted'?<span className='text-zinc-400 text-sm flex-center gap-2'>Solved <CircleCheckBig className="text-green-500 size-4"/></span>:(problem.status==='attempted'?<span className='text-zinc-400 text-sm  flex-center gap-2'>Attempted <CircleAlert className="text-yellow-500 size-4"/></span>:"")}</div>
              </div>
              <div className='flex gap-2'>
                  <Capsule title={problem.difficulty} color="text-green-500"/>
                  {problem.topics?<Capsule title="Topics" icon={<Tag className='size-4'/>}/>:""}
                  {problem.hints?<Capsule title="Hints" icon={<Lightbulb className='size-4'/>}/>:""}
              </div>
              <div className='text-wrap text-left text-white text-base'>
                  {problem.description}
              </div>
          </div>
          <div className='flex flex-col gap-4'>
             {problem.examples.map((ele,index)=>{
                return (
                    <div key={index} className='flex flex-col gap-4'>
                         <h1 className='text-white font-semibold'>Example {index+1}:</h1>
                         <div className='px-3 w-full flex flex-col gap-2 border-l-2 border-l-stone-600'>
                             <h1 className='text-white'><span className='font-semibold '>Input: </span>{ele.input}</h1>
                             <h1 className='text-white'><span className='font-semibold '>Output: </span>{ele.output}</h1>
                         </div>
                    </div>
                )
             })}
          </div>
          <div className='flex flex-col gap-2'>
          <h1 className='text-white font-semibold'>Input Format:</h1>
          <ul className='px-5' style={{
              listStyleType:'disc',
              lineHeight:2
          }}>
             {problem.input_format.map((ele,index)=>{
                return (
                   <li key={index} className='text-white'>{ele}</li>
                )
             })}
           </ul>
          </div>
          <div className='flex flex-col gap-2'>
          <h1 className='text-white font-semibold'>Output Format:</h1>
          <ul className='px-5' style={{
              listStyleType:'disc',
              lineHeight:2
          }}>
             {problem.output_format.map((ele,index)=>{
                return (
                   <li key={index} className='text-white'>{ele}</li>
                )
             })}
           </ul>
          </div>
          <div className='flex flex-col gap-2'>
          <h1 className='text-white font-semibold'>Constraints:</h1>
          <ul className='px-5' style={{
              listStyleType:'disc',
              lineHeight:2
          }}>
             {problem.constraints.map((ele,index)=>{
                return (
                   <li key={index} className='text-white'>{ele}</li>
                )
             })}
           </ul>
          </div>
        <div className='flex flex-col'>
          <div className='flex flex-col gap-2'>
              <AccordionDemo title="Topics"  items={problem.topics} icon={<Tag className="size-4 text-white absolute translate-y-5 -translate-x-2"/>}/>
          </div>
          <div className='flex flex-col gap-2'>
            {problem.hints?(
                problem.hints.map((ele,index)=>{
                    return (
                        <AccordionDemo key={index} title={`Hint ${index+1}`} hint={ele} icon={<Lightbulb className="size-4 text-white absolute translate-y-5 -translate-x-2"/>}/>
                    )
                })
            ):<></>}
          </div>
        </div>
        </div>
    </div>
  )
}

export default ProblemDesc;
