import { useState, useEffect } from 'react'
import { Textbox } from "../../Components/Textbox"
import api from '../../services/axiosConfig'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function ModificarEmpRecTipoServicio(){

  const [idBusqueda, setIdBusqueda] = useState('');
  const [encontrado, setEncontrado] = useState(null);
  
  // Selects editables
  const [idEmpresa, setIdEmpresa] = useState('')
  const [idServicio, setIdServicio] = useState('')
  
  const [listaEmpresas, setListaEmpresas] = useState([])
  const [listaServicios, setListaServicios] = useState([])

  // Cargar Catalogos
  useEffect(() => {
      const cargar = async () => {
          try {
            const resE = await api.get('/empresa-servicio/empresas');
            setListaEmpresas(resE.data);
            const resS = await api.get('/empresa-servicio/servicios');
            setListaServicios(resS.data);
          } catch(e) { console.error(e); }
      };
      cargar();
  }, []);

  const buscar = async () => {
      if(!idBusqueda) return toast.warning("Ingrese ID");
      try {
          const res = await api.get('/empresa-servicio');
          const item = res.data.find(x => x.ID == idBusqueda);
          if(item) {
              setEncontrado(item);
              setIdEmpresa(item.IdEmpresaRecreacion.toString());
              setIdServicio(item.IdTipoServicio.toString());
              toast.success("Registro cargado");
          } else {
              toast.error("No encontrado");
              setEncontrado(null);
          }
      } catch (e) { toast.error("Error al buscar"); }
  }

  const guardar = async () => {
      try {
          await api.put(`/empresa-servicio/${encontrado.ID}`, {
              idEmpresa: parseInt(idEmpresa),
              idServicio: parseInt(idServicio)
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
      <h1>Modificar Asignación de Servicio</h1>

      <div style={{border: '2px solid #333', borderRadius: '4px', padding: '20px', backgroundColor: '#e9ecef', marginBottom: '20px'}}>   
        <div className="form-group">
            <label style={{fontWeight:'bold'}}>ID de Asignación: </label>
            <div style={{display:'flex', gap:'10px'}}>
                <Textbox type="text" value={idBusqueda} onChange={setIdBusqueda} />
                <button onClick={buscar} style={{height:'42px', marginTop:0}}>Buscar</button>
            </div>
        </div>
      </div>

      {encontrado && (
        <div style={{border: '2px solid #333', borderRadius: '4px', padding: '30px', backgroundColor: '#f9f9f9'}}>
            
            <div className="form-group">
                <label>Empresa: </label>
                <select 
                    style={{width: '100%', padding: '8px', height:'42px', borderRadius:'4px', backgroundColor:'white'}}
                    value={idEmpresa} onChange={(e) => setIdEmpresa(e.target.value)}
                >
                    {listaEmpresas.map(e => (
                        <option key={e.IdEmpresaRecreacion} value={e.IdEmpresaRecreacion}>{e.NombreComercial}</option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label>Servicio: </label>
                <select 
                    style={{width: '100%', padding: '8px', height:'42px', borderRadius:'4px', backgroundColor:'white'}}
                    value={idServicio} onChange={(e) => setIdServicio(e.target.value)}
                >
                    {listaServicios.map(s => (
                        <option key={s.IdTipoServicio} value={s.IdTipoServicio}>{s.NombreTipoServicio}</option>
                    ))}
                </select>
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