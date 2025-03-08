'use client'

import { useState } from 'react';
import FolderPathForm from './ui/folder-path-form'

export default function Home() {
  const [imageList, setImageList] = useState([])
  const [labels, setLabels] = useState([])
  
  return (
    <div className='container'>
      <div>
        <FolderPathForm setImageList={setImageList} setLabels={setLabels} />
      </div>
      <div>
        <div>
          <p>file list:</p>
          {imageList.map(image => {
            return <p key={image.imgName}>{image.imgName}</p>
          })}
        </div>
      </div>
      <div>
        <p>label list</p>
        {labels.map(label => {
          return <p key={label}>{label}</p>
        })}
        <button>edit</button>
      </div>
    </div>
  );
}
