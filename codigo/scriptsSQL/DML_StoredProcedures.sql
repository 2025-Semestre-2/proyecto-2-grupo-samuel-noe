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

USE GestionHoteleraDB;
GO

-- ==========================================================================================
-- MÓDULO DE TELÉFONOS DE HOTEL (Con validación de cantidad 1..2)
-- ==========================================================================================

CREATE OR ALTER PROCEDURE SP_ReportarTelefonosHotel
AS
BEGIN
    SELECT 
        ht.IdHospedajeTelefono,
        h.NombreComercial AS Hotel,
        ht.IdHospedaje,
        ct.Pais,
        ht.NumeroTelefono
    FROM HospedajeTelefono ht
    INNER JOIN Hospedaje h ON ht.IdHospedaje = h.CedulaJuridica
    INNER JOIN CodigoTelefono ct ON ht.CodigoPais = ct.IdCodigoTelefono
    ORDER BY h.NombreComercial;
END
GO

CREATE OR ALTER PROCEDURE SP_RegistrarTelefonoIndividual
    @IdHospedaje INT,
    @CodigoPais INT,
    @NumeroTelefono INT
AS
BEGIN
    SET NOCOUNT ON;
    
    IF NOT EXISTS (SELECT 1 FROM Hospedaje WHERE CedulaJuridica = @IdHospedaje)
    BEGIN
        THROW 51000, 'El Hotel especificado no existe.', 1;
    END

    DECLARE @CantidadActual INT;
    SELECT @CantidadActual = COUNT(*) FROM HospedajeTelefono WHERE IdHospedaje = @IdHospedaje;

    IF @CantidadActual >= 2
    BEGIN
        THROW 51000, 'Error: Este hotel ya tiene el máximo permitido de 2 teléfonos. Elimine uno para agregar otro.', 1;
    END

    INSERT INTO HospedajeTelefono (IdHospedaje, CodigoPais, NumeroTelefono)
    VALUES (@IdHospedaje, @CodigoPais, @NumeroTelefono);
END
GO

CREATE OR ALTER PROCEDURE SP_ModificarTelefonoIndividual
    @IdTelefono INT,
    @CodigoPais INT,
    @NumeroTelefono INT
AS
BEGIN
    SET NOCOUNT ON;
    
    UPDATE HospedajeTelefono
    SET CodigoPais = @CodigoPais,
        NumeroTelefono = @NumeroTelefono
    WHERE IdHospedajeTelefono = @IdTelefono;
END
GO

CREATE OR ALTER PROCEDURE SP_EliminarTelefonoIndividual
    @IdTelefono INT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @IdHospedaje INT;
    SELECT @IdHospedaje = IdHospedaje FROM HospedajeTelefono WHERE IdHospedajeTelefono = @IdTelefono;

    DECLARE @CantidadActual INT;
    SELECT @CantidadActual = COUNT(*) FROM HospedajeTelefono WHERE IdHospedaje = @IdHospedaje;

    IF @CantidadActual <= 1
    BEGIN
        THROW 51000, 'Error: No se puede eliminar el único teléfono del hotel. Debe existir al menos uno.', 1;
    END

    DELETE FROM HospedajeTelefono WHERE IdHospedajeTelefono = @IdTelefono;
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

-- ==========================================================================================
-- MÓDULO REDES SOCIALES DE HOTEL
-- ==========================================================================================

CREATE OR ALTER PROCEDURE SP_ListarCatalogoRedes
AS
BEGIN
    SELECT IdCatalogoSocial, NombrePlataforma FROM CatalogoRedSocial;
END
GO

CREATE OR ALTER PROCEDURE SP_RegistrarRedSocialHotel
    @IdHospedaje INT,
    @IdPlataforma INT
AS
BEGIN
    SET NOCOUNT ON;

    IF NOT EXISTS (SELECT 1 FROM Hospedaje WHERE CedulaJuridica = @IdHospedaje)
        THROW 51000, 'El Hotel no existe.', 1;

    IF EXISTS (SELECT 1 FROM HospedajeRedSocial WHERE IdHospedaje = @IdHospedaje AND IdPlataforma = @IdPlataforma)
        THROW 51000, 'Este hotel ya tiene asociada esa red social.', 1;

    INSERT INTO HospedajeRedSocial (IdHospedaje, IdPlataforma)
    VALUES (@IdHospedaje, @IdPlataforma);
