import React, { useEffect } from "react";
import { Image, Layer } from "react-konva";
import useImage from "use-image";


export default function BaseImage({ selectShape, setImageAtr, setScale, setSize, containerSize }:
  {
    selectShape: (arg: null) => void,
    setImageAtr: (arg: object) => void,
    setScale: (arg: number) => void,
    setSize: (arg: { width: number, height: number }) => void,
    containerSize: { width:number, height:number }
  }) {
  const [image] = useImage('/vertcat.jpg');

  useEffect(() => {
    if (!image) return
    const imgRatio = image.width / image.height
    
    setImageAtr({
      width: image.width,
      height: image.height,
      imgRatio: imgRatio,
    })

    const containerRatio = containerSize.width / containerSize.height;
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
  },[containerSize.height, containerSize.width, image, setImageAtr, setScale, setSize])

  return (
    <Layer>
      <Image
        image={image}
        onMouseDown={() => {
          selectShape(null)
        }}
        name='image'
        alt='placeholder'
      />
    </Layer>
  );
};
