'use client'

import { ImageFileList } from "@/types"
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react"


type AppContextProps = {
  dirPath:string,
  setPath: Dispatch<SetStateAction<string>>,
  labelList: string[],
  setLabels: Dispatch<SetStateAction<string[]>>,
  imageFileList: ImageFileList,
  setImageList: Dispatch<SetStateAction<ImageFileList>>,

}

const AppContext = createContext<AppContextProps>({
  dirPath: '',
  setPath: ()=>{},
  labelList: [],
  setLabels: () => {},
  imageFileList: [],
  setImageList: () => {}
})

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [imageFileList, setImageList] = useState<ImageFileList>([])
  const [labelList, setLabels] = useState<string[]>([])
  const [dirPath, setPath] = useState<string>('')

  return (
    <AppContext.Provider
      value={{
        dirPath,
        setPath,
        imageFileList,
        setImageList,
        labelList,
        setLabels
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