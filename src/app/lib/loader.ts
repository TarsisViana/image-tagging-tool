'use server'

import { Dirent } from 'node:fs'
import fs from 'node:fs/promises'
import path from 'node:path'

const folderPath = '/home/tarsis/Documents/test_imgs'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const fileName = 'Dog-Aging-Infographic_InstaFB-1-1024x1024.png'

export async function loadImage(name:string) {
  try {
    const data = await fs.readFile(`${folderPath}/${name}`);
    const base64Image = data.toString('base64');
    const mimeType = `image/${path.extname(name).slice(0,1)}`; 
    const base64WithMimeType = `data:${mimeType};base64,${base64Image}`;
    return base64WithMimeType
  } catch (err) {
    console.error(err);
  }
}

export async function getImageList(path:string) {
  try {
    const files = await fs.readdir(path, { withFileTypes: true })
    const images = files.filter(isImage)
    const jsonImages = JSON.stringify({success:true,images})
    return jsonImages

  } catch (err) {
    console.log(err)
    return JSON.stringify({success:false})
  }

  //handle not found, validate form
  // https://nextjs.org/learn/dashboard-app/mutating-data
}


function isImage(file: Dirent) {
  const fileExtName = path.extname(file.name).toLowerCase() 
  const test = fileExtName === '.jpg' || fileExtName === '.png' || fileExtName === '.jpeg' || fileExtName === '.tiff'
  return test
};
