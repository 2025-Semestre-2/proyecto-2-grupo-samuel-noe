
import { useState } from 'react'
import axios from 'axios'
import { Textbox } from "../../Components/Textbox"

export function InsertarCliente(){

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

    //Limpia las casillas
    const LimpiarCliente = () => {
        setNombre('')
        setApellido1('')
        setApellido2('')
        setFechaNacimiento('')
        setTipoIdentificacion('')
        setIdentificacion('')
        setPaisResidencia('')
        setProvincia('')
        setCanton('')
        setDistrito('')
        setCorreo('')
    }

    const mandarRequest = async () => {

        try {
            //let sirve para crear una variable local dentro de la funcion
            //sino, no podria usar el if así
            let fechaNacimientoISO
            if (fechaNacimiento) {
                // toISOString().split('T')[0] quita la hora y deja solo YYYY-MM-DD
                fechaNacimientoISO = new Date(fechaNacimiento).toISOString().split('T')[0]
            } 
            else {
                fechaNacimientoISO = null; //es un NOT NULL, cambiar luego
            }

            await axios.post('http://localhost:3000/api/cliente', {
            Nombre: nombre,
            PrimerApellido: apellido1,
            SegundoApellido: apellido2,
            FechaNacimiento: fechaNacimientoISO,
            TipoIdentificacion: tipoIdentificacion,
            NumeroIdentificacion: identificacion,
            PaisResidencia: paisResidencia,
            Provincia: provincia,
            Canton: canton,
            Distrito: distrito,
            CorreoElectronico: correo
            })
            alert(' Insertado correctamente')
            LimpiarCliente()
        } 
        catch (e) {
            alert(' Error al insertar: ' + e.message)
            console.error(e)
        }
    }

    return (
    <>
      <h1>Insertar Cliente</h1>
      
      <div style={{
        border: '2px solid #333',
        borderRadius: '4px',
        padding: '30px',
        backgroundColor: '#f9f9f9',
      }}>
      
        <div className="form-group">
        <label>Nombre del Cliente: </label>
        <Textbox
            type="text"
            placeholder=""
            value={nombre}
            onChange={setNombre}
        />
        </div>

        <div className="form-group">
        <label>Apellido 1: </label>
        <Textbox
            type="text"
            placeholder=""
            value={apellido1}
            onChange={setApellido1}
        />
        </div>

        <div className="form-group">
        <label>Apellido 2: </label>
        <Textbox
            type="text"
            placeholder=""  
            value={apellido2}
            onChange={setApellido2}
        />
        </div>

        <div className="form-group">
        <label>Fecha de Nacimiento: </label>
        <Textbox
            type="date"
            placeholder=""  
            value={fechaNacimiento}
            onChange={setFechaNacimiento}
        />
        </div>

        <div className="form-group">
        <label>Tipo de Identificación: </label>
        <Textbox
            type="text"
            placeholder=""  
            value={tipoIdentificacion}
            onChange={setTipoIdentificacion}
        />
        </div>

        <div className="form-group">
        <label>Identificación: </label>
        <Textbox
            type="text"
            placeholder=""  
            value={identificacion}
            onChange={setIdentificacion}
        />
        </div>

        <div className="form-group">
        <label>País de Residencia: </label>
        <Textbox
            type="text"
            placeholder=""  
            value={paisResidencia}
            onChange={setPaisResidencia}
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
        <label>Correo electrónico: </label>
        <Textbox
            type="text"
            placeholder=""
            value={correo}
            onChange={setCorreo}
        />
        </div>
        
        <div style={{ display: 'flex', gap: '100px', justifyContent: 'center' }}>
            <button onClick={mandarRequest}>Aceptar</button>
            <button onClick={LimpiarCliente}>Cancelar</button>
        </div>

      </div>
    </>
  )
}