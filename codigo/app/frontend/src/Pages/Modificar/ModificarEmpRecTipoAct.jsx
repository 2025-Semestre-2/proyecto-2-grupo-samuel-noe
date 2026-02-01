import { useState, useEffect } from 'react'
import { Textbox } from "../../Components/Textbox"
import api from '../../services/axiosConfig'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function ModificarEmpRecTipoAct(){

  const [idBusqueda, setIdBusqueda] = useState('');
  const [encontrado, setEncontrado] = useState(null);
  
  // Selects editables
  const [idEmpresa, setIdEmpresa] = useState('')
  const [idActividad, setIdActividad] = useState('')
  
  const [listaEmpresas, setListaEmpresas] = useState([])
  const [listaActividades, setListaActividades] = useState([])

  // Cargar Catalogos
  useEffect(() => {
      const cargar = async () => {
          try {
            const resE = await api.get('/empresa-actividad/empresas');
            setListaEmpresas(resE.data);
            const resA = await api.get('/empresa-actividad/actividades');
            setListaActividades(resA.data);
          } catch(e) { console.error(e); }
      };
      cargar();
  }, []);

  const buscar = async () => {
      if(!idBusqueda) return toast.warning("Ingrese ID");
      try {
          const res = await api.get('/empresa-actividad');
          const item = res.data.find(x => x.ID == idBusqueda);
          if(item) {
              setEncontrado(item);
              setIdEmpresa(item.IdEmpresaRecreacion.toString());
              setIdActividad(item.IdTipoActividad.toString());
              toast.success("Registro cargado");
          } else {
              toast.error("No encontrado");
              setEncontrado(null);
          }
      } catch (e) { toast.error("Error al buscar"); }
  }

  const guardar = async () => {
      try {
          await api.put(`/empresa-actividad/${encontrado.ID}`, {
              idEmpresa: parseInt(idEmpresa),
              idActividad: parseInt(idActividad)
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
      <h1>Modificar Asignación</h1>

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
                <label>Actividad: </label>
                <select 
                    style={{width: '100%', padding: '8px', height:'42px', borderRadius:'4px', backgroundColor:'white'}}
                    value={idActividad} onChange={(e) => setIdActividad(e.target.value)}
                >
                    {listaActividades.map(a => (
                        <option key={a.IdTipoActividad} value={a.IdTipoActividad}>{a.NombreTipoActividad}</option>
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