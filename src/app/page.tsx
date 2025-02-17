import { getFolderPath } from "./lib/actions";


export default function Home() {
  return (
    <>
      <form action={getFolderPath}>
        <input type="file" name="file" directory="true" />
        <button type="submit">go</button>
      </form>
    </>
  );
}
