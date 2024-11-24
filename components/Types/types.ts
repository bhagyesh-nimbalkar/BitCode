export type TableType = {
    status:"accepted" | "attempted" | "unsolved";
    title:string;
    difficulty:"Easy" | "Medium" | "Hard";
}
export type Question = {
    title:string
    status:string
    difficulty:string
    description:string
    examples:Example[]
    input_format:string[]
    output_format:string[]
    constraints:string[]
    topics:string[]
    hints?:string[]
    testcases:string[]
    expected_output:string[]
}

interface Example  {
    input:string
    output:string
    explanation?:string | null;
}
export type Submission = {
    source_code:string;
    language_id:number;
    stdin:string;
    expected_output:string;
}