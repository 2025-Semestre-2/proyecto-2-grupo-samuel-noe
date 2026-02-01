import { useState, useEffect } from 'react'
import { Textbox } from "../../Components/Textbox"
import { validarInt } from '../../Components/Validaciones'
import api from '../../services/axiosConfig'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function InsertarTelCliente(){

  const [idCliente, setIdCliente] = useState('')
  const [telefono, setTelefono] = useState('')
  const [codPais, setCodPais] = useState('')
  
  const [listaClientes, setListaClientes] = useState([])
  const [listaCodigos, setListaCodigos] = useState([])

  useEffect(() => {
      const cargarDatos = async () => {
          try {
              const resClientes = await api.get('/cliente-telefono/clientes');
              setListaClientes(resClientes.data);
              if(resClientes.data.length > 0) setIdCliente(resClientes.data[0].IdCliente.toString());

              const resCodigos = await api.get('/cliente-telefono/codigos');
              setListaCodigos(resCodigos.data);
              if(resCodigos.data.length > 0) setCodPais(resCodigos.data[0].IdCodigoTelefono.toString());

          } catch(e) { console.error(e); toast.error("Error cargando listas"); }
      };
      cargarDatos();
  }, []);

  const Limpiar = () => {
    if(listaClientes.length > 0) setIdCliente(listaClientes[0].IdCliente.toString());
    if(listaCodigos.length > 0) setCodPais(listaCodigos[0].IdCodigoTelefono.toString());
    setTelefono('');
  }

  const mandarRequest = async () => {
    if (!validarInt(idCliente, 'Cliente').esValido) return toast.warning("Seleccione un Cliente.");
    if (!validarInt(telefono, 'Teléfono').esValido) return toast.warning("Teléfono inválido.");
    if (!codPais) return toast.warning("Seleccione un Código de País.");

    try {
        await api.post('/cliente-telefono', {
            idCliente: parseInt(idCliente),
            numeroTelefono: parseInt(telefono),
            codigoPais: parseInt(codPais)
        });
        toast.success("Teléfono agregado al cliente.");
        Limpiar();
    } catch (error) {
        toast.error("Error: " + (error.response?.data?.error || "Desconocido"));
    }
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000}/>
      <h1>Insertar Teléfono de Cliente</h1>

      <div style={{border: '2px solid #333', borderRadius: '4px', padding: '30px', backgroundColor: '#f9f9f9'}}>
      
        <div className="form-group">
            <label>Cliente: </label>
            <select 
                style={{
                    width: '100%', padding: '8px', height:'42px', 
                    borderRadius:'4px', border:'1px solid #ccc', 
                    backgroundColor:'white', color: '#333'
                }}
                value={idCliente}
                onChange={(e) => setIdCliente(e.target.value)}
            >
                <option value="">-- Seleccione Cliente --</option>
                {listaClientes.map(c => (
                    <option key={c.IdCliente} value={c.IdCliente}>
                        {c.NombreCompleto} (ID: {c.NumeroIdentificacion})
                    </option>
                ))}
            </select>
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
                <label>Número Teléfono: </label>
                <Textbox type="text" placeholder="Ej: 88888888" value={telefono} onChange={setTelefono} />
            </div>
        </div>
        
        <div style={{ display: 'flex', gap: '50px', justifyContent: 'center', marginTop: '20px' }}>
            <button onClick={mandarRequest}>Aceptar</button>
            <button onClick={Limpiar} style={{backgroundColor:'#6c757d'}}>Cancelar</button>
        </div>
      </div>
    </>
  )
}