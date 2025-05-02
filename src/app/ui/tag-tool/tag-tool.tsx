'use client'

import Canvas from "./canvas"
import { TagToolProvider } from "@/context/TagToolContext";
import SideBar from "./side-bar";

export default function TagTool({ id }: { id: string }) {
  const imageName = decodeURIComponent(id);
  return ( 
    <div className="container-fluid d-flex p-0">
      <TagToolProvider imageName={imageName}>
        <Canvas/>
        <div style={{ maxWidth: '300px'}} className='col-3 h-100 p-1'>
          <SideBar/>
        </div>
      </TagToolProvider>
    </div>
  )
}