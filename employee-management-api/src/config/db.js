// db.js
const sql = require('mssql');

const config = {
  user: 'sa',
  password: 'sa@1234',
  server: 'LAPTOP-47VVQA9R',
  database: 'EmployeePortal',
  port: 1433,
  options: {
    encrypt: false,
    trustServerCertificate: true
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  requestTimeout: 300000
};

// create a single pool instance
const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to SQL Server pool!');
    return pool;
  })
  .catch(err => {
    console.error('DB Connection Failed:', err);
    process.exit(1);
  });

module.exports = { sql, poolPromise };
