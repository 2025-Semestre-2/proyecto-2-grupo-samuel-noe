import { useState, useEffect } from 'react'
import { Textbox } from "../../Components/Textbox"
import { validarInt } from '../../Components/Validaciones'
import api from '../../services/axiosConfig'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function ModificarTelCliente(){

  const [idBusqueda, setIdBusqueda] = useState('');
  const [encontrado, setEncontrado] = useState(null);
  
  const [telefono, setTelefono] = useState('');
  const [codPais, setCodPais] = useState('');
  const [listaCodigos, setListaCodigos] = useState([]);

  // Cargar catálogo de códigos
  useEffect(() => {
      const cargar = async () => {
          try {
            const res = await api.get('/cliente-telefono/codigos');
            setListaCodigos(res.data);
          } catch(e) { console.error(e); }
      };
      cargar();
  }, []);

  const buscar = async () => {
      if(!idBusqueda) return toast.warning("Ingrese ID de Registro");
      try {
          const res = await api.get('/cliente-telefono');
          const item = res.data.find(x => x.IdTelefonoCliente == idBusqueda);
          if(item) {
              setEncontrado(item);
              setTelefono(item.NumeroTelefono.toString());
              setCodPais(item.CodigoPais.toString());
              toast.success("Cargado");
          } else {
              toast.error("No encontrado");
              setEncontrado(null);
          }
      } catch (e) { toast.error("Error al buscar"); }
  }

  const guardar = async () => {
      if (!validarInt(telefono, 'Teléfono').esValido) return toast.warning("Número inválido");
      if (!codPais) return toast.warning("Seleccione Código País");

      try {
          await api.put(`/cliente-telefono/${encontrado.IdTelefonoCliente}`, {
              numeroTelefono: parseInt(telefono),
              codigoPais: parseInt(codPais)
          });
          toast.success("Actualizado correctamente.");
          setEncontrado(null);
          setIdBusqueda('');
      } catch (e) { 
          toast.error("Error: " + (e.response?.data?.error || "Error al guardar")); 
      }
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000}/>
      <h1>Modificar Teléfono de Cliente</h1>

      <div style={{border: '2px solid #333', borderRadius: '4px', padding: '20px', backgroundColor: '#e9ecef', marginBottom: '20px'}}>   
        <div className="form-group">
            <label style={{fontWeight:'bold'}}>ID de Registro: </label>
            <div style={{display:'flex', gap:'10px'}}>
                <Textbox type="text" value={idBusqueda} onChange={setIdBusqueda} placeholder="Ej: 1, 5..." />
                <button onClick={buscar} style={{height:'42px', marginTop:0}}>Buscar</button>
            </div>
        </div>
      </div>

      {encontrado && (
        <div style={{border: '2px solid #333', borderRadius: '4px', padding: '30px', backgroundColor: '#f9f9f9'}}>
            <div className="form-group">
                <label>Cliente (Solo Lectura): </label>
                <input disabled type="text" value={encontrado.Cliente} style={{width:'100%', padding:'8px', backgroundColor:'#ccc', borderRadius:'4px', border:'1px solid #999'}} />
            </div>

            <div className="form-group" style={{display:'flex', gap:'10px'}}>
                <div style={{width:'35%'}}>
                    <label>Código País: </label>
                    <select 
                        style={{
                            width: '100%', padding: '8px', height:'42px', 
                            borderRadius:'4px', border:'1px solid #ccc', 
                            backgroundColor:'white', color: '#333'
                        }}
                        value={codPais}
                        onChange={(e) => setCodPais(e.target.value)}
                    >
                        {listaCodigos.map(c => (
                            <option key={c.IdCodigoTelefono} value={c.IdCodigoTelefono}>
                                +{c.IdCodigoTelefono} ({c.Pais})
                            </option>
                        ))}
                    </select>
                </div>
                <div style={{flexGrow:1}}>
                    <label>Número: </label>
                    <Textbox type="text" value={telefono} onChange={setTelefono} />
                </div>
            </div>
            
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '20px' }}>
                <button onClick={guardar}>Guardar Cambios</button>
                <button onClick={() => setEncontrado(null)} style={{backgroundColor:'#6c757d'}}>Cancelar</button>
            </div>
        </div>
      )}
    </>
  )
}