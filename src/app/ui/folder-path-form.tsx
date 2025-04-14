'use Client'

import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import { getFolderPath } from '../lib/actions'
import { Button, InputGroup } from 'react-bootstrap'
import { useAppContext } from '@/context/AppContext'

export default function FolderPathForm() {
  const { setImageList, setLabels, setPath } = useAppContext()
  
  const [value, setValue] = useState('/home/tarsis/Documents/test_imgs')
  const [pathCheck, setPathCheck] = useState(false)

  function handleSubmit() {
    const res = getFolderPath(value)
    res.then( data => {
      const response = JSON.parse(data)
      if (response.success) {
        setPathCheck(true)
        setImageList(response.imageList)
        setLabels(response.labels)
        setPath(value)
      } else {
        setPathCheck(false)
      }
    })
  }

  return (
    <Form noValidate>
      <Form.Group className='mb-5 m-5' controlId='folderInput'> 
        <InputGroup>
          <InputGroup.Text>Folder path:</InputGroup.Text>
          <Form.Control
            value={value}
            type='text'
            name='file'
            onChange={(e) => setValue(e.target.value)}
            isValid={pathCheck}
            isInvalid={!pathCheck}
          />
          
          <Form.Control.Feedback
            className='position-absolute top-100'
            type='valid'
          >Looks good!
          </Form.Control.Feedback>
          <Form.Control.Feedback
            type='invalid'
            className='position-absolute top-100'
          >Folder not found!
          </Form.Control.Feedback>
          <Button
            type='button'
            variant='light'
            className='border'
            style={{marginLeft:".1px"}}
            onClick={handleSubmit}>Save</Button>
        </InputGroup>
      </Form.Group>
      
    </Form>
  )
}