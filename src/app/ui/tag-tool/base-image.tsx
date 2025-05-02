import { loadImage } from "@/app/lib/loader";
import { useAppContext } from "@/context/AppContext";
import { useTagContext } from "@/context/TagToolContext";


import React, { useEffect, useState } from "react";
import { Image, Layer } from "react-konva";
import useImage from "use-image";


export default function BaseImage({ selectTag, setScale, setSize, containerSize }:
  {
    selectTag: (arg: null) => void,
    setScale: (arg: number) => void,
    setSize: (arg: { width: number, height: number }) => void,
    containerSize: { width:number, height:number }
  }) {
  const {dirPath} = useAppContext()
  const {imageName} = useTagContext()
  const [imgBase64, setImgBase64] = useState<string>('');

 

  useEffect(() => {
    async function getImageFromParams() {
      const imgData = await loadImage(dirPath,imageName)

      if (imgData) setImgBase64(imgData);
    }
    
    getImageFromParams()
  }, [dirPath, imageName])
  
  const [image] = useImage(imgBase64);

  useEffect(() => {
    if (!image) return
    const imgRatio = image.width / image.height

    const containerRatio = containerSize.width / containerSize.height;
    //compare the ratios to find the breakpoint
    if (imgRatio <= containerRatio) {
      setSize({
        width: containerSize.height * imgRatio,
        height: containerSize.height
      })
    } else if(imgRatio > containerRatio){
      setSize({
        width: containerSize.width ,
        height: containerSize.width / imgRatio
      })
    }
    
    const scale = Math.min(containerSize.width / image.width, containerSize.height / image.height);
    setScale(scale)
  },[containerSize.height, containerSize.width, image, setScale, setSize])

  return (
    <Layer>
      <Image
        image={image}
        onMouseDown={() => {
          selectTag(null)
        }}
        name='image'
        alt='placeholder'
      />
    </Layer>
  );
};
