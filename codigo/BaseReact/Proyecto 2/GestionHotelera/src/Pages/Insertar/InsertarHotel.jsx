import { useState } from 'react'
import { Textbox } from "../../Components/Textbox"
import { validarNull, validarInt } from '../../Components/Validaciones'

import api from '../../services/axiosConfig'
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function InsertarHotel(){

  // Estados del Formulario
  const [nombre, setNombre] = useState('')
  const [cedulaJuridica, setCedulaJuridica] = useState('')
  const [telefono1, setTelefono1] = useState('')
  const [tipoHospedaje, setTipoHospedaje] = useState('')
  const [provincia, setProvincia] = useState('')
  const [canton, setCanton] = useState('')
  const [distrito, setDistrito] = useState('')
  const [barrio, setBarrio] = useState('')
  const [seniasExactas, setSeniasExactas] = useState('')
  const [refGps, setRefGps] = useState('')
  const [correo, setCorreo] = useState('')
  const [url, setUrl] = useState('')

  // Limpia las casillas
  const LimpiarHotel = () => {
      setNombre('')
      setCedulaJuridica('')
      setTelefono1('')
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

  // Retorna TRUE si todo está bien, FALSE si falla algo
  const validacionesHotel = () => {
      const nombreValido = validarNull(nombre, 'Nombre Hotel');
      if (!nombreValido.esValido) {
          alert(nombreValido.mensaje);
          return false;
      }
      const cedulaJuridicaValida = validarInt(cedulaJuridica, 'Cédula Jurídica');
      if (!cedulaJuridicaValida.esValido) {
          alert(cedulaJuridicaValida.mensaje);
          return false;
      }
      // Validación del teléfono
      const telefonoValido = validarInt(telefono1, 'Teléfono');
      if (!telefonoValido.esValido) {
          alert(telefonoValido.mensaje);
          return false;
      }
      const tipoValido = validarNull(tipoHospedaje, 'Tipo de Hospedaje');
      if (!tipoValido.esValido) {
          alert(tipoValido.mensaje);
          return false;
      }
      const provinciaValida = validarNull(provincia, 'Provincia');
      if (!provinciaValida.esValido) {
          alert(provinciaValida.mensaje);
          return false;
      }
      const cantonValido = validarNull(canton, 'Cantón');
      if (!cantonValido.esValido) {
          alert(cantonValido.mensaje);
          return false;
      }
      const distritoValido = validarNull(distrito, 'Distrito');
      if (!distritoValido.esValido) {
          alert(distritoValido.mensaje);
          return false;
      }
      const correoValido = validarNull(correo, 'Correo Electrónico');
      if (!correoValido.esValido) {
          alert(correoValido.mensaje);
          return false;
      }
      return true;
  }

  const mandarRequest = async () => {
      // 1. Validar antes de enviar
      if (!validacionesHotel()) return;

      // 2. Preparar objeto para el backend
      const nuevoHotel = {
          nombreComercial: nombre,
          cedulaJuridica: parseInt(cedulaJuridica),
          tipoHospedaje: tipoHospedaje,
          provincia: provincia,
          canton: canton,
          distrito: distrito,
          barrio: barrio,
          senasExactas: seniasExactas,
          referenciaGPS: refGps,
          telefono1: parseInt(telefono1), // Campo obligatorio agregado
          correoElectronico: correo,
          sitioWebURL: url
      };

      // 3. Enviar Petición
      try {
          const response = await api.post('/hospedaje', nuevoHotel);
          alert("Éxito: " + response.data.message);
          LimpiarHotel();
      } catch (error) {
          console.error(error);
          const mensajeError = error.response?.data?.error || "Error al conectar con el servidor";
          alert("Error: " + mensajeError);
      }
  }

  return (
  <>
    <ToastContainer />
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
      <label>Cédula Jurídica (Solo números): </label>
      <Textbox
          type="text"
          placeholder=""
          value={cedulaJuridica}
          onChange={setCedulaJuridica}
      />
      </div>

      <div className="form-group">
      <label>Teléfono Principal: </label>
      <Textbox
          type="text"
          placeholder="Ej: 88888888"
          value={telefono1}
          onChange={setTelefono1}
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
      <label>URL Sitio Web: </label>
      <Textbox
          type="text"
          placeholder=""
          value={url}
          onChange={setUrl}
      />
      </div>
      
      <div style={{ display: 'flex', gap: '100px', justifyContent: 'center' }}>
          <button onClick={mandarRequest}>Aceptar</button>
          <button onClick={LimpiarHotel}>Cancelar</button>
      </div>

    </div>
  </>
)
}