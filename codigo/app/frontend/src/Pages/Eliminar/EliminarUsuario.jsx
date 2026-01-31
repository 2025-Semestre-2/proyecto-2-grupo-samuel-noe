
import { useState } from 'react'
import { Textbox, TextboxBlock } from "../../Components/Textbox"
import { validarNull } from '../../Components/Validaciones'
import axios from 'axios'

export function EliminarUsuario(){

  const [usuario, setUsuario] = useState('')
  const [contra, setContra] = useState('')
  const [tipo, setTipo] = useState('')
  const [validado, setValidado] = useState(false)

  const LimpiarUsuario = () => {
    setUsuario('')
    setContra('')
    setTipo('')
    setValidado(false)
  }

  const validacionesUsuario = () => {
  
    const usuarioValido = validarNull(usuario, 'Nombre de Usuario');
    if (!usuarioValido.esValido) {
      alert(usuarioValido.mensaje);
      return;
    }
    const contraValido = validarNull(contra, 'Contraseña');
    if (!contraValido.esValido) {
      alert(contraValido.mensaje);
      return;
    }
    const tipoValido = validarNull(tipo, 'Tipo de Cuenta');
    if (!tipoValido.esValido) {
      alert(tipoValido.mensaje);
      return;
    }

    setValidado(true);
  }

  const mandarRequest = async () => {
    LimpiarUsuario()
  }

  const verificarExistenciaUsuario = async () => {
    if (!usuario) {
      alert('Ingresa un Nombre de Usuario');
      return;
    }
    try {
    } 
    catch (e) {
      alert('Usuario no encontrado: ' + e.message);
      console.error(e);
    }
  }

  return (
    <>
      <h1>Eliminar Usuario</h1>
      
      <div style={{
        border: '2px solid #333',
        borderRadius: '4px',
        padding: '30px',
        backgroundColor: '#f9f9f9',
      }}>   

        <div className="form-group">
        <label>Nombre de Usuario: </label>
        <Textbox
          type="text"
          placeholder=""
          value={usuario}
          onChange={setUsuario}
        />
        </div>
        <button onClick={verificarExistenciaUsuario}>Buscar</button>
   
      </div>

      <div style={{
        border: '2px solid #333',
        borderRadius: '4px',
        padding: '20px',
        backgroundColor: '#f9f9f9',
      }}>

        <div className="form-group">
        <label>Contraseña: </label>
        <TextboxBlock
          type="text"
          placeholder=""
          value={contra}
          onChange={setContra}
        />
        </div>

        <div className="form-group">
        <label>Tipo de Cuenta: </label>
        <TextboxBlock
          type="text"
          placeholder=""
          value={tipo}
          onChange={setTipo}
        />
        </div>

        <div style={{ display: 'flex', gap: '100px', justifyContent: 'center' }}>
          <button onClick={() => {
            validacionesUsuario()
            if(validado){mandarRequest()}
          }}>Aceptar</button>
          <button onClick={LimpiarUsuario}>Cancelar</button>
        </div>

      </div>
    </>
  )
}