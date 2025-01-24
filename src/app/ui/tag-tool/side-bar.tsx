'use-client'

import { createTagName } from "@/app/lib/actions";
import { useTagContext } from "@/context/TagToolContext";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import { Modal } from "react-bootstrap"
import Button from 'react-bootstrap/Button'

export default function SideBar() {
  const { selectedId, deleteTag } = useTagContext()
  return (
    <>
      <p>{selectedId}</p>
      <TagNameList />
      <Button
        variant="danger"
        onClick={deleteTag}
      >
        Delete Tag
      </Button>
    </>
  )
}

function TagNameList() {
  const { tagNameList, selectedId, tagList, editTagName } = useTagContext();
  
  const [modalShow, setModalShow] = useState(false);
  const [currentName, setCurrentName] = useState<string | null>(null);
  

  useEffect(() => {
    const tagName = tagList.find((tag) => tag.id == selectedId)?.tagName
    if (tagName) {
      setCurrentName(tagName)
    } else {
      setCurrentName(null)
    }
    
  
  },[selectedId,tagList])

  function handleShow() {
    setModalShow(true)
  }

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (selectedId) {
      const button = e.target as HTMLButtonElement
      editTagName(button.id)
      setCurrentName(button.id)
    }
    
  }
  
  return (
    <>
      <Button
        variant="primary"
        onClick={handleShow}
      >Add Tag Name
      </Button>
      <div className="d-grid gap-2 m-3"> 
        {tagNameList.map((name, index) => {
          return ( 
            <Button
              key={index}
              variant={'outline-secondary'}
              onClick={handleClick}
              id={name}
              active={currentName === name}
            >
              {name}
            </Button>
          )  
        })}
        
      </div>
      <Dialog show={modalShow} setShow={setModalShow}/>
    </>
  )
}

function Dialog({ show, setShow }: {
  show: boolean,
  setShow: Dispatch<SetStateAction<boolean>>,
}) {
  const { addTagName } = useTagContext()
  const inputRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  
  const handleClose = () => setShow(false);
  
  function handleSave() {
    const input  = inputRef?.current
    if (input) {
      addTagName(input.value)
    }
    setShow(false)
  }

  return (
    
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Tag Name</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <form action={createTagName} ref={formRef}>
            <label htmlFor="tag-name" className="col-form-label">Name:</label>
            <input
              type="text"
              className="form-control"
              id="tag-name"
              ref={inputRef}
            />
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  
  )
}