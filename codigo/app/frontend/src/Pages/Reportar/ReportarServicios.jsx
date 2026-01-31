
import React, {useState, useEffect} from "react"; 
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export function ReportarServicios(){

  return (
    <>
      <h1>Reportar Servicios Empresa</h1>
      
      <div className="container mt-5">
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th>ID</th> 
                    <th>ID del Hotel</th>   
                    <th>Nombre</th>
                </tr>
            </thead>
            <tbody>
                <tr>
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