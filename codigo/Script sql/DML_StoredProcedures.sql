/*
 * NOMBRE DEL SCRIPT: DML_StoredProcedures.sql
 * DESCRIPCIÓN: Script de procedimientos almacenados para la lógica transaccional del sistema de Gestión Hotelera.
 * MOTOR DE BASE DE DATOS: Microsoft SQL Server 2022
 */

USE GestionHoteleraDB;
GO

-- ==========================================================================================
-- 1. MÓDULO DE AUTENTICACIÓN Y SEGURIDAD
-- ==========================================================================================

/*
 * SP: SP_AutenticarUsuario
 * DESCRIPCIÓN: Valida las credenciales de entrada contra las tablas de Admin y Usuarios.
 * Retorna el rol y el resultado de la autenticación.
 */
CREATE OR ALTER PROCEDURE SP_AutenticarUsuario
    @Usuario NVARCHAR(50),
    @Password NVARCHAR(50),
    @EsAutenticado BIT OUTPUT,
    @Rol NVARCHAR(20) OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    SET @EsAutenticado = 0;
    SET @Rol = '';

    -- Verificar si es Administrador
    IF EXISTS (SELECT 1 FROM CredencialesAdmin WHERE Usuario = @Usuario AND Contraseña = @Password)
    BEGIN
        SET @EsAutenticado = 1;
        SET @Rol = 'ADMIN';
        RETURN;
    END

    -- Verificar si es Usuario normal
    IF EXISTS (SELECT 1 FROM CredencialesUsuarios WHERE Usuario = @Usuario AND Contraseña = @Password)
    BEGIN
        SET @EsAutenticado = 1;
        SET @Rol = 'USUARIO';
        RETURN;
    END
END
GO

-- ==========================================================================================
-- 2. MÓDULO DE GESTIÓN DE HOSPEDAJES (ADMINISTRACIÓN)
-- ==========================================================================================

/*
 * SP: SP_RegistrarHospedaje
 * DESCRIPCIÓN: Inserta un nuevo establecimiento de hospedaje.
 */
CREATE OR ALTER PROCEDURE SP_RegistrarHospedaje
    @NombreComercial NVARCHAR(150),
    @CedulaJuridica INT,
    @TipoHospedaje NVARCHAR(50),
    @Provincia NVARCHAR(50),
    @Canton NVARCHAR(50),
    @Distrito NVARCHAR(50),
    @Barrio NVARCHAR(50),
    @SenasExactas NVARCHAR(255),
    @ReferenciaGPS NVARCHAR(100),
    @CorreoElectronico NVARCHAR(100),
    @SitioWebURL NVARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        BEGIN TRANSACTION;

        IF EXISTS (SELECT 1 FROM Hospedaje WHERE CedulaJuridica = @CedulaJuridica)
        BEGIN
            THROW 51000, 'El hospedaje con esta cédula jurídica ya existe.', 1;
        END

        INSERT INTO Hospedaje (
            NombreComercial, CedulaJuridica, TipoHospedaje, Provincia, Canton, 
            Distrito, Barrio, SenasExactas, ReferenciaGPS, CorreoElectronico, SitioWebURL
        )
        VALUES (
            @NombreComercial, @CedulaJuridica, @TipoHospedaje, @Provincia, @Canton, 
            @Distrito, @Barrio, @SenasExactas, @ReferenciaGPS, @CorreoElectronico, @SitioWebURL
        );

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END
GO

/*
 * SP: SP_AgregarTelefonoHospedaje
 * DESCRIPCIÓN: Agrega un teléfono a un hospedaje existente.
 */
CREATE OR ALTER PROCEDURE SP_AgregarTelefonoHospedaje
    @IdHospedaje INT,
    @CodigoPais INT,
    @NumeroTelefono INT
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        IF NOT EXISTS (SELECT 1 FROM Hospedaje WHERE CedulaJuridica = @IdHospedaje)
            THROW 51001, 'El hospedaje indicado no existe.', 1;

        INSERT INTO HospedajeTelefono (IdHospedaje, CodigoPais, NumeroTelefono)
        VALUES (@IdHospedaje, @CodigoPais, @NumeroTelefono);
    END TRY
    BEGIN CATCH
        THROW;
    END CATCH
END
GO

-- ==========================================================================================
-- 3. MÓDULO DE GESTIÓN DE HABITACIONES
-- ==========================================================================================