END
GO

CREATE OR ALTER PROCEDURE SP_ReportarRedesSocialesHotel
AS
BEGIN
    SELECT 
        hr.IdRedSocial,
        h.NombreComercial AS Hotel,
        h.CedulaJuridica AS IdHospedaje,
        c.NombrePlataforma AS RedSocial
    FROM HospedajeRedSocial hr
    INNER JOIN Hospedaje h ON hr.IdHospedaje = h.CedulaJuridica
    INNER JOIN CatalogoRedSocial c ON hr.IdPlataforma = c.IdCatalogoSocial
    ORDER BY h.NombreComercial;
END
GO

CREATE OR ALTER PROCEDURE SP_ModificarRedSocialHotel
    @IdRedSocial INT,
    @IdPlataforma INT
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE HospedajeRedSocial
    SET IdPlataforma = @IdPlataforma
    WHERE IdRedSocial = @IdRedSocial;
END
GO

CREATE OR ALTER PROCEDURE SP_EliminarRedSocialHotel
    @IdRedSocial INT
AS
BEGIN
    SET NOCOUNT ON;
    DELETE FROM HospedajeRedSocial WHERE IdRedSocial = @IdRedSocial;
END
GO

-- ==========================================================================================
-- MÓDULO CATÁLOGO REDES SOCIALES (MAESTRO)
-- ==========================================================================================

CREATE OR ALTER PROCEDURE SP_ReportarCatalogoRedSocial
AS
BEGIN
    SELECT IdCatalogoSocial, NombrePlataforma, UrlPlataforma 
    FROM CatalogoRedSocial
    ORDER BY NombrePlataforma;
END
GO

CREATE OR ALTER PROCEDURE SP_RegistrarCatalogoRedSocial
    @Nombre NVARCHAR(50),
    @Url NVARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;
    IF EXISTS (SELECT 1 FROM CatalogoRedSocial WHERE NombrePlataforma = @Nombre)
        THROW 51000, 'Ya existe una plataforma con ese nombre.', 1;

    INSERT INTO CatalogoRedSocial (NombrePlataforma, UrlPlataforma)
    VALUES (@Nombre, @Url);
END
GO

CREATE OR ALTER PROCEDURE SP_ModificarCatalogoRedSocial
    @Id INT,
    @Nombre NVARCHAR(50),
    @Url NVARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE CatalogoRedSocial
    SET NombrePlataforma = @Nombre,
        UrlPlataforma = @Url
    WHERE IdCatalogoSocial = @Id;
END
GO

CREATE OR ALTER PROCEDURE SP_EliminarCatalogoRedSocial
    @Id INT
AS
BEGIN
    SET NOCOUNT ON;

    IF EXISTS (SELECT 1 FROM HospedajeRedSocial WHERE IdPlataforma = @Id)
    BEGIN
        DECLARE @Cant INT;
        SELECT @Cant = COUNT(*) FROM HospedajeRedSocial WHERE IdPlataforma = @Id;
        
        DECLARE @Msg NVARCHAR(200) = CONCAT('No se puede eliminar. Esta red social está asociada a ', @Cant, ' hoteles. Desvincúlelos primero.');
        THROW 51000, @Msg, 1;
    END

    DELETE FROM CatalogoRedSocial WHERE IdCatalogoSocial = @Id;
END
GO

-- ==========================================================================================
-- MÓDULO CATÁLOGO DE SERVICIOS (MAESTRO)
-- ==========================================================================================

CREATE OR ALTER PROCEDURE SP_ReportarCatalogoServicio
AS
BEGIN
    SELECT IdCatalogoServicio, NombreServicio 
    FROM CatalogoServicio
    ORDER BY NombreServicio;
END
GO

