import { getRandomColors } from "@/app/lib/color"
import { Rectangle, Tag , Label} from "@/types";
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react"
import { useAppContext } from "./AppContext";
import { fileToCanvasTags } from "@/app/lib/tag";

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


export function TagToolProvider({ children, imageName }: { children: React.ReactNode, imageName: string }) { 
  const { imageFileList, updateTagList } = useAppContext()
  
  const [tagList, setTagList] = useState<Tag[]>([]);
  const [colorList, setColorList] = useState(getRandomColors());
  const [labelList, setLabelList] = useState<Label[]>([
    { name: 'small_dog', id: crypto.randomUUID() },
    { name: 'big_dog', id: crypto.randomUUID() }])
  const [selectedId, selectTag] = useState<string | null>(null);
  const [edit, setEdit] = useState<boolean>(false)
  
  useEffect(() => {
    function getFileTags(imgName: string) {
      const index = imageFileList.findIndex(file => file.imgName == imgName)
      if (index > -1) return imageFileList[index].tags
      else return []
    };

    const fileTags = getFileTags(imageName);
    const canvasTags = fileToCanvasTags(fileTags)
    setTagList(canvasTags)
  },[])
  
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
      updateTagList(imageName, newArr)
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
    updateTagList(imageName, newArr)
  }

  function editTagValue(str: string) {
    const index = tagList.findIndex(tag => tag.id === selectedId)
    if (index >= 0) {
      const newArr = tagList.slice()
      newArr[index] = {
        ...tagList[index],
        value: str,
      }
      setTagList(newArr)
      updateTagList(imageName, newArr)
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
      updateTagList(imageName, newArr)
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