
import { useState } from 'react'
import { Textbox, TextboxBlock } from "../../Components/Textbox"
import { ButtonSection1 } from '../../Components/ButtonSection'

export function EliminarCliente(){

  const [nombre, setNombre] = useState('')
  const [apellido1, setApellido1] = useState('')
  const [apellido2, setApellido2] = useState('')
  const [fechaNacimiento, setFechaNacimiento] = useState('')
  const [tipoIdentificacion, setTipoIdentificacion] = useState('')
  const [identificacion, setIdentificacion] = useState('')
  const [paisResidencia, setPaisResidencia] = useState('')
  const [provincia, setProvincia] = useState('')
  const [canton, setCanton] = useState('')
  const [distrito, setDistrito] = useState('')
  const [correo, setCorreo] = useState('')

  return (
    <>
      <h1>Eliminar Cliente</h1>
      
      <div style={{
        border: '2px solid #333',
        borderRadius: '4px',
        padding: '30px',
        backgroundColor: '#f9f9f9',
      }}>
      
        <div className="form-group">
        <label>Nombre del Cliente: </label>
        <TextboxBlock
            type="text"
            placeholder=""
            value={nombre}
            onChange={setNombre}
        />
        </div>

        <div className="form-group">
        <label>Apellido 1: </label>
        <TextboxBlock
            type="text"
            placeholder=""
            value={apellido1}
            onChange={setApellido1}
        />
        </div>

        <div className="form-group">
        <label>Apellido 2: </label>
        <TextboxBlock
            type="text"
            placeholder=""  
            value={apellido2}
            onChange={setApellido2}
        />
        </div>

        <div className="form-group">
        <label>Fecha de Nacimiento: </label>
        <TextboxBlock
            type="text"
            placeholder=""  
            value={fechaNacimiento}
            onChange={setFechaNacimiento}
        />
        </div>

        <div className="form-group">
        <label>Tipo de Identificación: </label>
        <TextboxBlock
            type="text"
            placeholder=""  
            value={tipoIdentificacion}
            onChange={setTipoIdentificacion}
        />
        </div>

        <div className="form-group">
        <label>Identificación: </label>
        <TextboxBlock
            type="text"
            placeholder=""  
            value={identificacion}
            onChange={setIdentificacion}
        />
        </div>

        <div className="form-group">
        <label>País de Residencia: </label>
        <TextboxBlock
            type="text"
            placeholder=""  
            value={paisResidencia}
            onChange={setPaisResidencia}
        />
        </div>

        <div className="form-group">
        <label>Provincia: </label>
        <TextboxBlock
            type="text"
            placeholder=""
            value={provincia}
            onChange={setProvincia}
        />
        </div>

        <div className="form-group">
        <label>Cantón: </label>
        <TextboxBlock
            type="text"
            placeholder=""
            value={canton}
            onChange={setCanton}
        />
        </div>

        <div className="form-group">
        <label>Distrito: </label>
        <TextboxBlock
            type="text"
            placeholder=""
            value={distrito}
            onChange={setDistrito}
        />
        </div>

        <div className="form-group">
        <label>País de Residencia: </label>
        <TextboxBlock
            type="text"
            placeholder=""
            value={paisResidencia}
            onChange={setPaisResidencia}
        />
        </div>

        <div className="form-group">
        <label>Correo electrónico: </label>
        <TextboxBlock
            type="text"
            placeholder=""
            value={correo}
            onChange={setCorreo}
        />
        </div>
        
        <ButtonSection1/>

      </div>
    </>
  )
}