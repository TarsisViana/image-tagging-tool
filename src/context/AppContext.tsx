'use client'

import { canvasToFileTags } from "@/app/lib/tag";
import { FileTag, ImageFileList, Tag } from "@/types"
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react"


type AppContextProps = {
  dirPath:string | undefined,
  setPath: Dispatch<SetStateAction<string | undefined>>,
  labelList: string[],
  setLabels: Dispatch<SetStateAction<string[]>>,
  imageFileList: ImageFileList,
  setImageList: Dispatch<SetStateAction<ImageFileList>>,
  getTagList: (value: string) => FileTag[] | undefined,
  updateTagList : (name:string, tags:Tag[]) => void
}

const AppContext = createContext<AppContextProps>({
  dirPath: '',
  setPath: ()=> {},
  labelList: [],
  setLabels: () => {},
  imageFileList: [],
  setImageList: () => {},
  getTagList: () => undefined,
  updateTagList: () => {},
})

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [imageFileList, setImageList] = useState<ImageFileList>([])
  const [labelList, setLabels] = useState<string[]>([])
  const [dirPath, setPath] = useState<string | undefined>()

  function getTagList(imgName: string) {
    const index = imageFileList.findIndex(file => file.imgName == imgName)
    if (index > -1) return imageFileList[index].tags
  }

  function updateTagList(imgName: string, canvasTagList:Tag[]) {
    const index = imageFileList.findIndex(file => file.imgName == imgName)
    const fileTags = canvasToFileTags(canvasTagList);

    const tempArr = imageFileList.slice();
    tempArr[index].tags = fileTags;

    setImageList(tempArr)
  }

  return (
    <AppContext.Provider
      value={{
        dirPath,
        setPath,
        imageFileList,
        setImageList,
        labelList,
        setLabels,
        getTagList,
        updateTagList
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const context = useContext(AppContext)

  return context;
}