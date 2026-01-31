
import React, {useState, useEffect} from "react"; 
//Imports para poder hacer las tablas de reportes con Toastify y Bootstrap
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export function ReportarActividades(){

  return (
    <>
      <h1>Reportar Actividades</h1>

      <div className="container mt-5">
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th>ID</th> 
                    <th>ID Empresa Recreación</th> 
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
                    <td></td>
                </tr>
            </tbody>
        </table>
    </div>
    </>
  )
}