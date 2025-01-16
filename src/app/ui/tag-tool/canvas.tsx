'use client'

import Konva from 'konva';
import { useEffect, useRef, useState } from 'react'
import { Stage, Layer, Rect } from 'react-konva'
import Tag from './tag';
import { KonvaEventObject } from 'konva/lib/Node';
import BaseImage from './base-image';
import { normalizeTag } from '@/app/lib/tag';


export interface Rectangle  {
  x: number,
  y: number,
  width: number,
  height: number,
  stroke: string,
  strokeWidth: number,
  id: string
}

const initialRect : Rectangle = {
  x: 20,
  y: 20,
  width: 100,
  height: 100,
  stroke: 'red',
  strokeWidth: 3,
  id: 'rect1',
};

export default function Canvas() {
  const [rectList, setRectList] = useState<Rectangle[]>([initialRect]);
  const [selectedId, selectShape] = useState<string | null>(null);
  const [isDrawing, setDrawing] = useState(false);

  //put in context later
  const [imageAtr, setImageAtr] = useState({width:1, height:1, imgRatio:1});
  //stage size
  const [stageSize, setStageSize] = useState({ width: 1, height: 1 })
  const [scale, setScale] = useState(1)
  const [containerSize, setContainerSize] = useState({width:1,height:1})


  const stageRef = useRef<Konva.Stage>(null);
  const constructorRef = useRef<Konva.Rect>(null);

  useEffect(() => {
    function onDeleteKey(e) {
      if (e.key === "Delete" || e.key === "Backspace") {
        handleDelete()
      }
    } 
    window.addEventListener('keydown', onDeleteKey)

    return () => {
      window.removeEventListener('keydown',onDeleteKey)    }
  })

  //check the parent size
  useEffect(() => {
    function checkSize() {
      const container = stageRef.current?.container();
      if (container) {
        setContainerSize({
          width: container?.offsetWidth,
          height: container?.offsetHeight
        })
      }
      
    }
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  },[])

  function handleMouseDown(e: KonvaEventObject<MouseEvent, Konva.Node>) {
    const clickedOnTag = e.target.name() === 'tag'
    
    if (!clickedOnTag) {
      const node = stageRef.current
      const constructor = constructorRef.current;

      const pointerPos = getPointer(node)
      const atr = {
        x: pointerPos?.x,
        y: pointerPos?.y,
      }
      constructor?.setAttrs(atr)
      setDrawing(true)
    }
  }

  function handleMouseMove() {
    if (!isDrawing) return;
    const node = stageRef.current
    const pointerPos = getPointer(node)
    const constructor = constructorRef.current;
    if (pointerPos && constructor) {
      const atr = {
        width: pointerPos.x - constructor.x(),
        height: pointerPos.y - constructor.y(),
      }
      constructor.setAttrs(atr)
    }
    
  }

  function handleMouseUp() {
    if (!isDrawing) return;
    setDrawing(false)

    //create new tag and add to array with size minimum
    const constructor = constructorRef.current;
    if (constructor
      && (constructor.width() > 20 || constructor.width() < -20)
      && (constructor.height() > 20 || constructor.height() < -20)) {
      const tag = {
        x: constructor.x(),
        y: constructor.y(),
        width: constructor.width(),
        height: constructor.height(),
        stroke: 'yellow',
        strokeWidth: 3/scale,
        id: crypto.randomUUID(),
      };
      //handle negative values
      const normalizedTag = normalizeTag(tag)
      const tagArr = rectList
      tagArr.push(normalizedTag)
      setRectList(tagArr);
    }

    //reset constructor
    constructor?.setAttrs({
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    })
  }

  function handleDelete() {
    const id = selectedId
    if (!selectedId) return

    const item = rectList.find((tag) => tag.id === id)
    if (item) {
      const index = rectList.indexOf(item)
      const newArr = rectList.toSpliced(index, 1)

      setRectList(newArr)
      selectShape(null)
    }
  }

  function getPointer(node: Konva.Node | null) {
    if (!node) {
      return{ x:0, y:0 }
    }
    if (node) {
      const pointerPos = node.getRelativePointerPosition();
      if (pointerPos) {
        pointerPos.x = Math.round(pointerPos.x)
        pointerPos.y = Math.round(pointerPos.y)
      }
      return pointerPos
    }
  }
  return (
    <>
      <div
        className='flex-grow-1 flex-shrink-1 d-flex justify-content-center align-items-center'
        id='canvasContainer'>
        <Stage
          width={stageSize.width}
          height={stageSize.height}
          scaleX={scale}
          scaleY={scale}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          name="canvas"
          ref={stageRef} 
          container='canvasContainer'
        >
          <BaseImage
            selectShape={selectShape}
            setImageAtr={setImageAtr}
            setScale={setScale}
            setSize={setStageSize}
            containerSize={containerSize}
          />
          <Layer>
            {rectList.map((rect, index) => {
              return (
                <Tag
                  key={index}
                  tagProps={rect}
                  isSelected={rect.id === selectedId}
                  onSelect={() => {
                    selectShape(rect.id);
                  }}
                  onChange={(newAttrs: Rectangle) => {
                    const rects = rectList.slice();
                    rects[index] = newAttrs;
                    setRectList(rects);
                  }}
                />
              )
            })}
            <Rect
              ref={constructorRef}
              draggable
              stroke= 'grey'
              strokeWidth={5/scale}
            />
          </Layer>
        </Stage>
      </div>
      
      <div style={{ maxWidth: '300px' }} className='col-3'>
        <button
          className='btn-primary btn'
          onClick={handleDelete}>
          delete
        </button>
      </div>
    </>
    )
}