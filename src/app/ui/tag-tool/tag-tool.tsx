'use client'

import Canvas from "./canvas"
import { TagToolProvider } from "@/context/TagToolContext";
import SideBar from "./side-bar";

export default function TagTool({ id }: { id: string }) {
  
  return ( 
    <div className="container-fluid d-flex p-0">
      <TagToolProvider imageName={id}>
        <Canvas/>
        <div style={{ maxWidth: '300px'}} className='col-3 d-flex flex-column gap-1 h-100'>
          <SideBar/>
        </div>
      </TagToolProvider>
    </div>
  )
}