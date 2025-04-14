import { useAppContext } from "@/context/AppContext"
import { ListGroup } from "react-bootstrap"

export default function LabelList() {
  const { labelList } = useAppContext()
  return (
    <ListGroup
      variant="flush"
      className="overflow-auto border text-start"
      style={{ maxHeight: "350px", minWidth: "200px" }}
    >
      {labelList.map(label => {
        return (
          <ListGroup.Item
            variant="secondary"
            key={label}
          >
            {label}
          </ListGroup.Item>
        )
      })}

    </ListGroup>
  )
}