
import { useState } from 'react'
import { Textbox } from "../../Components/Textbox"
import { ButtonSection1 } from '../../Components/ButtonSection'

export function ModificarHotel(){

  const [nombre, setNombre] = useState('')
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
      <h1>Modificar Hotel</h1>

      <div style={{
        border: '2px solid #333',
        borderRadius: '4px',
        padding: '30px',
        backgroundColor: '#f9f9f9',
      }}>
      
        <div className="form-group">
        <label>Nombre del Hotel: </label>
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
        <label>Tipo de Hospedaje: </label>
        <Textbox
            type="text"
            placeholder=""  
            value={tipoHospedaje}
            onChange={setTipoHospedaje}
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
        <label>Cantón: </label>
        <Textbox
            type="text"
            placeholder=""
            value={canton}
            onChange={setCanton}
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
        <label>Barrio: </label>
        <Textbox
            type="text"
            placeholder=""
            value={barrio}
            onChange={setBarrio}
        />
        </div>

        <div className="form-group">
        <label>Referencia GPS: </label>
        <Textbox
            type="text"
            placeholder=""
            value={refGps}
            onChange={setRefGps}
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
        <label>URL: </label>
        <Textbox
            type="text"
            placeholder=""
            value={Url}
            onChange={setUrl}
        />
        </div>

        <ButtonSection1/>

      </div>
    </>
  )
}