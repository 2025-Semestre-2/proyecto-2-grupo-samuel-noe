import { useState, useEffect } from 'react'
import api from '../../services/axiosConfig'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function InsertarEmpRecTipoServicio(){

  const [idEmpresa, setIdEmpresa] = useState('')
  const [idServicio, setIdServicio] = useState('')
  
  const [listaEmpresas, setListaEmpresas] = useState([])
  const [listaServicios, setListaServicios] = useState([])

  useEffect(() => {
      const cargar = async () => {
          try {
              const resE = await api.get('/empresa-servicio/empresas');
              setListaEmpresas(resE.data);
              
              const resS = await api.get('/empresa-servicio/servicios');
              setListaServicios(resS.data);
              
              if(resE.data.length > 0) setIdEmpresa(resE.data[0].IdEmpresaRecreacion.toString());
              if(resS.data.length > 0) setIdServicio(resS.data[0].IdTipoServicio.toString());

          } catch(e) { console.error(e); toast.error("Error cargando listas"); }
      };
      cargar();
  }, []);

  const Limpiar = () => {
    if(listaEmpresas.length > 0) setIdEmpresa(listaEmpresas[0].IdEmpresaRecreacion.toString());
    if(listaServicios.length > 0) setIdServicio(listaServicios[0].IdTipoServicio.toString());
  }

  const mandarRequest = async () => {
    if (!idEmpresa) return toast.warning("Seleccione una Empresa");
    if (!idServicio) return toast.warning("Seleccione un Servicio");

    try {
        await api.post('/empresa-servicio', {
            idEmpresa: parseInt(idEmpresa),
            idServicio: parseInt(idServicio)
        });
        toast.success("Servicio asignado correctamente.");
        Limpiar();
    } catch (error) {
        toast.error("Error: " + (error.response?.data?.error || "Desconocido"));
    }
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000}/>
      <h1>Asignar Servicio a Empresa</h1>

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
            <label>Tipo de Servicio: </label>
            <select 
                style={{
                    width: '100%', padding: '8px', height:'42px', 
                    borderRadius:'4px', border:'1px solid #ccc', 
                    backgroundColor:'white', color: '#333'
                }}
                value={idServicio}
                onChange={(e) => setIdServicio(e.target.value)}
            >
                <option value="">-- Seleccione Servicio --</option>
                {listaServicios.map(s => (
                    <option key={s.IdTipoServicio} value={s.IdTipoServicio}>
                        {s.NombreTipoServicio}
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