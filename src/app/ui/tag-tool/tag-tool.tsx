'use client'

import Canvas from "./canvas"
import TagNameList from "./name-list";
import { TagToolProvider, useTagContext } from "@/context/TagToolContext";



export interface Rectangle {
  x: number,
  y: number,
  width: number,
  height: number,
  stroke: string,
  strokeWidth: number,
  id: string
  name: string
}


//put in context rect[], tagnamelist, selectedId, deleteTag

export default function TagTool() {
  const { selectedId, deleteTag } = useTagContext()

  
  
  return ( 
    <div className="container-fluid d-flex p-0 ">
      <TagToolProvider>
        <Canvas/>
        <div style={{ maxWidth: '300px' }} className='col-3'>
          <p>{selectedId}</p>
          <TagNameList />
          <button
            className='btn-primary btn'
            onClick={deleteTag}
          >
            Delete Tag
          </button>
        </div>
      </TagToolProvider>
      
    </div>
  )
}