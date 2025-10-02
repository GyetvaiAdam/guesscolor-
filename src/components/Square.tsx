import "./square.css"

interface Squareprops{
    id:string,
    bgcolor:string,
    clicked:boolean,
    found:false,
    clickfn:(id:string) => void
}
const Square: React.FC<Squareprops> = ({id,bgcolor,clicked,clickfn}) => {
  return (
    <article style={{background:bgcolor}} id={id} onClick={()=>clickfn(id)} className={clicked ? "clicked" : ""}>
        {Number(id.slice(1))}
    </article>
  )
}

export default Square
