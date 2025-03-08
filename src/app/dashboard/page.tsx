'use client'

import Link from "next/link";
import { useAppContext } from "@/context/AppContext";

export default function Page() {
  const {imageFileList}= useAppContext()
  
  return (
    <>
      <div>
        <p>file list:</p>
        <ul>
          {imageFileList.map((image) => {
            return <li key={image.imgName}>
              <Link href={`dashboard/${image.imgName}`}>{image.imgName}</Link>
            </li>
          })}
        </ul>
      </div>
    </>
  );
}