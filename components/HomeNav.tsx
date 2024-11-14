import Image from "next/image";
import LeetImage from '@/public/images.png';
import Link from "next/link";

const HomeNav = () => {
  return (
    <div className="w-full flex transition-all duration-200 justify-center">
         <div className="w-full md:flex-row gap-5 items-center flex flex-col">
             <Image src={LeetImage} alt='Leetcode Icon' width={30} height={30}/> 
             <h1 className="bold-heading text-white">BitCode</h1>
         </div>
         <div className="flex-center hidden md:flex md:flex-center">
              <Link href="#" className="link-btn text-orange-400 hover:bg-orange-500 hover:text-black">Premium</Link>
              <Link href="#" className="link-btn">Explore</Link>
              <Link href="#" className="link-btn">Products</Link>
              <Link href="#" className="link-btn">Developer</Link>
              <Link href="/login" className="link-btn text-nowrap">Sign in</Link>
         </div>
    </div>
  )
}

export default HomeNav;
