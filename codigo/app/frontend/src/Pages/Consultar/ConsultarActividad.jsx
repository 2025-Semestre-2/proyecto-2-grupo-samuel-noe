
import { useState } from 'react'
import { Textbox } from "../../Components/Textbox"
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ButtonSection1 } from '../../Components/ButtonSection'

export function ConsultarActividad(){
  const [id, setId] = useState("")

  return (
    <>
    <h1>Buscar Actividad</h1>

    <div style={{
        border: '2px solid #333',
        borderRadius: '4px',
        padding: '10px',
        maxWidth: '400px',
        margin: '20px auto',
        backgroundColor: '#f9f9f9',
        }}>
      
        <div className="form-group">
            <label>ID de la Actividad: </label>
            <Textbox
                type="text"
                placeholder=""
                value={id}
                onChange={setId}
            />
            </div>
            <div style={{ display: 'flex', gap: '100px', justifyContent: 'center' }}>
                <button >Buscar</button>
                <button>Cancelar</button>
            </div>

        </div>

        <div className="container mt-5">
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th> 
                        <th>Nombre</th>   
                        <th>Descripción</th>
                        <th>Precio</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </>
  )
}

/*





*/