CREATE OR ALTER PROCEDURE SP_RegistrarCatalogoServicio
    @Nombre NVARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;
    IF EXISTS (SELECT 1 FROM CatalogoServicio WHERE NombreServicio = @Nombre)
        THROW 51000, 'Ya existe un servicio con ese nombre.', 1;

    INSERT INTO CatalogoServicio (NombreServicio)
    VALUES (@Nombre);
END
GO

CREATE OR ALTER PROCEDURE SP_ModificarCatalogoServicio
    @Id INT,
    @Nombre NVARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;
    
    IF EXISTS (SELECT 1 FROM CatalogoServicio WHERE NombreServicio = @Nombre AND IdCatalogoServicio <> @Id)
        THROW 51000, 'Ya existe otro servicio con ese nombre.', 1;

    UPDATE CatalogoServicio
    SET NombreServicio = @Nombre
    WHERE IdCatalogoServicio = @Id;
END
GO

CREATE OR ALTER PROCEDURE SP_EliminarCatalogoServicio
    @Id INT
AS
BEGIN
    SET NOCOUNT ON;

    IF EXISTS (SELECT 1 FROM HospedajeServicio WHERE IdServicio = @Id)
    BEGIN
        DECLARE @Cant INT;
        SELECT @Cant = COUNT(*) FROM HospedajeServicio WHERE IdServicio = @Id;
        
        DECLARE @Msg NVARCHAR(200) = CONCAT('No se puede eliminar. Este servicio lo ofrecen ', @Cant, ' hoteles. Desvincúlelos primero.');
        THROW 51000, @Msg, 1;
    END

    DELETE FROM CatalogoServicio WHERE IdCatalogoServicio = @Id;
END
GO

-- ==========================================================================================
-- MÓDULO SERVICIOS DE HOSPEDAJE (TABLA INTERMEDIA)
-- ==========================================================================================

CREATE OR ALTER PROCEDURE SP_RegistrarHospedajeServicio
    @IdHospedaje INT,
    @IdServicio INT
AS
BEGIN
    SET NOCOUNT ON;

    IF NOT EXISTS (SELECT 1 FROM Hospedaje WHERE CedulaJuridica = @IdHospedaje)
        THROW 51000, 'El Hotel no existe.', 1;

    IF EXISTS (SELECT 1 FROM HospedajeServicio WHERE IdHospedaje = @IdHospedaje AND IdServicio = @IdServicio)
        THROW 51000, 'Este hotel ya ofrece este servicio.', 1;

    INSERT INTO HospedajeServicio (IdHospedaje, IdServicio)
    VALUES (@IdHospedaje, @IdServicio);
END
GO

CREATE OR ALTER PROCEDURE SP_ReportarHospedajeServicio
AS
BEGIN
    SELECT 
        hs.IdHospedajeServicio,
        h.NombreComercial AS Hotel,
        hs.IdHospedaje,
        cs.NombreServicio AS Servicio
    FROM HospedajeServicio hs
    INNER JOIN Hospedaje h ON hs.IdHospedaje = h.CedulaJuridica
    INNER JOIN CatalogoServicio cs ON hs.IdServicio = cs.IdCatalogoServicio
    ORDER BY h.NombreComercial;
END
GO

CREATE OR ALTER PROCEDURE SP_ModificarHospedajeServicio
    @Id INT,
    @IdServicio INT
AS
BEGIN
    SET NOCOUNT ON;
    
    DECLARE @IdHotel INT;
    SELECT @IdHotel = IdHospedaje FROM HospedajeServicio WHERE IdHospedajeServicio = @Id;

    IF EXISTS (SELECT 1 FROM HospedajeServicio WHERE IdHospedaje = @IdHotel AND IdServicio = @IdServicio AND IdHospedajeServicio <> @Id)
        THROW 51000, 'El hotel ya tiene este servicio asignado en otro registro.', 1;

    UPDATE HospedajeServicio
    SET IdServicio = @IdServicio
    WHERE IdHospedajeServicio = @Id;
END
GO

CREATE OR ALTER PROCEDURE SP_EliminarHospedajeServicio
    @Id INT
