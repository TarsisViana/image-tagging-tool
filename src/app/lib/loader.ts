'use server'

import { ImageFileList } from '@/types'
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
    const imageList: ImageFileList = await Promise.all(images.map(async image => {
      const tags :[] = await getTags(image.name, image.path)
      return {
        imgName: image.name,
        tags
      }
    }))

    const labels = getLabels(imageList)

    const jsonImages = JSON.stringify({success:true,imageList,labels})
    return jsonImages

  } catch (err) {
    console.log(err)
    return JSON.stringify({success:false})
  }
}


function isImage(file: Dirent) {
  const fileExtName = path.extname(file.name).toLowerCase() 
  const test = fileExtName === '.jpg' || fileExtName === '.png' || fileExtName === '.jpeg' || fileExtName === '.tiff'
  return test
};


async function getTags( imgName:string, folderPath:string ) {
  const fileName = path.parse(imgName).name
  try {
    const data = await fs.readFile(`${folderPath}/${fileName}.json`, 'utf8')
    const labels = JSON.parse(data)
    return labels
  } catch {
    return []
  }
}

function getLabels(imgList:ImageFileList) {
  const labels: string[] = []
  imgList.map(image => {
    const imgLabels = image.tags.map(tag => {
      if (tag.label) {
        return extractGenLabel(tag.label)
      }
    })
    if (imgLabels) {
      imgLabels.forEach(label => {
        if (label) {
          const duplicate = labels.includes(label)
          if (!duplicate) {
            labels.push(label)
          }
        }
      })
    }
  })
  return labels
}

function extractGenLabel(individualLabel:string) {
  const index = individualLabel.lastIndexOf('.')
  const label = individualLabel.slice(index+1)
  return label
}