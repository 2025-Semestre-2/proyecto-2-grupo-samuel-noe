/*
 * NOMBRE DEL SCRIPT: DML_StoredProcedures.sql
 * DESCRIPCIÓN: Procedimientos Almacenados CRUD y Lógica Transaccional.
 */

USE GestionHoteleraDB;
GO

-- ==========================================================================================
-- 0. INICIALIZACIÓN DE CATÁLOGOS
-- ==========================================================================================

-- Garantizar que existan códigos de país para evitar errores de FK en HospedajeTelefono
IF NOT EXISTS (SELECT 1 FROM CodigoTelefono)
BEGIN
    INSERT INTO CodigoTelefono (IdCodigoTelefono, Pais) VALUES (506, 'Costa Rica');
END
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
    @CodigoPais1 INT,
    @Telefono2 INT = NULL,
    @CodigoPais2 INT = NULL
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRANSACTION;
    BEGIN TRY
        INSERT INTO Hospedaje (
            NombreComercial, CedulaJuridica, TipoHospedaje, Provincia, Canton, Distrito, 
            Barrio, SenasExactas, ReferenciaGPS, CorreoElectronico, SitioWebURL
        )
        VALUES (
            @NombreComercial, @CedulaJuridica, @TipoHospedaje, @Provincia, @Canton, @Distrito, 
            @Barrio, @SenasExactas, @ReferenciaGPS, @CorreoElectronico, @SitioWebURL
        );

        INSERT INTO HospedajeTelefono (IdHospedaje, NumeroTelefono, CodigoPais)
        VALUES (@CedulaJuridica, @Telefono1, @CodigoPais1);

        IF @Telefono2 IS NOT NULL AND @CodigoPais2 IS NOT NULL
        BEGIN
            INSERT INTO HospedajeTelefono (IdHospedaje, NumeroTelefono, CodigoPais)
            VALUES (@CedulaJuridica, @Telefono2, @CodigoPais2);
        END

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END
GO

USE GestionHoteleraDB;
GO

CREATE OR ALTER PROCEDURE SP_ModificarHospedaje
    @IdHospedaje INT,
    @NombreComercial NVARCHAR(150),
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
    @CodigoPais1 INT,
    @Telefono2 INT = NULL,
    @CodigoPais2 INT = NULL
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRANSACTION;
    BEGIN TRY
        UPDATE Hospedaje
        SET NombreComercial = @NombreComercial,
            TipoHospedaje = @TipoHospedaje,
            Provincia = @Provincia,
            Canton = @Canton,
            Distrito = @Distrito,
            Barrio = @Barrio,
            SenasExactas = @SenasExactas,
            ReferenciaGPS = @ReferenciaGPS,
            CorreoElectronico = @CorreoElectronico,
            SitioWebURL = @SitioWebURL
        WHERE CedulaJuridica = @IdHospedaje;

        DELETE FROM HospedajeTelefono WHERE IdHospedaje = @IdHospedaje;

        INSERT INTO HospedajeTelefono (IdHospedaje, NumeroTelefono, CodigoPais)
        VALUES (@IdHospedaje, @Telefono1, @CodigoPais1);

        IF @Telefono2 IS NOT NULL AND @CodigoPais2 IS NOT NULL
        BEGIN
            INSERT INTO HospedajeTelefono (IdHospedaje, NumeroTelefono, CodigoPais)
            VALUES (@IdHospedaje, @Telefono2, @CodigoPais2);
        END

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END
GO

CREATE OR ALTER PROCEDURE SP_EliminarHospedaje
    @CedulaJuridica INT
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRANSACTION;
    BEGIN TRY
        DELETE FROM HospedajeTelefono WHERE IdHospedaje = @CedulaJuridica;
        DELETE FROM HospedajeRedSocial WHERE IdHospedaje = @CedulaJuridica;
        DELETE FROM HospedajeServicio WHERE IdHospedaje = @CedulaJuridica;

        DECLARE @TiposTable TABLE (IdTipo INT);
        INSERT INTO @TiposTable (IdTipo)
        SELECT IdTipoHabitacion FROM TipoHabitacion WHERE IdHospedaje = @CedulaJuridica;

        DELETE FROM HabitacionFoto WHERE IdTipoHabitacion IN (SELECT IdTipo FROM @TiposTable);
        DELETE FROM HabitacionComodidad WHERE IdTipoHabitacion IN (SELECT IdTipo FROM @TiposTable);

        DELETE FROM Habitacion WHERE IdTipoHabitacion IN (SELECT IdTipo FROM @TiposTable);

        DELETE FROM TipoHabitacion WHERE IdHospedaje = @CedulaJuridica;

        DELETE FROM Hospedaje WHERE CedulaJuridica = @CedulaJuridica;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        IF ERROR_NUMBER() = 547
        BEGIN
            THROW 51000, 'No se puede eliminar el hotel porque tiene Historial de Reservaciones o Facturas activas.', 1;
        END
        ELSE
        BEGIN
            THROW;
        END
    END CATCH
END
GO

CREATE OR ALTER PROCEDURE SP_BuscarHoteles
    @Criterio NVARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        CedulaJuridica,
        NombreComercial,
        TipoHospedaje,
        Provincia,
        Canton,
        TelefonoPrincipal,
        CorreoElectronico

    FROM V_ListadoHoteles
    WHERE 
        NombreComercial LIKE '%' + @Criterio + '%' 
        OR CAST(CedulaJuridica AS NVARCHAR) LIKE '%' + @Criterio + '%'
    ORDER BY NombreComercial ASC;
END
GO


CREATE OR ALTER PROCEDURE SP_RegistrarTipoHabitacion
    @Nombre NVARCHAR(50),
    @Descripcion NVARCHAR(MAX),
    @Precio DECIMAL(10,2)
AS
BEGIN
    THROW 51000, 'Use SP_RegistrarTipoHabitacion_V2 que incluye IdHospedaje.', 1;
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

CREATE OR ALTER PROCEDURE SP_RegistrarHabitacion
    @IdHospedaje INT,
    @IdTipoHabitacion INT,
    @Numero INT,
    @Estado NVARCHAR(20)
AS
BEGIN
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
    UPDATE Habitacion
    SET IdTipoHabitacion = @IdTipoHabitacion,
        NumeroHabitacion = @Numero,
        Estado = @Estado
    WHERE IdHabitacion = @IdHabitacion;
END
GO

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
    INSERT INTO EmpresaRecreacion (
        NombreEmpresa, CedulaJuridica, CorreoElectronico, Telefono, 
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
    UPDATE EmpresaRecreacion
    SET NombreEmpresa = @NombreComercial, 
        CorreoElectronico = @Correo, 
        Telefono = @Telefono
    WHERE IdEmpresaRecreacion = @IdEmpresa;
END
GO