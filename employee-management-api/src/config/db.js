const sql = require('mssql');

const config = {
    server: 'localhost',
    database: 'EmployeeDB',
    port: 1433,
    user: 'apiuser',
    password: 'Password@123',
    options: {
        trustServerCertificate: true
    }
};


const pool = new sql.ConnectionPool(config);

pool.connect()
    .then(() => console.log("✅ Connected to SQL Server"))
    .catch(err => console.error("❌ DB Connection Failed:", err));

module.exports = { sql, pool };
