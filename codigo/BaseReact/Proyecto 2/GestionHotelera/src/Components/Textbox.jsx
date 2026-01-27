import { useState } from 'react'

//Funcion que permite ver si funciona el textbox
export function DiagTextbox(){

    const [text, setText] = useState("")
    function handleEvent(e){
        setText(e.target.value)
        console.log("Text just changed")
        console.log(e)
    }
    return(
        <>
            <input onChange={(e)=> handleEvent(e)}></input>
            <p>{text}</p>
        </>
    )
}

//Funcion que crea un textbox reutilizable
export function Textbox({ type = "text", placeholder, value, onChange}) {
  return (
    <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
    />
  );
}

//Funcion que crea un textbox no editable
export function TextboxBlock({ type = "text", value, onChange}) {
  return (
    <input
        disabled
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
    />
  );
}

//Scrap
/*
export function Textbox(){

    const [text, setText] = useState("")

    return(
        <>
            <input onChange={(e)=> setText(e.target.value)}></input>
            <p>{text}</p>
            
        </>
    )
}

export function Textbox(){

    const [text, setText] = useState("")

    return(
        <>
            <input onChange={(e)=> console.log(e)}></input>
            <p>{text}</p>
            
        </>
    )
}
*/
