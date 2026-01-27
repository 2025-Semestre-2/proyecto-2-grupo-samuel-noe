
import { useState } from 'react'
import { Textbox, TextboxBlock } from "../../Components/Textbox"
import { ButtonSection1 } from '../../Components/ButtonSection'

export function EliminarHotel(){

  const [nombre, setNombre] = useState("Ejemplo Hotel")
  const [cedulaJuridica, setCedulaJuridica] = useState('')
  const [tipoHospedaje, setTipoHospedaje] = useState('')
  const [provincia, setProvincia] = useState('')
  const [canton, setCanton] = useState('')
  const [distrito, setDistrito] = useState('')
  const [barrio, setBarrio] = useState('')
  const [refGps, setRefGps] = useState('')
  const [correo, setCorreo] = useState('')
  const [Url, setUrl] = useState('')

  return (
    <>
      <h1>Eliminar Hotel</h1>

      <div style={{
        border: '2px solid #333',
        borderRadius: '4px',
        padding: '30px',
        backgroundColor: '#f9f9f9',
      }}>
      
        <div className="form-group">
        <label>Nombre del Hotel: </label>
        <TextboxBlock
            type="text"
            value={nombre}
            onChange={setNombre}
        />
        </div>

        <div className="form-group">
        <label>Cédula Jurídica: </label>
        <TextboxBlock
            type="text"
            value={cedulaJuridica}
            onChange={setCedulaJuridica}
        />
        </div>

        <div className="form-group">
        <label>Tipo de Hospedaje: </label>
        <TextboxBlock
            type="text"
            value={tipoHospedaje}
            onChange={setTipoHospedaje}
        />
        </div>

        <div className="form-group">
        <label>Provincia: </label>
        <TextboxBlock
            type="text"
            value={provincia}
            onChange={setProvincia}
        />
        </div>

        <div className="form-group">
        <label>Cantón: </label>
        <TextboxBlock
            type="text"
            value={canton}
            onChange={setCanton}
        />
        </div>

        <div className="form-group">
        <label>Distrito: </label>
        <TextboxBlock
            type="text"
            value={distrito}
            onChange={setDistrito}
        />
        </div>

        <div className="form-group">
        <label>Barrio: </label>
        <TextboxBlock
            type="text"
            value={barrio}
            onChange={setBarrio}
        />
        </div>

        <div className="form-group">
        <label>Referencia GPS: </label>
        <TextboxBlock
            type="text"
            value={refGps}
            onChange={setRefGps}
        />
        </div>

        <div className="form-group">
        <label>Correo Electrónico: </label>
        <TextboxBlock
            type="text"
            value={correo}
            onChange={setCorreo}
        />
        </div>

        <div className="form-group">
        <label>URL: </label>
        <TextboxBlock
            type="text"
            value={Url}
            onChange={setUrl}
        />
        </div>

        
        <ButtonSection1/>

      </div>
    </>
  )
}