
import { useState } from 'react'
import { Textbox, TextboxBlock } from "../../Components/Textbox"
import { validarNull, validarInt } from '../../Components/Validaciones'
import axios from 'axios'

export function EliminarHotel(){

    const [idHotel, setIdHotel] = useState('')
    const [nombre, setNombre] = useState("Ejemplo Hotel")
    const [cedulaJuridica, setCedulaJuridica] = useState('')
    const [tipoHospedaje, setTipoHospedaje] = useState('')
    const [provincia, setProvincia] = useState('')
    const [canton, setCanton] = useState('')
    const [distrito, setDistrito] = useState('')
    const [barrio, setBarrio] = useState('')
    const [refGps, setRefGps] = useState('')
    const [correo, setCorreo] = useState('')
    const [url, setUrl] = useState('')
    const [validado, setValidado] = useState(false)

    //Limpia las casillas
    const LimpiarHotel = () => {
        setIdHotel('')
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
        setValidado(false)
    }

    const validacionesHotel = () => {
     
        const nombreValido = validarNull(nombre, 'Nombre Hotel');
        if (!nombreValido.esValido) {
            alert(nombreValido.mensaje);
            return;
        }
        const cedulaJuridicaValida = validarInt(cedulaJuridica, 'Cédula Jurídica');
        if (!cedulaJuridicaValida.esValido) {
            alert(cedulaJuridicaValida.mensaje);
            return;
        }
        const tipoValido = validarNull(tipoHospedaje, 'Tipo de Hospedaje');
        if (!tipoValido.esValido) {
            alert(tipoValido.mensaje);
            return;
        }
        const provinciaValida = validarNull(provincia, 'Provincia');
        if (!provinciaValida.esValido) {
            alert(provinciaValida.mensaje);
            return;
        }

        const cantonValido = validarNull(canton, 'Cantón');
        if (!cantonValido.esValido) {
            alert(cantonValido.mensaje);
            return;
        }
        const distritoValido = validarNull(distrito, 'Distrito');
        if (!distritoValido.esValido) {
            alert(distritoValido.mensaje);
            return;
        }
        const correoValido = validarNull(correo, 'Correo Electrónico');
        if (!correoValido.esValido) {
            alert(correoValido.mensaje);
            return;
        }
        setValidado(true);
    }

    const mandarRequest = async () => {
        //Codigo del request

        LimpiarHotel()
    }

    const verificarExistenciaHotel = async () => {
        if (!idHotel) {
            alert('Ingresa un ID de Hotel');
            return;
        }
        try {
            //codigo
        } 
        catch (e) {
            alert('Hotel no encontrado: ' + e.message);
            console.error(e);
        }
    }

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
        <label>ID de Hotel: </label>
        <Textbox
          type="text"
          placeholder=""
          value={idHotel}
          onChange={setIdHotel}
        />
        </div>
        <button onClick={verificarExistenciaHotel}>Buscar</button>
   
      </div>
      
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
            value={url}
            onChange={setUrl}
        />
        </div>

        <div style={{ display: 'flex', gap: '100px', justifyContent: 'center' }}>
            <button onClick={() => {
                validacionesHotel()
                if(validado){mandarRequest()}
            }}>Aceptar</button>
            <button onClick={LimpiarHotel}>Cancelar</button>
        </div>

      </div>
    </>
  )
}