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
})

const initialRect: Rectangle[] = [{
  x: 20,
  y: 20,
  width: 100,
  height: 100,
  stroke: 'red',
  strokeWidth: 3,
  id: 'rect1',
  name: ''
}];

export function TagToolProvider({ children }: { children: React.ReactNode }) {
  const [tagList, setTagList] = useState<Rectangle[]>(initialRect);
  const [tagNameList, setTagNameList] = useState<string[]>(['dog', 'big dogs'])
  const [selectedId, selectTag] = useState<string | null>(null);

  function addTag(tag:Rectangle) {
    const tagArr = tagList
    tagArr.push(tag)
    setTagList(tagArr);
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
    const tagArr = tagList.slice();
    tagArr[index] = tag;
    setTagList(tagArr);
  }

  function addTagName(name:string) {
    const nameArr = tagNameList;
    nameArr.push(name);
    setTagNameList(nameArr);
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
      }}>
      {children}
    </TagToolContext.Provider>
  )
}

export function useTagContext() {
  const context = useContext(TagToolContext)

  return context;
}