'use client'

import Canvas from "./canvas"
import { TagToolProvider } from "@/context/TagToolContext";
import SideBar from "./side-bar";



export default function TagTool() {

  return ( 
    <div className="container-fluid d-flex p-0 ">
      <TagToolProvider>
        <Canvas/>
        <div style={{ maxWidth: '300px' }} className='col-3'>
          <SideBar/>
        </div>
      </TagToolProvider>
      
    </div>
  )
}