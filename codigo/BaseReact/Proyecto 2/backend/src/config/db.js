const sql = require('mssql');
require('dotenv').config();

const dbSettings = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
        encrypt: false,
        trustServerCertificate: true,
    },
};

const getConnection = async () => {
    try {
        const pool = await sql.connect(dbSettings);
        return pool;
    } catch (error) {
        console.error('Error de conexión a BD:', error);
        throw error;
    }
};

module.exports = { getConnection, sql };