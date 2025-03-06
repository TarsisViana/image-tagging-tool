'use client'

import { useState } from 'react';
import FolderPathForm from './ui/folder-path-form'

export default function Home() {
  const [imageList, setImageList] = useState([])
  
  return (
    <div className='container'>
      
      <div>
        <FolderPathForm setImageList={setImageList} />
      </div>
      <div>
        <div>
          <p>file list:</p>
          {imageList.map(image => {
            return <p key={image.name}>{image.name}</p>
          })}
        </div>
      </div>
      <div>
        <p>label list</p>
        <button>edit</button>
      </div>
    </div>
  );
}
