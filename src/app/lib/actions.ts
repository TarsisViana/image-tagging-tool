'use server'

import { getImageList } from "./loader"

export async function createLabel(formData: FormData) {
  console.log(formData)
  console.log('working')
}

export async function getFolderPath(path: string) {
  
  const fileList = await getImageList(path)
  console.log(fileList)
  return fileList
  
}