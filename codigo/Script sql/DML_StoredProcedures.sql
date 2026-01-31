USE GestionHoteleraDB;
GO

-- ==========================================================================================
-- 1. HOSPEDAJES
-- ==========================================================================================

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
    @SitioWebURL NVARCHAR(255) = NULL,
    @Telefono1 INT,
    @Telefono2 INT = NULL
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRANSACTION;
    BEGIN TRY
        -- 1. Insertar en la tabla principal
        INSERT INTO Hospedaje (
            NombreComercial, CedulaJuridica, TipoHospedaje, Provincia, Canton, Distrito, 
            Barrio, SenasExactas, ReferenciaGPS, CorreoElectronico, SitioWebURL
        )
        VALUES (
            @NombreComercial, @CedulaJuridica, @TipoHospedaje, @Provincia, @Canton, @Distrito, 
            @Barrio, @SenasExactas, @ReferenciaGPS, @CorreoElectronico, @SitioWebURL
        );

        -- 2. Insertar Teléfonos (Tabla HospedajeTelefono)
        IF @Telefono1 IS NOT NULL
        BEGIN
            INSERT INTO HospedajeTelefono (IdHospedaje, NumeroTelefono, CodigoPais)
            VALUES (@CedulaJuridica, @Telefono1, 506); 
        END

        IF @Telefono2 IS NOT NULL
        BEGIN
            INSERT INTO HospedajeTelefono (IdHospedaje, NumeroTelefono, CodigoPais)
            VALUES (@CedulaJuridica, @Telefono2, 506);
        END

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END
GO

CREATE OR ALTER PROCEDURE SP_ModificarHospedaje
    @IdHospedaje INT,
    @NombreComercial NVARCHAR(150),
    @Telefono1 INT,
    @CorreoElectronico NVARCHAR(100),
    @SitioWebURL NVARCHAR(200)
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRANSACTION;
    
    -- 1. Actualizar datos básicos
    UPDATE Hospedaje
    SET NombreComercial = @NombreComercial,
        CorreoElectronico = @CorreoElectronico,
        SitioWebURL = @SitioWebURL
    WHERE CedulaJuridica = @IdHospedaje;

    UPDATE TOP (1) HospedajeTelefono
    SET NumeroTelefono = @Telefono1
    WHERE IdHospedaje = @IdHospedaje;

    COMMIT TRANSACTION;
END
GO

CREATE OR ALTER PROCEDURE SP_EliminarHospedaje
    @CedulaJuridica INT
AS
BEGIN
    SET NOCOUNT ON;
    DELETE FROM Hospedaje WHERE CedulaJuridica = @CedulaJuridica;
END
GO

-- ==========================================================================================
-- 2. TIPOS DE HABITACIÓN
-- ==========================================================================================

CREATE OR ALTER PROCEDURE SP_RegistrarTipoHabitacion
    @Nombre NVARCHAR(50),
    @Descripcion NVARCHAR(MAX),
    @Precio DECIMAL(10,2)
AS
BEGIN
    SET NOCOUNT ON;
    THROW 51000, 'Error: SP_RegistrarTipoHabitacion requiere IdHospedaje y TipoCama según DDL.', 1;
END
GO

CREATE OR ALTER PROCEDURE SP_RegistrarTipoHabitacion_V2
    @IdHospedaje INT,
    @Nombre NVARCHAR(50),
    @Descripcion NVARCHAR(MAX),
    @TipoCama NVARCHAR(50),
    @Precio DECIMAL(10,2)
AS
BEGIN
    INSERT INTO TipoHabitacion (IdHospedaje, Nombre, Descripcion, TipoCama, PrecioPorNoche)
    VALUES (@IdHospedaje, @Nombre, @Descripcion, @TipoCama, @Precio);
END
GO

-- ==========================================================================================
-- 3. HABITACIONES
-- ==========================================================================================

CREATE OR ALTER PROCEDURE SP_RegistrarHabitacion
    @IdHospedaje INT,
    @IdTipoHabitacion INT,
    @Numero INT,
    @Estado NVARCHAR(20)
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO Habitacion (IdTipoHabitacion, NumeroHabitacion, Estado)
    VALUES (@IdTipoHabitacion, @Numero, @Estado);
END
GO

CREATE OR ALTER PROCEDURE SP_ModificarHabitacion
    @IdHabitacion INT,
    @IdTipoHabitacion INT,
    @Numero INT,
    @Estado NVARCHAR(20)
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE Habitacion
    SET IdTipoHabitacion = @IdTipoHabitacion,
        NumeroHabitacion = @Numero,
        Estado = @Estado
    WHERE IdHabitacion = @IdHabitacion;
END
GO

-- ==========================================================================================
-- 4. CLIENTES
-- ==========================================================================================

CREATE OR ALTER PROCEDURE SP_RegistrarCliente
    @Nombre NVARCHAR(50),
    @Apellido1 NVARCHAR(50),
    @Apellido2 NVARCHAR(50),
    @FechaNacimiento DATE,
    @TipoIdentificacion NVARCHAR(20),
    @NumeroIdentificacion NVARCHAR(50),
    @PaisResidencia NVARCHAR(50),
    @Provincia NVARCHAR(50),
    @Canton NVARCHAR(50),
    @Distrito NVARCHAR(50),
    @CorreoElectronico NVARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO Cliente (
        Nombre, PrimerApellido, SegundoApellido, FechaNacimiento, TipoIdentificacion, 
        NumeroIdentificacion, PaisResidencia, Provincia, Canton, Distrito, CorreoElectronico
    )
    VALUES (
        @Nombre, @Apellido1, @Apellido2, @FechaNacimiento, @TipoIdentificacion,
        @NumeroIdentificacion, @PaisResidencia, @Provincia, @Canton, @Distrito, @CorreoElectronico
    );
END
GO

-- ==========================================================================================
-- 5. RECREACIÓN
-- ==========================================================================================

CREATE OR ALTER PROCEDURE SP_RegistrarEmpresaRecreacion
    @NombreComercial NVARCHAR(150),
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
    INSERT INTO EmpresaRecreacion (
        NombreEmpresa,
        CedulaJuridica, CorreoElectronico, Telefono, 
        NombreContacto, Provincia, Canton, Distrito, SenasExactas
    )
    VALUES (
        @NombreComercial, @CedulaJuridica, @CorreoElectronico, @Telefono,
        @NombreContacto, @Provincia, @Canton, @Distrito, @SenasExactas
    );
END
GO

CREATE OR ALTER PROCEDURE SP_ModificarEmpresaRecreacion
    @IdEmpresa INT,
    @NombreComercial NVARCHAR(150),
    @Correo NVARCHAR(100),
    @Telefono NVARCHAR(20)
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE EmpresaRecreacion
    SET NombreEmpresa = @NombreComercial, 
        CorreoElectronico = @Correo, 
        Telefono = @Telefono
    WHERE IdEmpresaRecreacion = @IdEmpresa;
END
GO