/*
 * SP: SP_CrearTipoHabitacion
 * DESCRIPCIÓN: Crea una nueva categoría/tipo de habitación para un hotel.
 */
CREATE OR ALTER PROCEDURE SP_CrearTipoHabitacion
    @IdHospedaje INT,
    @Nombre NVARCHAR(100),
    @Descripcion NVARCHAR(MAX),
    @TipoCama NVARCHAR(50),
    @PrecioPorNoche DECIMAL(10, 2),
    @IdNuevoTipo INT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        INSERT INTO TipoHabitacion (IdHospedaje, Nombre, Descripcion, TipoCama, PrecioPorNoche)
        VALUES (@IdHospedaje, @Nombre, @Descripcion, @TipoCama, @PrecioPorNoche);

        SET @IdNuevoTipo = SCOPE_IDENTITY();
    END TRY
    BEGIN CATCH
        THROW;
    END CATCH
END
GO

/*
 * SP: SP_RegistrarInventarioHabitacion
 * DESCRIPCIÓN: Registra una habitación física asociada a un Tipo.
 */
CREATE OR ALTER PROCEDURE SP_RegistrarInventarioHabitacion
    @IdTipoHabitacion INT,
    @NumeroHabitacion NVARCHAR(20)
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        IF EXISTS (SELECT 1 FROM Habitacion WHERE NumeroHabitacion = @NumeroHabitacion AND IdTipoHabitacion = @IdTipoHabitacion)
            THROW 51002, 'El número de habitación ya existe para este tipo.', 1;

        INSERT INTO Habitacion (IdTipoHabitacion, NumeroHabitacion, Estado)
        VALUES (@IdTipoHabitacion, @NumeroHabitacion, 'Activo');
    END TRY
    BEGIN CATCH
        THROW;
    END CATCH
END
GO

/*
 * SP: SP_ModificarEstadoHabitacion
 * DESCRIPCIÓN: Cambia el estado (Activo/Inactivo) de una habitación. 
 */
CREATE OR ALTER PROCEDURE SP_ModificarEstadoHabitacion
    @IdHabitacion INT,
    @NuevoEstado NVARCHAR(20)
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        IF @NuevoEstado NOT IN ('Activo', 'Inactivo')
            THROW 51003, 'Estado inválido. Use Activo o Inactivo.', 1;

        UPDATE Habitacion
        SET Estado = @NuevoEstado
        WHERE IdHabitacion = @IdHabitacion;
    END TRY
    BEGIN CATCH
        THROW;
    END CATCH
END
GO

-- ==========================================================================================
-- 4. MÓDULO DE CLIENTES
-- ==========================================================================================

/*
 * SP: SP_UpsertCliente
 * DESCRIPCIÓN: Registra un cliente o actualiza sus datos si ya existe (basado en identificación).
 * Retorna el IdCliente interno.
 */
CREATE OR ALTER PROCEDURE SP_UpsertCliente
    @Nombre NVARCHAR(100),
    @PrimerApellido NVARCHAR(100),
    @SegundoApellido NVARCHAR(100),
    @FechaNacimiento DATE,
    @TipoIdentificacion NVARCHAR(50),
    @NumeroIdentificacion NVARCHAR(50),
    @PaisResidencia NVARCHAR(100),
    @Provincia NVARCHAR(50) = NULL,
    @Canton NVARCHAR(50) = NULL,
    @Distrito NVARCHAR(50) = NULL,
    @CorreoElectronico NVARCHAR(150),
    @IdCliente INT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        BEGIN TRANSACTION;

        SELECT @IdCliente = IdCliente 
        FROM Cliente 
        WHERE NumeroIdentificacion = @NumeroIdentificacion;

        IF @IdCliente IS NOT NULL
        BEGIN
            -- UPDATE
            UPDATE Cliente
            SET Nombre = @Nombre,
                PrimerApellido = @PrimerApellido,
                SegundoApellido = @SegundoApellido,
                PaisResidencia = @PaisResidencia,
                Provincia = @Provincia,
                Canton = @Canton,
                Distrito = @Distrito,
                CorreoElectronico = @CorreoElectronico
            WHERE IdCliente = @IdCliente;
        END
        ELSE
        BEGIN
            -- INSERT
            INSERT INTO Cliente (
                Nombre, PrimerApellido, SegundoApellido, FechaNacimiento, 
                TipoIdentificacion, NumeroIdentificacion, PaisResidencia, 
                Provincia, Canton, Distrito, CorreoElectronico
            )
            VALUES (
                @Nombre, @PrimerApellido, @SegundoApellido, @FechaNacimiento, 
                @TipoIdentificacion, @NumeroIdentificacion, @PaisResidencia, 
                @Provincia, @Canton, @Distrito, @CorreoElectronico
            );

            SET @IdCliente = SCOPE_IDENTITY();
        END

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END
GO

