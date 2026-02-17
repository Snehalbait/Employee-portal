const employeeService = require('../services/employee.service');
const { successResponse, errorResponse } = require('../utils/response');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  try {
    const { employeeId, password } = req.body;
    const result = await employeeService.loginEmployee(employeeId, password);
    if (result.Status === 'FAIL') {
      return errorResponse(res, result.Message, 401);
    }
    const token = jwt.sign(
      {
        employeeId: result.EmployeeId,
        role: result.Role, // role comes from DB
      },
      process.env.JWT_SECRET || 'employeelogin',
      { expiresIn: '8h' }
    );
    return successResponse(res, 'Login successful', {
      employee: result,
      token,
    });
  } catch (error) {
    console.error(error);
    return errorResponse(res, 'Server error');
  }
};

const insertEmployee = async (req, res) => {
  try {
    const result = await employeeService.addEmployee(req.body);

    if (result.Status === 'FAIL') {
      return errorResponse(res, result.Message, 400);
    }

    return successResponse(res, 'Employee created successfully', result);
  } catch (error) {
    console.error(error);
    return errorResponse(res, 'Server error');
  }
};

const getEmployees = async (req, res) => {
  try {
    const employees = await employeeService.getActiveEmployees();

    return successResponse(res, 'Employees fetched successfully', employees);
  } catch (error) {
    console.error(error);
    return errorResponse(res, 'Server error');
  }
};

const getAccessibleRoutes = async (req, res) => {
  try {
    const role = req.user?.role;

    if (!role) {
      return errorResponse(res, 'Role not found for user', 400);
    }

    const routes = await employeeService.getRoutesByRole(role);

    return successResponse(res, 'Accessible routes fetched successfully', routes);
  } catch (error) {
    console.error('getAccessibleRoutes error:', error);
    return errorResponse(res, 'Server error while fetching routes');
  }
};

module.exports = {
  login,
  insertEmployee,
  getEmployees,
  getAccessibleRoutes,
};
