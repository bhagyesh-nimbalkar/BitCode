'use client';

import Image from "next/image";
import LeetImage from '@/public/images.png';
import Link from "next/link";
import { Button } from "./ui/button";
import { useLogoutUser } from "@/lib/api/QueriesandMurations";
import Loader from "./Loader";
import { useRouter } from "next/navigation";


const Nav = () => {
  const {mutateAsync:logoutUser,isPending:loading} = useLogoutUser();
  const router = useRouter();
  return (
    <div className="w-full flex h-full justify-between">
         <div className='w-[90%] bg-fixed z-40 flex transition-all duration-200 bg-zinc-800 sm:px-[10rem] px-0   box-border min-h-12  gap-10 items-center'>
            <Image src={LeetImage} alt='Leetcode Icon' width={20} height={20} />
             <Link href="#" className="text-stone-500 leading-10 hover:text-white">Explore</Link>
              <Link href="#" className="text-white leading-10 hover:text-white border-b-2 border-white">Problems</Link>
              <Link href="#" className="text-stone-500 leading-10 hover:text-white">Contest</Link>
              <Link href="#" className="text-stone-500 leading-10 hover:text-white">Discuss</Link>
         </div>
         <div className="w-[10%] justify-between p-2 bg-zinc-800">
           <Button onClick={async()=>{
              try {
                const res = await logoutUser();
                if(res.success) router.push('/login');
              } catch (error) {
                console.log(error);
              }
           }} className="bg-red-500 text-white hover:bg-red-700 z-50 text-base flex-center gap-2">{loading && <Loader width={20} height={20}/>}Log out</Button>
         </div>
    </div>
  )
}

export default Nav;