-- ==========================================================================================
-- 5. MÓDULO DE RESERVAS Y OPERACIONES
-- ==========================================================================================

/*
 * SP: SP_CrearReservacion
 * DESCRIPCIÓN: Crea una reserva validando disponibilidad de fechas.
 */
CREATE OR ALTER PROCEDURE SP_CrearReservacion
    @IdCliente INT,
    @IdHabitacion INT,
    @FechaIngreso DATETIME,
    @FechaSalida DATE,
    @CantidadPersonas INT,
    @PoseeVehiculo BIT,
    @IdReservacion INT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        BEGIN TRANSACTION;

        -- Validar fechas lógicas
        IF @FechaIngreso >= @FechaSalida
            THROW 51004, 'La fecha de salida debe ser posterior a la fecha de ingreso.', 1;

        -- Validar disponibilidad
        IF EXISTS (
            SELECT 1 FROM Reservacion r
            INNER JOIN Habitacion h ON r.IdHabitacion = h.IdHabitacion
            WHERE r.IdHabitacion = @IdHabitacion
            AND (@FechaIngreso < r.FechaSalida AND @FechaSalida > r.FechaHoraIngreso)
        )
        BEGIN
            THROW 51005, 'La habitación no está disponible en las fechas seleccionadas.', 1;
        END

        -- Crear Reserva
        INSERT INTO Reservacion (
            IdCliente, IdHabitacion, FechaHoraIngreso, FechaSalida, 
            CantidadPersonas, PoseeVehiculo
        )
        VALUES (
            @IdCliente, @IdHabitacion, @FechaIngreso, @FechaSalida, 
            @CantidadPersonas, @PoseeVehiculo
        );

        SET @IdReservacion = SCOPE_IDENTITY();

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END
GO

/*
 * SP: SP_RealizarCheckOut
 * DESCRIPCIÓN: Finaliza la estadía. 
 */
CREATE OR ALTER PROCEDURE SP_RealizarCheckOut
    @IdReservacion INT
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        -- Validar que la reserva exista
        IF NOT EXISTS (SELECT 1 FROM Reservacion WHERE IdReservacion = @IdReservacion)
            THROW 51006, 'Reserva no encontrada.', 1;

        UPDATE Reservacion
        SET FechaSalida = GETDATE(),
            Estado = 'Cerrado'
        WHERE IdReservacion = @IdReservacion;
        
    END TRY
    BEGIN CATCH
        THROW;
    END CATCH
END
GO

-- ==========================================================================================
-- 6. TRIGGER REQUERIDO (PROYECTO 2 - FACTURACIÓN AUTOMÁTICA)
-- ==========================================================================================

/*
 * TRIGGER: TR_GenerarFacturaAlCerrarReserva
 * DESCRIPCIÓN: Al actualizar una reserva (CheckOut), genera la factura pendiente.
 */
CREATE OR ALTER TRIGGER TR_GenerarFacturaAlCerrarReserva
ON Reservacion
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    
    DECLARE @IdReservacion INT, @IdHabitacion INT, @FechaIngreso DATETIME, @FechaSalida DATE;
    DECLARE @PrecioNoche DECIMAL(10,2), @Total DECIMAL(18,2), @Noches INT;

    SELECT 
        @IdReservacion = i.IdReservacion,
        @IdHabitacion = i.IdHabitacion,
        @FechaIngreso = i.FechaHoraIngreso,
        @FechaSalida = i.FechaSalida
    FROM inserted i;

    IF NOT EXISTS (SELECT 1 FROM Factura WHERE IdReservacion = @IdReservacion)
    BEGIN
        -- Calcular Noches
        SET @Noches = DATEDIFF(DAY, @FechaIngreso, @FechaSalida);
        IF @Noches < 1 SET @Noches = 1;

        -- Obtener precio
        SELECT @PrecioNoche = th.PrecioPorNoche
        FROM Habitacion h
        JOIN TipoHabitacion th ON h.IdTipoHabitacion = th.IdTipoHabitacion
        WHERE h.IdHabitacion = @IdHabitacion;

        SET @Total = @Noches * @PrecioNoche;

        -- Insertar Factura
        INSERT INTO Factura (IdReservacion, FechaEmision, MetodoPago, NumeroNoches, ImporteTotal)
        VALUES (@IdReservacion, GETDATE(), NULL, @Noches, @Total);
    END
