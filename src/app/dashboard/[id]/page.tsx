'use client'

import TagTool from "@/app/ui/tag-tool/tag-tool";
import { useParams } from "next/navigation";


export default function Page(){
  const params = useParams<{id:string}>()
  const id = params.id;

  return <TagTool id={id}/>
}