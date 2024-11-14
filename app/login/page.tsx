import {Login} from "@/components/Login"
import Image from "next/image"
import LeetImage from '@/app/favicon.ico';

export default function LoginPage(){
    return (
        <div className='w-full h-[100vh] bg-gray-100'>
            <div className='w-full h-full flex-center'>
                   <div className='p-5 shadow-xl bg-white flex-center flex-col gap-5'>
                          <div className="flex-center flex-col gap-5 w-full">
                             <Image src={LeetImage} alt="Bit Icon" width={40} height={40}/>
                             <h1 className="text-black text-2xl">BitCode</h1>
                         </div>
                         <Login/>
                   </div>
            </div>
        </div>
    )
}