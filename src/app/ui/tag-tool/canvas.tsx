'use client'

import Konva from 'konva';
import { useEffect, useRef, useState } from 'react'
import { Stage, Layer, Rect } from 'react-konva'
import Tag from './tag';
import { KonvaEventObject } from 'konva/lib/Node';
import BaseImage from './base-image';
import { normalizeTag } from '@/app/lib/tag';
import { useTagContext } from '@/context/TagToolContext';
import { Rectangle } from '@/types';




export default function Canvas() {
  const { tagList, addTag, selectedId, selectTag, editTag, edit, labelList, colorList } = useTagContext()
  const [isDrawing, setDrawing] = useState(false);
  
  
  
  //stage size
  const [stageSize, setStageSize] = useState({ width: 1, height: 1 })
  const [scale, setScale] = useState(1)
  const [containerSize, setContainerSize] = useState({width:1,height:1})

  const stageRef = useRef<Konva.Stage>(null);
  const constructorRef = useRef<Konva.Rect>(null);


  const recList = tagList.map((tag) => {
    let labelIndex, color = 'grey';
    if (tag.label) {
      labelIndex = labelList.findIndex(label => label === tag.label)
      if (labelIndex >= 0) {
        color = colorList[labelIndex]
      } 
    }
    const rect = {
      x: tag.xMin,
      y: tag.yMin,
      width: tag.xMax - tag.xMin,
      height: tag.yMax - tag.yMin,
      stroke: color,
      strokeWidth: 3 / scale,
      id: tag.id,
    };
    return rect;
  })

  //check the parent size
  useEffect(() => {
    function checkSize() {
      const container = stageRef.current?.container();
      if (container) {
        setContainerSize({
          width: container.offsetWidth,
          height: container.offsetHeight
        })
      }
      
    }
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  },[])

  function handleMouseDown(e: KonvaEventObject<MouseEvent, Konva.Node>) {
    const clickedOnTag = e.target.getClassName() === 'Rect'
    
    if (!edit || !clickedOnTag) {
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

    //create new tag and add to array with minimum size
    const constructor = constructorRef.current;
    if (constructor
      && (constructor.width() > 20 || constructor.width() < -20)
      && (constructor.height() > 20 || constructor.height() < -20)) {
      const rectangle = {
        x: constructor.x(),
        y: constructor.y(),
        width: constructor.width(),
        height: constructor.height(),
      };
      //handle negative values
      const normalizedTag = normalizeTag(rectangle)
      addTag(normalizedTag)
      selectTag(normalizedTag.id)
    }

    //reset constructor
    constructor?.setAttrs({
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    })
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
          onMouseEnter={() => {
            document.body.style.cursor = edit ? 'pointer' : 'crosshair'
          }}
          onMouseLeave={() => {
            document.body.style.cursor = 'auto'
          }}
        >
          <BaseImage
            selectTag={selectTag}
            setScale={setScale}
            setSize={setStageSize}
            containerSize={containerSize}
          />
          <Layer>
            {tagList && recList.map((rect, index) => {
              return (
                <Tag
                  key={index}
                  tagProps={rect}
                  isSelected={rect.id === selectedId}
                  onSelect={() => {
                    if (edit) selectTag(rect.id);
                  }}
                  onChange={(newAttrs: Rectangle) => {
                    editTag(newAttrs,index)
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
    </>
    )
}