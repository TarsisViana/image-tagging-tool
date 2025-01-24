'use-client'

import { createTagName } from "@/app/lib/actions";
import { useTagContext } from "@/context/TagToolContext";
import { useEffect, useRef, useState } from "react"
import { Modal } from "react-bootstrap"
import Button from 'react-bootstrap/Button'


export default function TagNameList() {
  const {tagNameList, selectedId, tagList, editTagName} = useTagContext()
  const [modalShow, setModalShow] = useState(false);
  const [currentName, setCurrentName] = useState()
  

  useEffect(() => {
    const tagName = tagList.find((tag) => tag.id == selectedId)?.name
    if (tagName) {
      setCurrentName(tagName)
    } else {
      setCurrentName(null)
    }
    
  
  },[selectedId,tagList])

  const handleShow = () => setModalShow(true)
  function handleClick(e) {
    console.log(e.target.id)
    if (selectedId) {
      editTagName(e.target.id)
      setCurrentName(e.target.id)
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
              key={name}
              variant={currentName === name ? 'secondary' : 'outline-secondary'}
              onClick={handleClick}
              id={name}
            >
              {name}
            </Button>
          )  
        })}
        
      </div>
      <Dialog show={modalShow} setShow={setModalShow} tagList ={tagNameList}/>
    </>
  )
}

function Dialog({show,setShow,tagList}) {
  const { addTagName } = useTagContext()
  const inputRef = useRef(null)
  const formRef = useRef(null)
  
  const handleClose = () => setShow(false);
  
  function handleSave() {
    const input : HTMLInputElement | null = inputRef.current
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