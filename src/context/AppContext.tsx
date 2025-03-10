'use client'

import { ImageFileList, Tag } from "@/types"
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react"


type AppContextProps = {
  dirPath:string,
  setPath: Dispatch<SetStateAction<string>>,
  labelList: string[],
  setLabels: Dispatch<SetStateAction<string[]>>,
  imageFileList: ImageFileList,
  setImageList: Dispatch<SetStateAction<ImageFileList>>,
  getTagList: (value:string) => Tag[] | undefined;
}

const AppContext = createContext<AppContextProps>({
  dirPath: '',
  setPath: ()=> {},
  labelList: [],
  setLabels: () => {},
  imageFileList: [],
  setImageList: () => {},
  getTagList: () => undefined,
})

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [imageFileList, setImageList] = useState<ImageFileList>([])
  const [labelList, setLabels] = useState<string[]>([])
  const [dirPath, setPath] = useState<string>('')

  function getTagList(imgName: string) {
    const index = imageFileList.findIndex(file => file.imgName == imgName)
    if (index > -1) return imageFileList[index].tags
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
        getTagList
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