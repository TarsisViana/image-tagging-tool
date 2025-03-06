import Link from "next/link";
import { getImageList } from "../lib/loader";
const folderPath = '/home/tarsis/Documents/test_imgs'
export default async function Page() {

  const fileList = await getImageList(folderPath)
  console.log(fileList)

  return (
    <>
      <div>
        <p>file list:</p>
        <ul>
          {fileList?.map((image) => {
            return <li key={image.name}>
              <Link href={`dashboard/${image.name}`}>{image.name}</Link>
            </li>
          })}
        </ul>
      </div>
    </>
  );
}