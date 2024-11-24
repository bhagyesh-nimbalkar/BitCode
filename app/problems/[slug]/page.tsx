import Section from "@/components/Section";

const ProblemPage = async ({params}:{params:Promise<{slug:string}>}) => {
  const slug = (await params).slug;
  return(
     <Section slug={slug}/>
  )
}

export default ProblemPage
