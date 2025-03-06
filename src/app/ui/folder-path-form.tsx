'use Client'

import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import { getFolderPath } from '../lib/actions'
import { Button } from 'react-bootstrap'

export default function FolderPathForm({setImageList}) {
  const [value, setValue] = useState('')
  const [pathCheck, setPathCheck] = useState(false)

  function handleSubmit() {
    const res = getFolderPath(value)
    res.then( data => {
      const response = JSON.parse(data)
      if (response.success) {
        setPathCheck(true)
        setImageList(response.images)
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