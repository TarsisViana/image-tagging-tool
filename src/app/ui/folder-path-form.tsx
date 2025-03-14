'use Client'

import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import { getFolderPath } from '../lib/actions'
import { Button } from 'react-bootstrap'
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
      <Form.Group className='mb-3' controlId='folderInput'>
        <Form.Label>Folder path:</Form.Label>
        <Form.Control
          value={value}
          type='text'
          name='file'
          onChange={(e) => setValue(e.target.value)}
          isValid={pathCheck}
          isInvalid={!pathCheck}
        />
        <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type='invalid'>Folder not found!</Form.Control.Feedback>
      </Form.Group>
      <Button type='button' onClick={handleSubmit}>save</Button>
    </Form>
  )
}