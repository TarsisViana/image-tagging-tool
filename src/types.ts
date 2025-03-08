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


const exemple: Tag = {
  xMin: 20,
  yMin: 20,
  xMax: 120,
  yMax: 120,
  id: 'rect1',
  label: 'big_dog',
  value: 'test_tag'
};

const exempleExport= {
  xMin: 20,
  yMin: 20,
  xMax: 120,
  yMax: 120,
  label: 'big_dog.test_tag',
};
