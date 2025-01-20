'use-client'

import { createTagName } from "@/app/lib/actions";
import { useTagContext } from "@/context/TagToolContext";
import { useRef, useState } from "react"
import { Modal } from "react-bootstrap"
import Button from 'react-bootstrap/Button'


export default function TagNameList() {
  const{tagNameList} = useTagContext()
  const [modalShow, setModalShow] = useState(false);

  const handleShow= () => setModalShow(true)
  
  return (
    <>
      <Button
        variant="primary"
        onClick={handleShow}
      >Add Tag Name
      </Button>
      <ul className="list-group">
        {tagNameList.map(name => {
          return <button
            className="list-group-item list-group-item-action"
            key={name}
          >{name}</button>
        })}
      </ul>
      <Dialog show={modalShow} setShow={setModalShow} tagList ={tagNameList}/>
    </>
  )
}

function Dialog({show,setShow,tagList}) {
  const { addTagName } = useTagContext()
  const inputRef = useRef(null)
  const formRef = useRef(null)
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
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