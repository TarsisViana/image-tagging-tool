export type Rectangle = {
  x: number,
  y: number,
  width: number,
  height: number,
  stroke: string,
  strokeWidth: number,
  id: string
}

export type Tag = {
  xMin: number,
  xMax: number,
  yMax: number,
  yMin: number,
  value?: string,
  label: string | null,
  id?: string,
}

export type Label = {
  name: string,
  id: string,
}

export type ImageFileList = {
  imgName: string,
  tags: Tag[]
}[] 

// const exemple: Tag = {
//   xMin: 20,
//   yMin: 20,
//   xMax: 120,
//   yMax: 120,
//   id: 'rect1',
//   label: 'big_dog',
//   value: 'test_tag'
// };

// const exempleExport= {
//   xMin: 20,
//   yMin: 20,
//   xMax: 120,
//   yMax: 120,
//   label: 'big_dog.test_tag',
// };
