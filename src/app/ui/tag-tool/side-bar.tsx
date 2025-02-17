'use-client'

import { createLabel } from "@/app/lib/actions";
import { useTagContext } from "@/context/TagToolContext";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import { Form, Modal } from "react-bootstrap"
import Button from 'react-bootstrap/Button'

export default function SideBar() {
  const { tagList, selectedId, selectTag, deleteTag, edit, setEdit, editTagValue } = useTagContext()
  const inputRef = useRef<HTMLInputElement>(null)

  const [inputValue, setValue] = useState('')

  

  useEffect(() => {
    const input = inputRef.current;
    if (selectedId && input) {
      input.focus();
      const value = tagList.find(tag => tag.id === selectedId)?.value
      if (value) {
        setValue(value)
      }
      else {
        setValue('')
      }
    } else {
      setValue('')
    }
  }, [selectedId, tagList])
  
  function handleChange(e:React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
    //make function to change value
    editTagValue(e.target.value)
  }

  function handleDownload() {
    const jsonString = JSON.stringify(tagList)
    const blob = new Blob([jsonString], { type: 'text/json' })
    
    const a = document.createElement('a')
    a.download = 'test.json'
    a.href = window.URL.createObjectURL(blob)
    const clickEvt = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    })
    a.dispatchEvent(clickEvt)
    a.remove()
  }
  return (
    <>
      <Button
        variant={edit ? 'success' : 'danger'}
        onClick={() => {
          setEdit(!edit)
          if(edit) selectTag(null)
        }}
      >edit</Button>
      <div className="d-flex flex-column m-1">
        <Form onSubmit={ e => e.preventDefault()}>
          <Form.Group className="" controlId="tagValueForm">
            <Form.Label>Value:</Form.Label>
            <Form.Control
              type="text"
              name='tagValue'
              ref={inputRef}
              disabled={selectedId ? false : true}
              value={inputValue}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
        <LabelList />
      </div>
      
      <Button
        variant="danger"
        onClick={deleteTag}
      >
        Delete Tag
      </Button>
      <Button
        variant="dark"
        onClick={handleDownload}
      >
        Download
      </Button>
    </>
  )
}

function LabelList() {
  const { labelList, selectedId, tagList, editLabel } = useTagContext();
  
  const [modalShow, setModalShow] = useState(false);
  const [currentName, setCurrentName] = useState<string | null>(null);
  

  useEffect(() => {
    const label = tagList.find((tag) => tag.id == selectedId)?.label
    if (label) {
      setCurrentName(label)
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
      editLabel(button.id)
      setCurrentName(button.id)
    }
    
  }
  
  return (
    <>
      <div className="d-grid gap-2 m-3"> 
        {labelList.map((label, index) => {
          return ( 
            <Button
              key={index}
              variant={'outline-secondary'}
              onClick={handleClick}
              id={label.name}
              active={currentName === label.name}
            >
              {label.name}
            </Button>
          )  
        })}
        
      </div>
      <Button
        variant="primary"
        onClick={handleShow}
      >New Label
      </Button>
      <Dialog show={modalShow} setShow={setModalShow}/>
    </>
  )
}

function Dialog({ show, setShow }: {
  show: boolean,
  setShow: Dispatch<SetStateAction<boolean>>,
}) {
  const { addLabel } = useTagContext()
  const inputRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  
  const handleClose = () => setShow(false);
  
  function handleSave() {
    const input  = inputRef?.current
    if (input) {
      addLabel(input.value)
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
          <form action={createLabel} ref={formRef}>
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