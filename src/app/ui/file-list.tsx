import { useAppContext } from "@/context/AppContext"
import Link from "next/link"
import { ListGroup } from "react-bootstrap"

export default function FileList() {
  const {imageFileList} = useAppContext()
  return (
    <ListGroup defaultActiveKey="">
      {imageFileList.map(image => {
        return (
          <ListGroup.Item
            action
            href={`/dashboard/${image.imgName}`}
            key={image.imgName}
            as={Link}
          >
            {image.imgName}
          </ListGroup.Item>
        )
      })}

    </ListGroup>
  )
}