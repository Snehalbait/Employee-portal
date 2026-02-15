const { sql, pool, poolConnect } = require('../config/db');

const loginEmployee = async (employeeId, passwordHash) => {
    await poolConnect;

    const result = await pool.request()
        .input('EmployeeId', sql.NVarChar, employeeId)
        .input('PasswordHash', sql.NVarChar, passwordHash)
        .execute('usp_LoginEmployee');

    return result.recordset;
};

module.exports = { loginEmployee };
