
import React, {useState, useEffect} from "react"; 
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export function ReportarUsuarios(){

  return (
    <>
      <h1>Reportar Usuarios</h1>
      
      <div className="container mt-5">
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th>Usuario</th>   
                    <th>Contraseña</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    </div>
    </>
  )
}