import { useState, useEffect } from 'react'
import api from '../../services/axiosConfig'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function InsertarEmpRecTipoAct(){

  const [idEmpresa, setIdEmpresa] = useState('')
  const [idActividad, setIdActividad] = useState('')
  
  const [listaEmpresas, setListaEmpresas] = useState([])
  const [listaActividades, setListaActividades] = useState([])

  useEffect(() => {
      const cargarCatalogos = async () => {
          try {
              const resEmp = await api.get('/empresa-actividad/empresas');
              setListaEmpresas(resEmp.data);
              
              const resAct = await api.get('/empresa-actividad/actividades');
              setListaActividades(resAct.data);
              
              // Forzado visual inicial
              if(resEmp.data.length > 0) setIdEmpresa(resEmp.data[0].IdEmpresaRecreacion.toString());
              if(resAct.data.length > 0) setIdActividad(resAct.data[0].IdTipoActividad.toString());

          } catch(e) { console.error(e); }
      };
      cargarCatalogos();
  }, []);

  const Limpiar = () => {
    if(listaEmpresas.length > 0) setIdEmpresa(listaEmpresas[0].IdEmpresaRecreacion.toString());
    if(listaActividades.length > 0) setIdActividad(listaActividades[0].IdTipoActividad.toString());
  }

  const mandarRequest = async () => {
    if (!idEmpresa) return toast.warning("Seleccione una Empresa");
    if (!idActividad) return toast.warning("Seleccione una Actividad");

    try {
        await api.post('/empresa-actividad', {
            idEmpresa: parseInt(idEmpresa),
            idActividad: parseInt(idActividad)
        });
        toast.success("Actividad asignada a la empresa.");
        Limpiar();
    } catch (error) {
        toast.error("Error: " + (error.response?.data?.error || "Desconocido"));
    }
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000}/>
      <h1>Asignar Actividad a Empresa</h1>

      <div style={{border: '2px solid #333', borderRadius: '4px', padding: '30px', backgroundColor: '#f9f9f9'}}>
      
        <div className="form-group">
            <label>Empresa Recreación: </label>
            <select 
                style={{
                    width: '100%', padding: '8px', height:'42px', 
                    borderRadius:'4px', border:'1px solid #ccc', 
                    backgroundColor:'white', color: '#333'
                }}
                value={idEmpresa}
                onChange={(e) => setIdEmpresa(e.target.value)}
            >
                <option value="">-- Seleccione Empresa --</option>
                {listaEmpresas.map(e => (
                    <option key={e.IdEmpresaRecreacion} value={e.IdEmpresaRecreacion}>
                        {e.NombreComercial}
                    </option>
                ))}
            </select>
        </div>

        <div className="form-group">
            <label>Actividad (Servicio): </label>
            <select 
                style={{
                    width: '100%', padding: '8px', height:'42px', 
                    borderRadius:'4px', border:'1px solid #ccc', 
                    backgroundColor:'white', color: '#333'
                }}
                value={idActividad}
                onChange={(e) => setIdActividad(e.target.value)}
            >
                <option value="">-- Seleccione Actividad --</option>
                {listaActividades.map(a => (
                    <option key={a.IdTipoActividad} value={a.IdTipoActividad}>
                        {a.NombreTipoActividad}
                    </option>
                ))}
            </select>
        </div>

        <div style={{ display: 'flex', gap: '50px', justifyContent: 'center', marginTop: '20px' }}>
            <button onClick={mandarRequest}>Aceptar</button>
            <button onClick={Limpiar} style={{backgroundColor:'#6c757d'}}>Cancelar</button>
        </div>
      </div>
    </>
  )
}