END
GO

-- ==========================================================================================
-- 7. MÓDULO DE RECREACIÓN
-- ==========================================================================================

/*
 * SP: SP_RegistrarEmpresaRecreacion
 * DESCRIPCIÓN: Crea una nueva empresa turística.
 */
CREATE OR ALTER PROCEDURE SP_RegistrarEmpresaRecreacion
    @NombreEmpresa NVARCHAR(150),
    @CedulaJuridica NVARCHAR(50),
    @CorreoElectronico NVARCHAR(100),
    @Telefono NVARCHAR(20),
    @NombreContacto NVARCHAR(100),
    @Provincia NVARCHAR(50),
    @Canton NVARCHAR(50),
    @Distrito NVARCHAR(50),
    @SenasExactas NVARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        INSERT INTO EmpresaRecreacion (
            NombreEmpresa, CedulaJuridica, CorreoElectronico, Telefono, 
            NombreContacto, Provincia, Canton, Distrito, SenasExactas
        )
        VALUES (
            @NombreEmpresa, @CedulaJuridica, @CorreoElectronico, @Telefono, 
            @NombreContacto, @Provincia, @Canton, @Distrito, @SenasExactas
        );
    END TRY
    BEGIN CATCH
        THROW;
    END CATCH
END
GO

/*
 * SP: SP_AsociarActividadEmpresa
 * DESCRIPCIÓN: Vincula una actividad a una empresa.
 */
CREATE OR ALTER PROCEDURE SP_AsociarActividadEmpresa
    @IdEmpresa INT,
    @NombreActividad NVARCHAR(100),
    @Descripcion NVARCHAR(MAX),
    @Costo INT
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        BEGIN TRANSACTION;
        
        DECLARE @IdTipoActividad INT;

        -- Verificar si el tipo de actividad ya existe en el catálogo general
        SELECT @IdTipoActividad = IdTipoActividad 
        FROM TipoActividad 
        WHERE NombreTipoActividad = @NombreActividad;

        -- Si no existe, crearlo
        IF @IdTipoActividad IS NULL
        BEGIN
            INSERT INTO TipoActividad (NombreTipoActividad, Descripcion, Costo)
            VALUES (@NombreActividad, @Descripcion, @Costo);
            SET @IdTipoActividad = SCOPE_IDENTITY();
        END

        -- Asociar a la empresa
        INSERT INTO EmpresaRecreacionTipoActividad (IdEmpresaRecreacion, IdTipoActividad)
        VALUES (@IdEmpresa, @IdTipoActividad);

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END
GO

-- ==========================================================================================
-- 8. MÓDULO DE PAGOS Y FACTURACIÓN (NUEVO)
-- ==========================================================================================

/*
 * SP: SP_PagarFactura
 * DESCRIPCIÓN: Registra el pago de una factura generada previamente por el sistema.
 */
CREATE OR ALTER PROCEDURE SP_PagarFactura
    @IdReservacion INT,
    @MetodoPago NVARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        -- Validar que la factura exista
        IF NOT EXISTS (SELECT 1 FROM Factura WHERE IdReservacion = @IdReservacion)
            THROW 51007, 'No se ha encontrado una factura para esta reservación.', 1;

        -- Validar que no esté pagada ya
        IF EXISTS (SELECT 1 FROM Factura WHERE IdReservacion = @IdReservacion AND MetodoPago IS NOT NULL)
            THROW 51008, 'Esta factura ya se encuentra pagada.', 1;

        -- Validar el método de pago contra el CHECK de la base de datos
        IF @MetodoPago NOT IN ('Efectivo', 'Tarjeta de Credito')
            THROW 51009, 'Método de pago inválido. Use Efectivo o Tarjeta de Credito.', 1;

        -- Registrar el pago
        UPDATE Factura
        SET MetodoPago = @MetodoPago
        WHERE IdReservacion = @IdReservacion;

    END TRY
    BEGIN CATCH
        THROW;
    END CATCH
END
GO