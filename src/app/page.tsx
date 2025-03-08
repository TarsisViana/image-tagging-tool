'use client'

import FolderPathForm from './ui/folder-path-form'
import { AppProvider } from '@/context/AppContext';
import FileList from './ui/file-list';
import LabelList from './ui/label-list';

export default function Home() {
  return (
    <AppProvider>
      <div className='container'>
        <div>
          <FolderPathForm/>
        </div>
        <div>
          <FileList />
          <LabelList/>
        </div>
      </div>
    </AppProvider>
  );
}
