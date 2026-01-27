
import { useState } from 'react'
import { Textbox } from "../../Components/Textbox"
import axios from 'axios'

export function InsertarHotel(){

  const [nombre, setNombre] = useState('')
  const [cedulaJuridica, setCedulaJuridica] = useState('')
  const [tipoHospedaje, setTipoHospedaje] = useState('')
  const [provincia, setProvincia] = useState('')
  const [canton, setCanton] = useState('')
  const [distrito, setDistrito] = useState('')
  const [barrio, setBarrio] = useState('')
  const [seniasExactas, setSeniasExactas] = useState('')
  const [refGps, setRefGps] = useState('')
  const [correo, setCorreo] = useState('')
  const [url, setUrl] = useState('')

    //Limpia las casillas
    const LimpiarHotel = () => {
        setNombre('')
        setCedulaJuridica('')
        setTipoHospedaje('')
        setProvincia('')
        setCanton('')
        setDistrito('')
        setBarrio('')
        setSeniasExactas('')
        setRefGps('')
        setCorreo('')
        setUrl('')
    }
    /*
    const mandarRequest = async () => {
        try {
            await axios.post('http://localhost:3000/api/hospedaje', {
            NombreComercial: nombre,
            CedulaJuridica: cedulaJuridica,
            TipoHospedaje: tipoHospedaje,
            Provincia: provincia,
            Canton: canton,
            Distrito: distrito,
            Barrio: barrio,
            SenasExactas: seniasExactas,
            ReferenciaGPS: refGps,
            CorreoElectronico: correo,
            URL: url
            })
            alert(' Insertado correctamente')
            LimpiarCliente()
        } 
        catch (e) {
            alert(' Error al insertar: ' + e.message)
            console.error(e)
        }
    }
    */
    return (
    <>
      <h1>Insertar Hotel</h1>

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
        <label>Señas Exactas: </label>
        <Textbox
            type="text"
            placeholder=""
            value={seniasExactas}
            onChange={setSeniasExactas}
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
            value={url}
            onChange={setUrl}
        />
        </div>
        
        <div style={{ display: 'flex', gap: '100px', justifyContent: 'center' }}>
            <button>Aceptar</button>
            <button onClick={LimpiarHotel}>Cancelar</button>
        </div>

      </div>
    </>
  )
}
/*
<button onClick={mandarRequest}>Aceptar</button>
*/