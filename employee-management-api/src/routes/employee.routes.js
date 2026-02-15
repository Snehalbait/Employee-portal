const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employee.controller');

router.post('/login', employeeController.login);

module.exports = router;
