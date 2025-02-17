'use server'

import { Dirent } from 'node:fs'
import fs from 'node:fs/promises'
import path from 'node:path'

const folderPath = '/home/tarsis/Documents/test_imgs'
const fileName = 'Dog-Aging-Infographic_InstaFB-1-1024x1024.png'

export async function loadImage(name:string) {

  const files = await fs.readdir(folderPath, {withFileTypes:true})
  const images = files.filter(isImage)
  console.log(images)

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



function isImage(file:Dirent) {
  const test = path.extname(file.name).toLowerCase() === '.jpg'
  return test
};
