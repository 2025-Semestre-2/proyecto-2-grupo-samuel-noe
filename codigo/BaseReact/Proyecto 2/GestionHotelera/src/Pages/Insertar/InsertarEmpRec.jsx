
import { useState } from 'react'
import { Textbox } from "../../Components/Textbox"
import { ButtonSection1 } from '../../Components/ButtonSection'

export function InsertarEmpRec(){

  const [nombre, setNombre] = useState('')
  const [cedulaJuridica, setCedulaJuridica] = useState('')
  const [correo, setCorreo] = useState('')
  const [telefono, setTelefono] = useState('')
  const [nombreContacto, setNombreContacto] = useState('')
  const [provincia, setProvincia] = useState('')
  const [canton, setCanton] = useState('')
  const [distrito, setDistrito] = useState('')
  const [seniasExactas, setSeniasExactas] = useState('')

  return (
    <>
      <h1>Insertar Empresa de Recreación</h1>

      <div style={{
        border: '2px solid #333',
        borderRadius: '4px',
        padding: '30px',
        backgroundColor: '#f9f9f9',
      }}>
      
        <div className="form-group">
        <label>Nombre de la Empresa: </label>
        <Textbox
            type="text"
            placeholder=""
            value={nombre}
            onChange={setNombre}
        />
        </div>

        <div className="form-group">
        <label>Cédula Jurídica: </label>
        <Textbox
            type="text"
            placeholder=""
            value={cedulaJuridica}
            onChange={setCedulaJuridica}
        />
        </div>

        <div className="form-group">
        <label>Correo Electrónico: </label>
        <Textbox
            type="text"
            placeholder=""  
            value={correo}
            onChange={setCorreo}
        />
        </div>

        <div className="form-group">
        <label>Teléfono: </label>
        <Textbox
            type="text"
            placeholder=""
            value={telefono}
            onChange={setTelefono}
        />
        </div>

        <div className="form-group">
        <label>Nombre Contacto: </label>
        <Textbox
            type="text"
            placeholder=""
            value={nombreContacto}
            onChange={setNombreContacto}
        />
        </div>

        <div className="form-group">
        <label>Provincia: </label>
        <Textbox
            type="text"
            placeholder=""
            value={provincia}
            onChange={setProvincia}
        />
        </div>

        <div className="form-group">
        <label>Distrito: </label>
        <Textbox
            type="text"
            placeholder=""
            value={distrito}
            onChange={setDistrito}
        />
        </div>

        <div className="form-group">
        <label>Señas Exactas: </label>
        <Textbox
            type="text"
            placeholder=""
            value={seniasExactas}
            onChange={setSeniasExactas}
        />
        </div>
        
        <ButtonSection1/>

      </div>
    </>
  )
}