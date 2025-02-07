import { getRandomColors } from "@/app/lib/color"
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react"

export interface Rectangle {
  x: number,
  y: number,
  width: number,
  height: number,
  stroke: string,
  strokeWidth: number,
  id: string
}

export interface Tag  {
  xMin: number,
  xMax: number,
  yMax: number,
  yMin:number,
  value: string,
  label: string | null,
  id: string,
}

export type label = {
  name: string,
  id: string,
}



type TagToolContextProps = {
  tagList: Tag[],
  labelList: label[],
  selectedId: string | null,
  deleteTag: () => void,
  addTag: (tag: Tag) => void,
  editTag: (rect: Rectangle, index: number) => void,
  editTagValue: (value:string) => void,
  addLabel: (name: string) => void,
  selectTag: Dispatch<SetStateAction<string | null>>,
  editLabel: (name: string) => void, 
  edit: boolean,
  setEdit: Dispatch<SetStateAction<boolean>>,
  colorList: string[],
}

const TagToolContext = createContext<TagToolContextProps>({
  tagList: [],
  addTag: ()=>{},
  labelList: [],
  selectedId: '',
  selectTag: () => {},
  deleteTag: () => {},
  editTag: () => { },
  editTagValue: () => {},
  addLabel: () => {},
  editLabel: () => {},
  edit: false,
  setEdit: () => { },
  colorList: [],
})

const initialTag: Tag[] = [{
  xMin: 20,
  yMin: 20,
  xMax: 120,
  yMax: 120,
  id: 'rect1',
  label: 'big dog',
  value: 'test tag'
}];

export function TagToolProvider({ children }: { children: React.ReactNode }) { 
  const [tagList, setTagList] = useState<Tag[]>(initialTag);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [colorList, setColorList] = useState(getRandomColors());
  const [labelList, setLabelList] = useState<label[]>([
    { name: 'small dog', id: crypto.randomUUID() },
    { name: 'big dog', id: crypto.randomUUID() }])
  const [selectedId, selectTag] = useState<string | null>(null);
  const [edit, setEdit] = useState<boolean>(false)
  
  
  function addTag( tag : Tag ) {
    const newArr = tagList.slice()
    newArr.push(tag)
    setTagList(newArr);
  }

  function deleteTag() {
    if (!selectedId) return

    const tag = tagList.find((tag) => tag.id === selectedId)
    if (tag) {
      const index = tagList.indexOf(tag)
      const newArr = tagList.toSpliced(index, 1)

      setTagList(newArr)
      selectTag(null)
    }
  }

  function editTag(rect:Rectangle, index:number) {
    const newArr = tagList.slice();
    const oldTag = newArr[index]
    newArr[index] = {
      ... oldTag,
      xMin: rect.x,
      yMin: rect.y,
      xMax: rect.width + rect.x,
      yMax: rect.height + rect.y,
    };
    setTagList(newArr);
  }

  function editTagValue(str: string) {
    const index = tagList.findIndex(tag=> tag.id === selectedId)
    tagList[index] = {
      ...tagList[index],
      value: str,
    }
  }

  function addLabel(name:string) {
    const nameArr = labelList;
    nameArr.push({name, id: crypto.randomUUID()});
    setLabelList(nameArr);
  }

  function editLabel(name: string) {
    const id = selectedId
    if (!selectedId) return

    const index = tagList.findIndex((tag) => tag.id === id)
    if (index >= 0) {
      const newArr = tagList.slice()
      newArr[index] = { ...newArr[index],label: name};

      setTagList(newArr)
      return
    }
  }
  return (
    <TagToolContext.Provider
      value={{
        tagList,
        addTag,
        labelList,
        addLabel,
        deleteTag,
        selectedId,
        selectTag,
        editTag,
        editTagValue,
        editLabel,
        edit,
        setEdit,
        colorList
      }}>
      {children}
    </TagToolContext.Provider>
  )
}

export function useTagContext() {
  const context = useContext(TagToolContext)

  return context;
}