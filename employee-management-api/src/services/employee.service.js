const { sql, poolPromise } = require('../config/db');

const loginEmployee = async (EmployeeId, PasswordHash) => {
    const pool = await poolPromise;

    const result = await pool.request()
        .input('EmployeeId', sql.NVarChar(20), EmployeeId)
        .input('PasswordHash', sql.NVarChar(255), PasswordHash)
        .execute('usp_LoginEmployee');

    return result.recordset[0];
};

const addEmployee = async (data) => {
    const pool = await poolPromise;

    const result = await pool.request()
        .input('FullName', sql.NVarChar(100), data.FullName)
        .input('Email', sql.NVarChar(100), data.Email)
        .input('MobileNumber', sql.NVarChar(10), data.MobileNumber)
        .input('PasswordHash', sql.NVarChar(255), data.PasswordHash)
        .input('Role', sql.NVarChar(20), data.Role)
        .input('CreatedBy', sql.NVarChar(20), data.CreatedBy)
        .execute('usp_AddEmployee');

    return result.recordset[0];
};

const getActiveEmployees = async () => {
    const pool = await poolPromise;

    const result = await pool.request()
        .execute('usp_GetActiveEmployees');

    return result.recordset;
};

module.exports = {
    loginEmployee,
    addEmployee,
    getActiveEmployees
};
