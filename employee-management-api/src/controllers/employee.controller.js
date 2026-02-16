const employeeService = require('../services/employee.service');
const { successResponse, errorResponse } = require('../utils/response');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    try {
        const { EmployeeId, PasswordHash } = req.body;

        const result = await employeeService.loginEmployee(EmployeeId, PasswordHash);

        if (result.Status === 'FAIL') {
            return errorResponse(res, result.Message, 401);
        }

        const token = jwt.sign(
            {
                employeeId: result.EmployeeId,
                role: result.Role
            },
            process.env.JWT_SECRET || "employeelogin",
            { expiresIn: "8h" }
        );

        return successResponse(res, "Login successful", {
            employee: result,
            token
        });

    } catch (error) {
        console.error(error);
        return errorResponse(res, "Server error");
    }
};

const insertEmployee = async (req, res) => {
    try {
        const result = await employeeService.addEmployee(req.body);

        if (result.Status === 'FAIL') {
            return errorResponse(res, result.Message, 400);
        }

        return successResponse(res, "Employee created successfully", result);

    } catch (error) {
        console.error(error);
        return errorResponse(res, "Server error");
    }
};

const getEmployees = async (req, res) => {
    try {
        const employees = await employeeService.getActiveEmployees();

        return successResponse(res, "Employees fetched successfully", employees);

    } catch (error) {
        console.error(error);
        return errorResponse(res, "Server error");
    }
};

module.exports = {
    login,
    insertEmployee,
    getEmployees
};
