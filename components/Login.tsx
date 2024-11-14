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
import { useLoginUser} from "@/lib/api/QueriesandMurations"
import Loader from "./Loader"
import { useRouter } from "next/navigation"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"

const formSchema = z.object({
  email: z.string().email({
    message:"Invalid Email"
  }),
  password:z.string().min(8,{
     message:"Password must be at least 8 characters."
  }),
})

export function Login() {
  const router = useRouter();
  const [eye,Seteye] = useState(true);
  const {mutateAsync:loginUser,isPending:loading} = useLoginUser();
  const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          email: "",
          password:"",
        },
  })
  async function onSubmit(values: z.infer<typeof formSchema>) {
       const {email,password} = values;
       try {
        const res = await loginUser({email,password});
        if(res.error) alert(res.error);
        else router.push(DEFAULT_LOGIN_REDIRECT);
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
        <Button type="submit" className="flex-center transitiona-all duration-200 w-full bg-gradient-to-r from-slate-600 to-slate-500 antialiased text-md hover:from-slate-500 hover:to-slate-700">
          <div className="flex-center gap-3 ">
          {loading && <Loader width={20} height={20}/>} 
          <h1 className="w-full">Sign In</h1>
          </div>
        </Button>
        <div className="flex justify-between items-center">
           <Link href="#"><span className='text-slate-600 text-base'>Forgot Password?</span></Link>
           <Link href="/signup"><span className='text-slate-600 text-base'>Sign Up</span></Link>
        </div>
      </form>
    </Form>
  )
}
