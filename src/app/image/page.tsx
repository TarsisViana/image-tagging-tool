'use client'

import { useEffect, useState } from 'react';
import { loadImage } from '../lib/loader';

export default function Page() {
  const [image, setImage] = useState(null);
  const displayImage = async () => {
    const imgData = await loadImage('dogs.png')
    console.log(imgData)
    setImage(imgData);
  }
  useEffect(() => {
    displayImage()
  },[])

  return (
    <>
      <div></div>
      {image && <img src={image} />}
    </>
  )
} 

