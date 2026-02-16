require('dotenv').config();
const express = require('express');
require('./config/db');   
const employeeRoutes = require('./routes/employee.routes');

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(` Server running on port ${PORT}`);
});


app.get('/', (req, res) => {
    res.send("API Working 🚀");
});

app.use('/api/employees', employeeRoutes);

