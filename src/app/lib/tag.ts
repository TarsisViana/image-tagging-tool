import { Tag } from "@/context/TagToolContext";
import { FileTag } from "@/types";


export function normalizeTag(rect: {
  x: number,
  y: number,
  width: number,
  height: number,
}) {
  if (rect.width > 0 && rect.height > 0) {
    const tag = {
      xMin: rect.x,
      yMin: rect.y,
      xMax: rect.x + rect.width, 
      yMax: rect.y + rect.height,
      value: '',
      label: null,
      id: crypto.randomUUID()
    }
    return tag
  }
  if (rect.width < 0) {
    if (rect.height < 0) {
      const normalizedTag: Tag = {
        xMin: rect.x + rect.width,
        yMin: rect.y + rect.height,
        xMax: Math.abs(rect.width) + (rect.x + rect.width),
        yMax: Math.abs(rect.height) + (rect.y + rect.height),
        value: '',
        label: null,
        id: crypto.randomUUID()
      }
      return normalizedTag;
    } else if (rect.height > 0) {
      const normalizedTag: Tag = {
        xMin: rect.x + rect.width,
        yMin: rect.y,
        xMax: Math.abs(rect.width) + (rect.x + rect.width),
        yMax: Math.abs(rect.height) + rect.y,
        value: '',
        label: null,
        id: crypto.randomUUID()
      }
      return normalizedTag;
    }
  } 
  // if height < 0
  const normalizedTag: Tag = {
    xMin: rect.x,
    yMin: rect.y + rect.height,
    xMax: Math.abs(rect.width) + rect.x,
    yMax: Math.abs(rect.height) + (rect.y + rect.height),
    value: '',
    label: null,
    id: crypto.randomUUID()
  }
  return normalizedTag;
  
  
}

export function fileToCanvasTags(fileTags: FileTag[]) {
  const canvasTags = fileTags.map(tag => {
    const index = tag.label.lastIndexOf('.');
    const label = tag.label.slice(index + 1)
    const value = tag.label.slice(0, index)
    return {
      xMin: tag.xMin,
      yMin: tag.yMin,
      xMax: tag.xMax,
      yMax: tag.yMax,
      id: crypto.randomUUID(),
      label,
      value
    }
  })

  return canvasTags
}


export function canvasToFileTags(canvasTags: Tag[]) {
  const fileTags = canvasTags.map(tag => {
    const label = `${tag.value}.${tag.label}`
    return {
      xMin: tag.xMin,
      yMin: tag.yMin,
      xMax: tag.xMax,
      yMax: tag.yMax,
      label,
    }
  })

  return fileTags
}