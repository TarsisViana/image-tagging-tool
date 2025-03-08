import { useAppContext } from "@/context/AppContext"

export default function FileList() {
  const {imageFileList} = useAppContext()
  return (
    <div>
      <p>file list:</p>
      {imageFileList.map(image => {
        return <p key={image.imgName}>{image.imgName}</p>
      })}
    </div>
  )
}