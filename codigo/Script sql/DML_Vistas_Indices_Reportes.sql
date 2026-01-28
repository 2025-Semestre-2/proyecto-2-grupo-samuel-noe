/*
 * NOMBRE DEL SCRIPT: DML_Vistas_Indices_Reportes.sql
 * DESCRIPCIÓN: Implementación de vistas, indices de rendimiento y reportes.
 */

USE GestionHoteleraDB;
GO

-- ==========================================================================================
-- 1. ÍNDICES
-- ==========================================================================================

-- Índice para acelerar búsquedas de hoteles por ubicación y tipo
CREATE NONCLUSTERED INDEX IX_Hospedaje_Ubicacion_Tipo 
ON Hospedaje (Provincia, Canton, TipoHospedaje);

-- Índice para acelerar la verificación de disponibilidad (Fechas)
CREATE NONCLUSTERED INDEX IX_Reservacion_Fechas 
ON Reservacion (FechaHoraIngreso, FechaSalida, IdHabitacion)
INCLUDE (Estado);

-- Índice para búsqueda de clientes por identificación
CREATE NONCLUSTERED INDEX IX_Cliente_Identificacion 
ON Cliente (NumeroIdentificacion);

-- Índice para reportes de facturación por fecha
CREATE NONCLUSTERED INDEX IX_Factura_Fecha 
ON Factura (FechaEmision)
INCLUDE (ImporteTotal);

GO

-- ==========================================================================================
-- 2. VISTAS
-- ==========================================================================================

/*
 * VISTA: V_ListadoHoteles
 * USO: Para mostrar el catálogo de hoteles en el Frontend.
 */
CREATE OR ALTER VIEW V_ListadoHoteles AS
SELECT 
    CedulaJuridica,
    NombreComercial,
    TipoHospedaje,
    Provincia,
    Canton,
    Distrito,
    ReferenciaGPS,
    SitioWebURL,
    (SELECT TOP 1 NumeroTelefono FROM HospedajeTelefono WHERE IdHospedaje = h.CedulaJuridica) AS TelefonoPrincipal
FROM Hospedaje h;
GO

/*
 * VISTA: V_DetalleHabitaciones
 * USO: Para que el usuario vea qué habitaciones existen y sus precios.
 */
CREATE OR ALTER VIEW V_DetalleHabitaciones AS
SELECT 
    h.IdHabitacion,
    h.NumeroHabitacion,
    h.Estado AS EstadoHabitacion,
    th.Nombre AS Tipo,
    th.TipoCama,
    th.PrecioPorNoche,
    ho.NombreComercial AS Hotel,
    ho.Provincia
FROM Habitacion h
INNER JOIN TipoHabitacion th ON h.IdTipoHabitacion = th.IdTipoHabitacion
INNER JOIN Hospedaje ho ON th.IdHospedaje = ho.CedulaJuridica;
GO

/*
 * VISTA: V_HistorialReservasCliente
 * USO: Para que el cliente vea sus reservas pasadas y futuras.
 */
CREATE OR ALTER VIEW V_HistorialReservasCliente AS
SELECT 
    r.IdReservacion,
    c.NumeroIdentificacion,
    c.Nombre + ' ' + c.PrimerApellido AS NombreCliente,
    h.NumeroHabitacion,
    th.Nombre AS TipoHabitacion,
    ho.NombreComercial AS Hotel,
    r.FechaHoraIngreso,
    r.FechaSalida,
    r.Estado,
    f.ImporteTotal,
    f.MetodoPago
FROM Reservacion r
INNER JOIN Cliente c ON r.IdCliente = c.IdCliente
INNER JOIN Habitacion h ON r.IdHabitacion = h.IdHabitacion
INNER JOIN TipoHabitacion th ON h.IdTipoHabitacion = th.IdTipoHabitacion
INNER JOIN Hospedaje ho ON th.IdHospedaje = ho.CedulaJuridica
LEFT JOIN Factura f ON r.IdReservacion = f.IdReservacion;
GO

-- ==========================================================================================
-- 3. REPORTES
-- ==========================================================================================

/*
 * SP: SP_ReporteFacturacion
 */
CREATE OR ALTER PROCEDURE SP_ReporteFacturacion
    @FechaInicio DATE,
    @FechaFin DATE
AS
BEGIN
    SET NOCOUNT ON;
    
    SELECT 
        CAST(FechaEmision AS DATE) AS Fecha,
        COUNT(IdFactura) AS CantidadFacturas,
        SUM(ImporteTotal) AS TotalFacturado
    FROM Factura
    WHERE CAST(FechaEmision AS DATE) BETWEEN @FechaInicio AND @FechaFin
    GROUP BY CAST(FechaEmision AS DATE)
    ORDER BY Fecha DESC;
END
GO

/*
 * SP: SP_ReporteOcupacionPorTipo
 */
CREATE OR ALTER PROCEDURE SP_ReporteOcupacionPorTipo
    @FechaInicio DATE,
    @FechaFin DATE,
    @NombreTipoHabitacion NVARCHAR(100) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        th.Nombre AS TipoHabitacion,
        COUNT(r.IdReservacion) AS TotalReservas,
        SUM(DATEDIFF(DAY, r.FechaHoraIngreso, r.FechaSalida)) AS TotalNochesOcupadas
    FROM Reservacion r
    INNER JOIN Habitacion h ON r.IdHabitacion = h.IdHabitacion
    INNER JOIN TipoHabitacion th ON h.IdTipoHabitacion = th.IdTipoHabitacion
    WHERE r.Estado = 'Cerrado' -- Solo reservas finalizadas
      AND r.FechaHoraIngreso >= @FechaInicio 
      AND r.FechaSalida <= @FechaFin
      AND (@NombreTipoHabitacion IS NULL OR th.Nombre LIKE '%' + @NombreTipoHabitacion + '%')
    GROUP BY th.Nombre;
END
GO

/*
 * SP: SP_ReporteRangoEdades
 */
CREATE OR ALTER PROCEDURE SP_ReporteRangoEdades
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        CASE 
            WHEN DATEDIFF(YEAR, FechaNacimiento, GETDATE()) BETWEEN 18 AND 25 THEN '18-25'
            WHEN DATEDIFF(YEAR, FechaNacimiento, GETDATE()) BETWEEN 26 AND 35 THEN '26-35'
            WHEN DATEDIFF(YEAR, FechaNacimiento, GETDATE()) BETWEEN 36 AND 50 THEN '36-50'
            WHEN DATEDIFF(YEAR, FechaNacimiento, GETDATE()) > 50 THEN '50+'
            ELSE 'Menor de edad o N/A'
        END AS RangoEdad,
        COUNT(IdCliente) AS CantidadClientes
    FROM Cliente
    WHERE IdCliente IN (SELECT DISTINCT IdCliente FROM Reservacion)
    GROUP BY 
        CASE 
            WHEN DATEDIFF(YEAR, FechaNacimiento, GETDATE()) BETWEEN 18 AND 25 THEN '18-25'
            WHEN DATEDIFF(YEAR, FechaNacimiento, GETDATE()) BETWEEN 26 AND 35 THEN '26-35'
            WHEN DATEDIFF(YEAR, FechaNacimiento, GETDATE()) BETWEEN 36 AND 50 THEN '36-50'
            WHEN DATEDIFF(YEAR, FechaNacimiento, GETDATE()) > 50 THEN '50+'
            ELSE 'Menor de edad o N/A'
        END
    ORDER BY RangoEdad;
END
GO