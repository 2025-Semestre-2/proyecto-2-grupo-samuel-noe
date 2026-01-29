
import { useState } from 'react'
import { Textbox } from "../../Components/Textbox"
import { validarNull, validarInt} from '../../Components/Validaciones'
import axios from 'axios'

export function ModificarActividad(){

  const [nombreActividad, setNombreActividad] = useState('')
  const [desc, setDesc] = useState('')
  const [precio, setPrecio] = useState('')
  const [validado, setValidado] = useState(false)

  //Limpia las casillas
  const LimpiarActividad = () => {
    setNombreActividad('')
    setDesc('')
    setPrecio('')
    setValidado(false)
  }

  const validacionesActividad = () => {

    const nombreValido = validarNull(nombreActividad, 'Nombre de la Actividad');
    if (!nombreValido.esValido) {
      alert(nombreValido.mensaje);
      return;
    }
    const descValido = validarNull(desc, 'Descripción');
    if (!descValido.esValido) {
      alert(descValido.mensaje);
      return;
    }
    const costoValido = validarNull(precio, 'Costo');
    if (!costoValido.esValido) {
      alert(costoValido.mensaje);
      return;
    }

    const costoValido2 = validarInt(precio, 'Costo');
    if (!costoValido2.esValido) {
      alert(costoValido2.mensaje);
      return;
    }

    setValidado(true);
  }

    const mandarRequest = async () => {
      //codigo
      LimpiarActividad()
    }

  return (
    <>
      <h1>Modificar Actividad</h1>
      
      <div style={{
        border: '2px solid #333',
        borderRadius: '4px',
        padding: '20px',
        backgroundColor: '#f9f9f9',
      }}>

        <div className="form-group">
        <label>Nombre de Actividad: </label>
        <Textbox
            type="text"
            placeholder=""
          value={nombreActividad}
          onChange={setNombreActividad}
        />
        </div>

        <div className="form-group">
        <label>Descripción: </label>
        <Textbox
            type="text"
            placeholder=""  
            value={desc}
            onChange={setDesc}
        />
        </div>

        <div className="form-group">
        <label>Costo: </label>
        <Textbox
            type="text"
            placeholder=""  
            value={precio}
            onChange={setPrecio}
        />
        </div>

        <div style={{ display: 'flex', gap: '100px', justifyContent: 'center' }}>
          <button onClick={() => {
              validacionesActividad()
              if(validado){mandarRequest()}
          }}>Aceptar</button>
          <button onClick={LimpiarActividad}>Cancelar</button>
        </div>

      </div>
    </>
  )
}