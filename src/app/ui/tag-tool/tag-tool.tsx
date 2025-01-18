'use client'

import { useState } from "react";
import Canvas from "./canvas"


export interface Rectangle {
  x: number,
  y: number,
  width: number,
  height: number,
  stroke: string,
  strokeWidth: number,
  id: string
}

//put in context
const initialRect: Rectangle[]= [{
  x: 20,
  y: 20,
  width: 100,
  height: 100,
  stroke: 'red',
  strokeWidth: 3,
  id: 'rect1',
}];


export default function TagTool() {
  const [rectList, setRectList] = useState<Rectangle[]>(initialRect);
  const [selectedId, selectTag] = useState<string | null>(null);

  function handleDelete() {
    const id = selectedId
    if (!selectedId) return

    const item = rectList.find((tag) => tag.id === id)
    if (item) {
      const index = rectList.indexOf(item)
      const newArr = rectList.toSpliced(index, 1)

      setRectList(newArr)
      selectTag(null)
    }
  }
  return ( 
    <div className="container-fluid d-flex p-0 ">
      <Canvas
        rectList={rectList}
        setRectList={setRectList}
        selectedId={selectedId}
        selectTag={selectTag}
        handleDelete={handleDelete}
      />
      <div style={{ maxWidth: '300px' }} className='col-3'>
        <button
          className='btn-primary btn'
          onClick={handleDelete}
          >
          delete
        </button>
        <p>{selectedId}</p>
      </div>
    </div>
  )
}