AS
BEGIN
    SET NOCOUNT ON;
    DELETE FROM HospedajeServicio WHERE IdHospedajeServicio = @Id;
END
GO

-- ==========================================================================================
-- MÓDULO TIPO DE HABITACIÓN
-- ==========================================================================================

CREATE OR ALTER PROCEDURE SP_ReportarTipoHabitacion
AS
BEGIN
    SELECT 
        th.IdTipoHabitacion,
        h.NombreComercial AS Hotel,
        th.IdHospedaje,
        th.Nombre,
        th.Descripcion,
        th.TipoCama,
        th.PrecioPorNoche
    FROM TipoHabitacion th
    INNER JOIN Hospedaje h ON th.IdHospedaje = h.CedulaJuridica
    ORDER BY h.NombreComercial, th.Nombre;
END
GO

CREATE OR ALTER PROCEDURE SP_RegistrarTipoHabitacion
    @IdHospedaje INT,
    @Nombre NVARCHAR(100),
    @Descripcion NVARCHAR(MAX),
    @TipoCama NVARCHAR(50),
    @Precio DECIMAL(10,2)
AS
BEGIN
    SET NOCOUNT ON;

    IF NOT EXISTS (SELECT 1 FROM Hospedaje WHERE CedulaJuridica = @IdHospedaje)
        THROW 51000, 'El Hotel seleccionado no existe.', 1;

    IF @TipoCama NOT IN ('Individual', 'Queen', 'King')
        THROW 51000, 'El tipo de cama no es válido. Use: Individual, Queen o King.', 1;

    INSERT INTO TipoHabitacion (IdHospedaje, Nombre, Descripcion, TipoCama, PrecioPorNoche)
    VALUES (@IdHospedaje, @Nombre, @Descripcion, @TipoCama, @Precio);
END
GO

CREATE OR ALTER PROCEDURE SP_ModificarTipoHabitacion
    @IdTipoHabitacion INT,
    @Nombre NVARCHAR(100),
    @Descripcion NVARCHAR(MAX),
    @TipoCama NVARCHAR(50),
    @Precio DECIMAL(10,2)
AS
BEGIN
    SET NOCOUNT ON;

    IF @TipoCama NOT IN ('Individual', 'Queen', 'King')
        THROW 51000, 'El tipo de cama no es válido.', 1;

    UPDATE TipoHabitacion
    SET Nombre = @Nombre,
        Descripcion = @Descripcion,
        TipoCama = @TipoCama,
        PrecioPorNoche = @Precio
    WHERE IdTipoHabitacion = @IdTipoHabitacion;
END
GO

CREATE OR ALTER PROCEDURE SP_EliminarTipoHabitacion
    @IdTipoHabitacion INT
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRANSACTION;
    BEGIN TRY
        IF EXISTS (SELECT 1 FROM Habitacion WHERE IdTipoHabitacion = @IdTipoHabitacion)
        BEGIN
            DECLARE @Cant INT;
            SELECT @Cant = COUNT(*) FROM Habitacion WHERE IdTipoHabitacion = @IdTipoHabitacion;
            DECLARE @Msg NVARCHAR(200) = CONCAT('No se puede eliminar. Existen ', @Cant, ' habitaciones físicas de este tipo. Elimínelas primero.');
            THROW 51000, @Msg, 1;
        END

        DELETE FROM HabitacionFoto WHERE IdTipoHabitacion = @IdTipoHabitacion;
        DELETE FROM HabitacionComodidad WHERE IdTipoHabitacion = @IdTipoHabitacion;

        DELETE FROM TipoHabitacion WHERE IdTipoHabitacion = @IdTipoHabitacion;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END
GO

-- ==========================================================================================
-- MÓDULO COMODIDADES DE HABITACIÓN
-- ==========================================================================================

CREATE OR ALTER PROCEDURE SP_ReportarHabitacionComodidad
AS
BEGIN
    SELECT 
        hc.IdComodidad,
        h.NombreComercial AS Hotel,
        th.Nombre AS TipoHabitacion,
        hc.IdTipoHabitacion,
        hc.Descripcion
    FROM HabitacionComodidad hc
    INNER JOIN TipoHabitacion th ON hc.IdTipoHabitacion = th.IdTipoHabitacion
    INNER JOIN Hospedaje h ON th.IdHospedaje = h.CedulaJuridica
    ORDER BY h.NombreComercial, th.Nombre;
