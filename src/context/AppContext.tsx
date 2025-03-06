import { Label, Tag } from "@/types"
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react"


type AppContextProps = {
  labelList: Label[],
  folderTagList: { imageName: string, tagList: Tag[] }[],
  folderPath: string | null
}

const AppContext = createContext<AppContextProps>({
  labelList: [],
  folderTagList: [],
  folderPath: null,
})

export function AppProvider({ children }: { children: React.ReactNode }) {
  
  return (
    <AppContext.Provider
      value={{

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