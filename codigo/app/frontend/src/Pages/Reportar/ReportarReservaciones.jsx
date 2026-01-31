
import React, {useState, useEffect} from "react"; 
//Imports para poder hacer las tablas de reportes con Toastify y Bootstrap
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export function ReportarReservaciones(){

  return (
    <>
      <h1>Reportar Reservaciones</h1>

      <div className="container mt-5">
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th>ID</th> 
                    <th>ID Cliente</th>   
                    <th>ID Habitación</th>
                    <th>Fecha Ingreso</th>
                    <th>Fecha Salida</th>
                    <th>Cantidad de Personas</th>
                    <th>Posee Vehículo</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td></td>
                    <td></td>
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