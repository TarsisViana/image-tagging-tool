import { useAppContext } from "@/context/AppContext"
import { useTagContext } from "@/context/TagToolContext"
import Link from "next/link"
import { ListGroup } from "react-bootstrap"

export default function FileList() {
  const { imageFileList } = useAppContext()
  const {imageName} = useTagContext()
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