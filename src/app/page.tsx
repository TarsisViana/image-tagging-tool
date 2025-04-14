'use client'

import FolderPathForm from './ui/folder-path-form'
import FileList from './ui/tag-tool/file-list';
import LabelList from './ui/label-list';


export default function Home() {
  return (
    <div className='container' style={{maxWidth:"800px", height:"600px"}}>
      <div>
        <FolderPathForm/>
      </div>
      <div className='d-flex gap-5 justify-content-evenly h-75'>
        <div className='text-center h-100'>
          <h3 className='mb-0'>Images:</h3>
          <p className='mb-2'>click to edit</p>
          <div className='overflow-y-auto h-75'>
            <FileList />
          </div>
        </div>
        <div className='text-center'>
          <h3 style={{marginBottom:"1.9rem"}}>Labels:</h3>
          <LabelList />
        </div>
      </div>
    </div>
  );
}
