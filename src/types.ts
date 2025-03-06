export interface Rectangle {
  x: number,
  y: number,
  width: number,
  height: number,
  stroke: string,
  strokeWidth: number,
  id: string
}

export interface Tag {
  xMin: number,
  xMax: number,
  yMax: number,
  yMin: number,
  value: string,
  label: string | null,
  id: string,
}

export type Label = {
  name: string,
  id: string,
}

