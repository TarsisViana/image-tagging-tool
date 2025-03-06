import { getRandomColors } from "@/app/lib/color"
import { Rectangle, Tag , Label} from "@/types";
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react"

type TagToolContextProps = {
  tagList: Tag[],
  labelList: Label[],
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
  imageName: string,
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
  imageName: '',
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

export function TagToolProvider({ children, imageName }: { children: React.ReactNode, imageName: string }) { 

  const [tagList, setTagList] = useState<Tag[]>(initialTag);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [colorList, setColorList] = useState(getRandomColors());
  const [labelList, setLabelList] = useState<Label[]>([
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
        colorList,
        imageName
      }}>
      {children}
    </TagToolContext.Provider>
  )
}

export function useTagContext() {
  const context = useContext(TagToolContext)

  return context;
}