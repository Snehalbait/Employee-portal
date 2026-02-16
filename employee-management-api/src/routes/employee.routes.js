const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employee.controller');

router.post('/login', employeeController.login);
router.post('/employees', employeeController.insertEmployee);
router.get('/employees', employeeController.getEmployees);

module.exports = router;
