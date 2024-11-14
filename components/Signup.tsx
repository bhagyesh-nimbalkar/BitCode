"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Eye, EyeClosed } from "lucide-react"
import { useState } from "react"
import { useCreateUser } from "@/lib/api/QueriesandMurations"
import Loader from "./Loader"

const formSchema = z.object({
  email: z.string().email({
    message:"Invalid Email"
  }),
  password:z.string().min(8,{
     message:"Password must be at least 8 characters."
  }),
  confirmpassword:z.string().min(8,{
    message:"Password must be at least 8 characters."
 })
}).refine((data)=>data.password===data.confirmpassword,{
    message:"Password Should Match",
    path:["confirmpassword"]
})


export  function Signup() {
  const [eye,Seteye] = useState(true);
  const [eye2,Seteye2] = useState(true);
  const {mutateAsync:createUser,isPending:loading} = useCreateUser();
  const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          email: "",
          password:"",
          confirmpassword:"",
        },
  })
  async function onSubmit(values: z.infer<typeof formSchema>) {  
      const {email,password} = values;
     try {
      const res = await createUser({email,password});
      if(res.error) alert(res.error);
      else alert(res.success);
     } catch (error) {
         console.log(error);
     }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="min-w-[300px]">
              <FormControl>
                <Input placeholder="Email" {...field} className="transition-all duration-300 ease-in-out focus-visible:ring-0 rounded-none hover:border hover:border-1 hover:border-black focus-visible:outline-orange-100 focus-visible:border-black focus-visible:outline-offset-0 focus-visible:transition-all"/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="min-w-[300px] relative">
              <FormControl>
                <Input type={eye?"password":"text"} placeholder="Password" {...field} className="transition-all duration-300 ease-in-out focus-visible:ring-0 rounded-none hover:border hover:border-1 hover:border-black focus-visible:shadow-md focus-visible:outline-orange-100 focus-visible:border-black focus-visible:outline-offset-0 focus-visible:transition-all"/>
              </FormControl>
              {eye?<EyeClosed className="absolute right-2 top-1 size-4 z-10 cursor-pointer" onClick={()=>Seteye(!eye)}/>
              :<Eye className="absolute right-2 top-1 size-4 z-10 cursor-pointer" onClick={()=>Seteye(!eye)}/>}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmpassword"
          render={({ field }) => (
            <FormItem className="min-w-[300px] relative">
              <FormControl>
                <Input type={eye2?"password":"text"} placeholder="Confirm Password" {...field} className="transition-all duration-300 ease-in-out focus-visible:ring-0 rounded-none hover:border hover:border-1 hover:border-black focus-visible:shadow-md focus-visible:outline-orange-100 focus-visible:border-black focus-visible:outline-offset-0 focus-visible:transition-all"/>
              </FormControl>
              {eye2?<EyeClosed className="absolute right-2 top-1 size-4 z-20 cursor-pointer" onClick={()=>Seteye2(!eye2)}/>
              :<Eye className="absolute right-2 top-1 size-4 z-20 cursor-pointer" onClick={()=>Seteye2(!eye2)}/>}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="flex-center transitiona-all duration-200 w-full bg-gradient-to-r from-slate-600 to-slate-500 antialiased text-md hover:from-slate-500 hover:to-slate-700">
          <div className="flex-center gap-3 ">
          {loading && <Loader width={20} height={20}/>} 
          <h1 className="w-full">Sign Up</h1>
          </div>
        </Button>
        <div className="flex justify-end items-center">
           <Link href="/login"><span className={`text-slate-600 text-base flex-center}`}>Sign In</span></Link>
        </div>
      </form>
    </Form>
  )
}
