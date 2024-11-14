import {useMutation, useQuery} from '@tanstack/react-query';
import { createUser, getAllProblems, getProblemById, getuserSession, loginUser, logoutUser } from './api';

export const useCreateUser = ()=>{
    return useMutation({
        mutationFn:async({email,password}:{email:string,password:string})=>{
            return await createUser({email,password});
        }
    })
}
export const useLoginUser = ()=>{
    return useMutation({
        mutationFn:async ({email,password}:{email:string,password:string})=>{
           const data = await loginUser({email,password});
           return data;
        }
    })
}
export const useAllProb = ()=>{
    return useQuery({
         queryKey:['ALLPROBLEM'],
         queryFn:getAllProblems,
    })
}
export const useProbById = (id:string)=>{
    return useQuery({
        queryKey:['GETUNIQUEPROB'],
        queryFn:()=>getProblemById(id),
   })
}
export const useLogoutUser =()=>{
    return useMutation({
        mutationFn:async ()=>{
           const data = await logoutUser();
           return data;
        }
    })
}

export const useUserSession = ()=>{
    return useQuery({
        queryKey:["USER_SESSION"],
        queryFn:getuserSession,
    })
}