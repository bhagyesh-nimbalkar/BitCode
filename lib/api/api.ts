'use server';
import bcrypt from 'bcryptjs'
import { prisma } from "@/prisma/config";
import { getSession, login, logout } from '@/lib';
import { Question } from '@/components/Types/types';

export async function createUser({email,password}:{email:string,password:string}){
    try {
        const user = await prisma.user.findUnique({where:{email}});
        if(!!user){
          return {error:"Email is Already Exists!"};
        }
        const hashedPassword = bcrypt.hashSync(password,10);
        const res = await prisma.user.create({data:{email,password:hashedPassword}});
        console.log(res);
        return {success:"User Created Successfully!"};
     } catch (error) {
       console.log(error);
       return {error:"Something went wrong!"};
     }
}

export async function loginUser({email,password}:{email:string,password:string}){
  try {
    const user = await prisma.user.findUnique({where:{email}});
    if(!user){
      return {error:"User does not exist"};
    }
    const chash = validatePassword(password,user.password);
    if(!chash) return {error:"Invalid Credentials!"};
    const res = await login({email});
    if(res) return {success:"Logged In"};
    return {error:"Something went wrong!"};
 } catch (error) {
   console.log(error);
   return {error:"Something went wrong!"};
 }
}

export async function logoutUser(){
  try {
      await logout();
      return {success:"User logged out successfully!"}
  } catch (error) {
    console.log(error);
    return {error:"Something went wrong!"};
  }
}
export async function createQuestion(question:Question){
  try {
         await prisma.problem.create({data:{
         title:question.title,
         description:question.description,
         difficulty:question.difficulty,
         status:question.status,
         examples:question.examples,
         input_format:question.input_format,
         output_format:question.output_format,
         constraints:question.constraints,
         topics:question.topics,
         hints:question.hints,
         testcases:question.testcases,
         expected_output:question.expected_output
      }});
      return {success:"Question added!"}
  } catch (error) {
    console.log(error);
    return {error:"Something went wrong!"};
  }
}
export async function getAllProblems(){
   try {
       const res = await prisma.problem.findMany({});
       return res;
   } catch (error) {
      console.log(error);
      return {error:"Something went wrong!"}
   }
}
export async function getProblemById(id:string){
  try {
      const res = await prisma.problem.findUnique({where:{id}});
      return res;
  } catch (error) {
     console.log(error);
     return {error:"Something went wrong!"}
  }
}
export async function getuserSession(){
    return await getSession();
}
export async function validatePassword(pass:string,hash:string){
    return await bcrypt.compare(pass,hash);
}