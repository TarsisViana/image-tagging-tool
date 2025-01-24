import { Rectangle } from "@/app/ui/tag-tool/tag-tool"
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react"

type TagToolContextProps = {
  tagList: Rectangle[],
  tagNameList: string[],
  selectedId: string | null,
  deleteTag: () => void,
  addTag: (tag: Rectangle) => void,
  editTag: (tag:Rectangle, index:number) => void,
  addTagName: (name: string) => void,
  selectTag: Dispatch<SetStateAction<string | null>>,
  editTagName: (name:string) => void
}

const TagToolContext = createContext<TagToolContextProps>({
  tagList: [],
  addTag: ()=>{},
  tagNameList: [],
  selectedId: '',
  selectTag: () => {},
  deleteTag: () => {},
  editTag: () => {},
  addTagName: () => {},
  editTagName: () => {},
})

const initialRect: Rectangle[] = [{
  x: 20,
  y: 20,
  width: 100,
  height: 100,
  stroke: 'red',
  strokeWidth: 3,
  id: 'rect1',
  name: 'big dogs',
}];

export function TagToolProvider({ children }: { children: React.ReactNode }) {
  const [tagList, setTagList] = useState<Rectangle[]>(initialRect);
  const [tagNameList, setTagNameList] = useState<string[]>(['dog', 'big dogs'])
  const [selectedId, selectTag] = useState<string | null>(null);

  function addTag(tag:Rectangle) {
    const newArr = tagList.slice()
    newArr.push(tag)
    setTagList(newArr);
  }

  function deleteTag() {
    const id = selectedId
    if (!selectedId) return

    const item = tagList.find((tag) => tag.id === id)
    if (item) {
      const index = tagList.indexOf(item)
      const newArr = tagList.toSpliced(index, 1)

      setTagList(newArr)
      selectTag(null)
    }
  }
  function editTag(tag:Rectangle, index:number) {
    const newArr = tagList.slice();
    newArr[index] = tag;
    setTagList(newArr);
  }

  function addTagName(name:string) {
    const nameArr = tagNameList;
    nameArr.push(name);
    setTagNameList(nameArr);
  }

  function editTagName(name: string) {
    const id = selectedId
    if (!selectedId) return

    const index = tagList.findIndex((tag) => tag.id === id)
    if (index >= 0) {
      const newArr = tagList.slice()
      newArr[index] = { ...newArr[index],name: name};

      setTagList(newArr)
      return
    }
  }
  return (
    <TagToolContext.Provider
      value={{
        tagList,
        addTag,
        tagNameList,
        addTagName,
        deleteTag,
        selectedId,
        selectTag,
        editTag,
        editTagName,
      }}>
      {children}
    </TagToolContext.Provider>
  )
}

export function useTagContext() {
  const context = useContext(TagToolContext)

  return context;
}