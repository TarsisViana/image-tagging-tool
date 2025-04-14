'use client'

import FolderPathForm from './ui/folder-path-form'
import FileList from './ui/tag-tool/file-list';
import LabelList from './ui/label-list';


export default function Home() {
  return (
    <div className='container' style={{maxWidth:"800px", minHeight:"600px"}}>
      <div>
        <FolderPathForm/>
      </div>
      <div className='d-flex gap-5 justify-content-evenly'>
        <div className='text-center'>
          <h3 className='mb-0'>Images:</h3>
          <p className='mb-2'>click to edit</p>
          <FileList/>
        </div>
        <div className='text-center'>
          <h3 style={{marginBottom:"1.9rem"}}>Labels:</h3>
          <LabelList />
        </div>
      </div>
    </div>
  );
}