END
GO

CREATE OR ALTER PROCEDURE SP_RegistrarHabitacionComodidad
    @IdTipoHabitacion INT,
    @Descripcion NVARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;
    
    IF NOT EXISTS (SELECT 1 FROM TipoHabitacion WHERE IdTipoHabitacion = @IdTipoHabitacion)
        THROW 51000, 'El Tipo de Habitación seleccionado no existe.', 1;

    INSERT INTO HabitacionComodidad (IdTipoHabitacion, Descripcion)
    VALUES (@IdTipoHabitacion, @Descripcion);
END
GO

CREATE OR ALTER PROCEDURE SP_ModificarHabitacionComodidad
    @IdComodidad INT,
    @IdTipoHabitacion INT,
    @Descripcion NVARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;
    
    IF NOT EXISTS (SELECT 1 FROM TipoHabitacion WHERE IdTipoHabitacion = @IdTipoHabitacion)
        THROW 51000, 'El Tipo de Habitación seleccionado no existe.', 1;

    UPDATE HabitacionComodidad
    SET IdTipoHabitacion = @IdTipoHabitacion,
        Descripcion = @Descripcion
    WHERE IdComodidad = @IdComodidad;
END
GO

CREATE OR ALTER PROCEDURE SP_EliminarHabitacionComodidad
    @IdComodidad INT
AS
BEGIN
    SET NOCOUNT ON;
    DELETE FROM HabitacionComodidad WHERE IdComodidad = @IdComodidad;
END
GO

-- ==========================================================================================
-- MÓDULO FOTOS DE HABITACIÓN
-- ==========================================================================================

CREATE OR ALTER PROCEDURE SP_ReportarHabitacionFoto
AS
BEGIN
    SELECT 
        hf.IdFoto,
        h.NombreComercial AS Hotel,
        th.Nombre AS TipoHabitacion,
        hf.IdTipoHabitacion,
        hf.UrlFoto
    FROM HabitacionFoto hf
    INNER JOIN TipoHabitacion th ON hf.IdTipoHabitacion = th.IdTipoHabitacion
    INNER JOIN Hospedaje h ON th.IdHospedaje = h.CedulaJuridica
    ORDER BY h.NombreComercial, th.Nombre;
END
GO

CREATE OR ALTER PROCEDURE SP_RegistrarHabitacionFoto
    @IdTipoHabitacion INT,
    @UrlFoto NVARCHAR(MAX)
AS
BEGIN
    SET NOCOUNT ON;
    
    IF NOT EXISTS (SELECT 1 FROM TipoHabitacion WHERE IdTipoHabitacion = @IdTipoHabitacion)
        THROW 51000, 'El Tipo de Habitación seleccionado no existe.', 1;

    INSERT INTO HabitacionFoto (IdTipoHabitacion, UrlFoto)
    VALUES (@IdTipoHabitacion, @UrlFoto);
END
GO

CREATE OR ALTER PROCEDURE SP_ModificarHabitacionFoto
    @IdFoto INT,
    @IdTipoHabitacion INT,
    @UrlFoto NVARCHAR(MAX)
AS
BEGIN
    SET NOCOUNT ON;
    
    IF NOT EXISTS (SELECT 1 FROM TipoHabitacion WHERE IdTipoHabitacion = @IdTipoHabitacion)
        THROW 51000, 'El Tipo de Habitación seleccionado no existe.', 1;

    UPDATE HabitacionFoto
    SET IdTipoHabitacion = @IdTipoHabitacion,
        UrlFoto = @UrlFoto
    WHERE IdFoto = @IdFoto;
END
GO

CREATE OR ALTER PROCEDURE SP_EliminarHabitacionFoto
    @IdFoto INT
AS
BEGIN
    SET NOCOUNT ON;
    DELETE FROM HabitacionFoto WHERE IdFoto = @IdFoto;
END
GO