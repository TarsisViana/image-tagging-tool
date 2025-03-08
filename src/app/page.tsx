'use client'

import FolderPathForm from './ui/folder-path-form'
import FileList from './ui/file-list';
import LabelList from './ui/label-list';
import Link from 'next/link';

export default function Home() {
  return (
    <div className='container'>
      <div>
        <FolderPathForm/>
      </div>
      <div>
        <FileList />
        <LabelList/>
      </div>
      <Link href='/dashboard'>dashboard</Link>
    </div>
  );
}
