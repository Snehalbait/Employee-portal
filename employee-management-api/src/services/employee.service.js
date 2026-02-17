const { sql, poolPromise } = require('../config/db');

const loginEmployee = async (employeeId, password) => {
    try { 
      

        const pool = await poolPromise;

        const result = await pool.request()
            .input('EmployeeId', sql.NVarChar(20), employeeId)
            .input('PasswordHash', sql.NVarChar(255), password)
            .execute('usp_LoginEmployee');
console.log(result.recordset[0],"result");

        return result.recordset[0];

    } catch (error) {
        console.error(" loginEmployee Error:", error);
        throw error;
    }
};

const addEmployee = async (data) => {
    try {
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

    } catch (error) {
        console.error(" addEmployee Error:", error);
        throw error;
    }
};

const getActiveEmployees = async () => {
    try {
        const pool = await poolPromise;

        const result = await pool.request()
            .execute('usp_GetActiveEmployees');

        return result.recordset;

    } catch (error) {
        console.error(" getActiveEmployees Error:", error);
        throw error;
    }
};

const getRoutesByRole = async (role) => {
    try {
        const pool = await poolPromise;
console.log(role,"role");

        const result = await pool.request()
            .input('Role', sql.NVarChar(20), role)
            .execute('usp_GetRoutesByRole');

        return result.recordset;

    } catch (error) {
        console.error(" getRoutesByRole Error:", error);
        throw error;
    }
};

module.exports = {
    loginEmployee,
    addEmployee,
    getActiveEmployees,
    getRoutesByRole
};
