# GestionHotelera API

Backend Node.js + Express para conectar con SQL Server

## Instalación

```bash
npm install
```

## Iniciar servidor

```bash
npm start
```

El servidor corre en `http://localhost:3000`

## Endpoints

- `GET /api/hospedaje-telefonos` - Obtener todos los teléfonos de hospedaje
- `GET /api/hospedaje-telefonos/:id` - Obtener teléfono por ID
- `GET /api/health` - Verificar estado del servidor

## Conexión

- **Servidor:** L-SammyGC\MSSQLSERVER01
- **BD:** GestionHoteleraDB
- **Tabla:** HospedajeTelefono
- **Autenticación:** Windows
