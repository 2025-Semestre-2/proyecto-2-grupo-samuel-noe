
import { useState } from 'react'
import axios from 'axios'
import { Textbox } from "../../Components/Textbox"
import { ButtonSection1 } from '../../Components/ButtonSection'
//import { validarNull, validarInt } from '../../Components/Validaciones'

export function InsertarTelHotel(){

  const [IdHospedaje, setIdHospedaje] = useState('')
  const [CodigoPais, setCodigoPais] = useState('')
  const [NumeroTelefono, setNumeroTelefono] = useState('')
  
  const mandarRequest = async () => {

      try {
          await axios.post('http://localhost:3000/api/hospedaje-telefonos', {
          IdHospedaje: parseInt(IdHospedaje),
          CodigoPais: parseInt(CodigoPais),
          NumeroTelefono: parseInt(NumeroTelefono),
          });
          alert(' Insertado correctamente');
          setIdHospedaje('');
          setCodigoPais('');
          setNumeroTelefono('');
      } 
      catch (e) {
          alert(' Error al insertar: ' + e.message);
          console.error(e);
      }
  };

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
            <button onClick={mandarRequest}>Aceptar</button>
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