import { useAppContext } from "@/context/AppContext"

export default function LabelList() {
  const { labelList } = useAppContext()
  return (
    <div>
      <p>label list</p>
      {labelList.map(label => {
        if(label) return <p key={label}>{label}</p>
      })}
      <button>edit</button>
    </div>
  )
}