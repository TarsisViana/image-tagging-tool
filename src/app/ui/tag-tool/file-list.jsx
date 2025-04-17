import { useAppContext } from "@/context/AppContext"
import { useTagContext } from "@/context/TagToolContext"
import Link from "next/link"
import { ListGroup } from "react-bootstrap"
import useKeyPress from "./useKeyPress"
import { useRouter } from "next/navigation"

export default function FileList() {
  const { imageFileList } = useAppContext()
  const { imageName } = useTagContext()
  const router = useRouter()
  
  //set keyboard shortcuts
  const shortcutKeys = ['a', 's']
  useKeyPress(shortcutKeys, keyPressHandler)  

  function keyPressHandler(event) {
    //only in the dashboad
    if (imageName !== '') { 
      const index = imageFileList.findIndex((imageFile) => imageFile.imgName == imageName)
      if (event.key == 's' && event.altKey) {
        //stop at final image
        if (index < imageFileList.length - 1) {
          const nextImg = imageFileList[index+1].imgName
          router.push(`/dashboard/${nextImg}`)
        }
      } else if (event.key == 'a' && event.altKey) {
        //stop at first image
        if (index > 0) {
          const previousImg = imageFileList[index-1].imgName
          router.push(`/dashboard/${previousImg}`)
        }
      }
    } 
  }

  return (
    <ListGroup
      className="overflow-auto text-start"
      style={{  minWidth: "200px" }}
    >
      {imageFileList.map(image => {
        return (
          <ListGroup.Item
            action
            href={`/dashboard/${image.imgName}`}
            key={image.imgName}
            as={Link}
            active={imageName == image.imgName}
            className="py-1"
          >
            {image.imgName}
          </ListGroup.Item>
        )
      })}

    </ListGroup>
  )
}