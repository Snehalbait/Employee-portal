const express = require('express');
const employeeRoutes = require('./routes/employee.routes');

const app = express();

app.use(express.json());
app.use('/api/employees', employeeRoutes);

module.exports = app;
