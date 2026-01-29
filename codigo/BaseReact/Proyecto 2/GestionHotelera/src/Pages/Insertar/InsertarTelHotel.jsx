
import { useState } from 'react'
import axios from 'axios'
import { Textbox } from "../../Components/Textbox"
import { ButtonSection1 } from '../../Components/ButtonSection'
import { validarNull, validarInt } from '../../Components/Validaciones'

export function InsertarTelHotel(){

    const [IdHospedaje, setIdHospedaje] = useState('')
    const [CodigoPais, setCodigoPais] = useState('')
    const [NumeroTelefono, setNumeroTelefono] = useState('')
    const [validado, setValidado] = useState(false)

    //Limpia las casillas
    const LimpiarTelHotel = () => {
        setIdHospedaje('')
        setCodigoPais('')
        setNumeroTelefono('')
        setValidado(false)
    }
    
    const validacionesTelHotel = () => {
     
        const idHospedajeValido = validarNull(IdHospedaje, 'Identificación Hospedaje');
        if (!idHospedajeValido.esValido) {
            alert(idHospedajeValido.mensaje);
            return;
        }
        const codigoValido = validarNull(NumeroTelefono, 'Número de Teléfono');
        if (!codigoValido.esValido) {
            alert(codigoValido.mensaje);
            return;
        }
        const numeroValido = validarNull(NumeroTelefono, 'Número de Teléfono');
        if (!numeroValido.esValido) {
            alert(numeroValido.mensaje);
            return;
        }

        const idHospedajeValido2 = validarInt(IdHospedaje, 'Identificación Hospedaje');
        if (!idHospedajeValido2.esValido) {
            alert(idHospedajeValido2.mensaje);
            return;
        }
        const codigoValido2 = validarNull(NumeroTelefono, 'Número de Teléfono');
        if (!codigoValido2.esValido) {
            alert(codigoValido2.mensaje);
            return;
        }
        const numeroValido2 = validarNull(NumeroTelefono, 'Número de Teléfono');
        if (!numeroValido2.esValido) {
            alert(numeroValido2.mensaje);
            return;
        }

        setValidado(true);
    }

    const mandarRequest = async () => {
        //Codigo 
        
        LimpiarTelHotel()
    }

    return (
    <>
      <h1>Insertar Teléfono de Hotel</h1>

      <div style={{
        border: '2px solid #333',
        borderRadius: '4px',
        padding: '20px',
        backgroundColor: '#f9f9f9',
      }}>
      
        <div className="form-group">
        <label>Identificación Hospedaje: </label>
        <Textbox
            type="text"
            placeholder=""
            value={IdHospedaje}
            onChange={setIdHospedaje}
        />
        </div>

        <div className="form-group">
        <label>Teléfono del Hotel: </label>
        <Textbox
            type="text"
            placeholder=""
            value={NumeroTelefono}
            onChange={setNumeroTelefono}
        />
        </div>

        <div className="form-group">
        <label>Código País: </label>
        <Textbox
            type="text"
            placeholder=""
            value={CodigoPais}
            onChange={setCodigoPais}
        />
        </div> 
        
        <div style={{ display: 'flex', gap: '100px', justifyContent: 'center' }}>
            <button onClick={() => {
                validacionesTelHotel()
                if(validado){mandarRequest()}
            }}>Aceptar</button>
            <button>Cancelar</button>
        </div>

      </div>
    </>
  )
}


        /*
        if(validarNull(IdHospedaje).esValido === false || 
        validarNull(CodigoPais).esValido === false || 
        validarNull(NumeroTelefono).esValido === false)
        {
            alert('Error. Hay un campo vacío.')
            return
        }
        if(validarInt(IdHospedaje).esValido === false)
        {
            alert('Error. Digite un número entero válido para Identificación Hospedaje.')
            return
        }
        */