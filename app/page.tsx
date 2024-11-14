import HomeNav from "@/components/HomeNav";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
    return (
    <div className="w-full h-[100vh] p-10 bg-black/90">
          <div className="w-full">
              <HomeNav/>
              <div className="w-full h-[60vh] flex-center flex-col gap-12">
                   <h1 className="md:text-5xl text-white font-medium text-2xl sm:text-3xl">A New Way to Learn</h1>
                   <p className="text-justify lg:w-[50%] xl:w-[30%] md:w-[70%] text-slate-200 font-thin w-full text-xs sm:text-base">BitCode is the best platform to help you enhance your skills, expand your knowledge and prepare for technical interviews.</p>
              </div>
              <div className="w-full flex-center">
                  <Link href="/signup">
                      <button className="px-2 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full flex-center gap-1">
                        <span >Create Account</span>
                        <ChevronRight className=" text-white"/>
                      </button>
                  </Link>
              </div>
          </div>
    </div>
    )
}
