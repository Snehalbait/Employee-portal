const express = require('express');
const router = express.Router();

const employeeController = require('../controllers/employee.controller');
const { authenticate } = require('../middleware/auth.middleware');

router.post('/login', employeeController.login);
router.post('/employees', authenticate,employeeController.insertEmployee);
router.get('/employees', authenticate,employeeController.getEmployees);

router.get('/routes', authenticate, employeeController.getAccessibleRoutes);

module.exports = router;
