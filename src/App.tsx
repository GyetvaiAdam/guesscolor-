import React, { useEffect } from 'react'
import { useState } from 'react'
import "./App.css"
import Square from './components/Square'


type BoxType={
    id:string,
    bgcolor:string,
    clicked:boolean,
    found:boolean,
}


const COUNT = 64
const data = Array.from({length:COUNT}, ()=>({
    id:"",
    bgcolor:"",
    clicked: false,
    found:false,
}))

const randomcolor = () =>{return `rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`}

function App() {
  const [start,setstart] =useState(true)
  const [guesscolor, setguesscolor] = useState("")
  const [boxes, setboxes] = useState<BoxType[]>(data)
  const [clickedbox, setclickedbox] = useState<string[]>([])
  const [gamestatus, setgamestatus] = useState<boolean>(true)

  const reset = () =>{
    setstart(prev=>!prev)
    setgamestatus(true)
    randomcolor()
    setclickedbox([])
  }

  const clickhandler= (id:string)=>{
    if(!gamestatus)return;
    if(!clickedbox.includes(id)){setclickedbox(prev => [...prev, id])}
    setboxes(boxes.map(box => box.id === id && !box.clicked ? {...box, clicked: !box.clicked} : box))


    const currentclickedBox = boxes.find(box => box.id === id);

    if (currentclickedBox && !currentclickedBox.clicked) {
      const isCorrect = currentclickedBox.bgcolor === guesscolor;

      setboxes(prev => prev.map(box =>box.id === id ? {...box, clicked: true, found: isCorrect}: box));

      if (isCorrect) {
        alert('Gratulálok, eltaláltad a színt!');
        setgamestatus(false);
      } else {
        alert('Helytelen! Próbálkozz újra.');
      }

      setclickedbox(prev => [...prev, id]);
    }
    
  }
  

  useEffect(()=>{
    const colors = Array.from({length:COUNT},() => randomcolor())
    setguesscolor(colors[Math.floor(Math.random()*COUNT)])

    setboxes(prev => prev.map((_,i) => ( 
      {
        id:`b${i+1}`, 
        bgcolor: colors[i], 
        clicked: false, 
        found: false
      }
    )))
  }, [start])

  return (
    <>
      <header>
        <h1>Találd ki a színt</h1>
        <h3>A szín kódja: <span>{guesscolor}</span></h3>
        <p>próbák száma: {clickedbox.length}</p>
      </header>
      <main>
        <section>
            {boxes.map((b,i)=><Square key={i} id={b.id} bgcolor={b.bgcolor} clicked={false} found={false} clickfn={()=>clickhandler(b.id)}/>)}
        </section>
        <button onClick={reset}>Újrakezdés</button>
      </main>
    </>
  )
}

export default App
