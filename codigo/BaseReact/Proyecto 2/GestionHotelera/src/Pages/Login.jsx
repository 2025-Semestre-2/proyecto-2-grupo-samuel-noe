
import '../App.css'  
import { Link } from "react-router-dom"
import { Textbox } from "../Components/Textbox"

import { useState } from 'react'


export function Login(){

    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')


    //Verifica que exista el usuario con la contraseña
    function verificarUsuario(user, password){
        if (user === "sammy") {
            if (password === "1234") {
                //alert("Usuario Válido")
                return true
            }
        } 
        alert("Usuario o Contraseña No Válida")
        return false
    }


    return(
        <>
            <h1> Sistema de Gestión Hotelera </h1>
            <h3>Inicie Sesión</h3>

            <Textbox
                type="text"
                placeholder="Usuario"
                value={user}
                onChange={setUser}
            />
            <br />
            <br />

            <Textbox
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={setPassword}
            />
            <br />
            <br />

            <Link to="/Home" onClick={(e) => {
                if(!verificarUsuario(user, password)){e.preventDefault();}}}>
                <button >
                    Ingresar
                </button>
            </Link>
        </>
    )
}

//Scrap
/*

<input type="text" />       // Texto normal (se ve)
<input type="password" />   // Texto oculto (•••••)
<input type="email" />      // Valida formato email
<input type="number" />     // Solo números
<input type="tel" />        // Número telefónico
<input type="search" />     // Para búsquedas

*/