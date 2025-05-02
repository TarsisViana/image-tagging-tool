'use server'

import { getImageList } from "./loader"

export async function getFolderPath(path: string) {
  
  const fileList = await getImageList(path)
  console.log(fileList)
  return fileList
  
}