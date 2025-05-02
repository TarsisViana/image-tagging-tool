'use-client'

import { createLabel } from "@/app/lib/actions";
import { useTagContext } from "@/context/TagToolContext";
import { Dispatch, KeyboardEvent, SetStateAction, useEffect, useRef, useState } from "react"
import { Form, Modal } from "react-bootstrap"
import Button from 'react-bootstrap/Button'
import FileList from "./file-list";
import useKeyPress from "./useKeyPress";

export default function SideBar() {
  const { tagList, selectedId, selectTag, deleteTag, edit, setEdit, editTagValue } = useTagContext()
  const inputRef = useRef<HTMLInputElement>(null)
  const inputDiv = useRef<HTMLDivElement>(null)
  const [inputValue, setValue] = useState('')

  //set keyboard shortcuts
  const shortcutKeys = ['w', 'Delete']
  useKeyPress(shortcutKeys, keybordShortcutHandler)  

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
    editTagValue(e.target.value)
  }

  function keybordShortcutHandler(event: KeyboardEvent) {
    if (event.key == "Delete") {
      deleteTag()
    } else if (event.key == "w" && event.altKey) {
      setEdit(!edit)
      if (edit) selectTag(null)
    } 
  }

  return (
    <div
      className='col-3 d-flex flex-column gap-1 h-100 w-100'
      ref= {inputDiv}
    >
      <div className="d-flex px-2 align-items-center">
        <h4 className="flex-grow-1 m-0">{`${edit ? 'Edit' : 'Create'} mode`}</h4>
        <Button
          variant={edit ? 'success' : 'danger'}
          onClick={() => {
            setEdit(!edit)
            if(edit) selectTag(null)
          }}
        >
          {edit? 'Create' : 'Edit'}
        </Button>
      </div>
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
        size="sm"
        className="mx-1"
        onKeyDown={keybordShortcutHandler}
      >
        Delete Tag
      </Button>
      <hr />
      <p>File list:</p>
      <div className="overflow-y-auto">
        <FileList/>
      </div>
    </div>
  )
}

function LabelList() {
  
  const { labelList, selectedId, tagList, editLabel } = useTagContext();
  
  const [modalShow, setModalShow] = useState(false);
  const [currentName, setCurrentName] = useState<string | null>(null);

  const [keys, setKeys] = useState<string[]>([])
  

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

  //shortcuts
  useEffect(() => {
    //limit to 10 label shortcuts
    const size = labelList.length
    const arr = Array.from({length:size <= 10 ? size : 10}, (e,i) => `${i+1}`)
    setKeys(arr)
  }, [labelList])
  
  useKeyPress(keys, shortcutHandler)

  function shortcutHandler(event: React.KeyboardEvent) {
    if (selectedId && event.altKey) {
      // the 0 key is the 10th label
      const index = parseInt(event.key) == 0 ? 9 : parseInt(event.key)-1
      const label = labelList[index]
      editLabel(label)
      setCurrentName(label)
    }
  }
  
  return (
    <>
      <div className="d-grid gap-1 m-3"> 
        {labelList.map((label, index) => {
          return ( 
            <Button
              key={index}
              variant={'outline-secondary'}
              onClick={handleClick}
              id={label}
              active={currentName === label}
              size="sm"
            >
              {label}
            </Button>
          )  
        })}
        
      </div>
      <Button
        variant="primary"
        onClick={handleShow}
        size="sm"
      >
        New Label
      </Button>
      <Dialog show={modalShow} setShow={setModalShow} />
      
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