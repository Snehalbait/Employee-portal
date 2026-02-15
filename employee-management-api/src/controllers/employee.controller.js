const employeeService = require('../services/employee.service');

const login = async (req, res) => {
    try {
        const { employeeId, password } = req.body;

        const result = await employeeService.loginEmployee(employeeId, password);

        if (!result || result.length === 0 || result[0].Status === 'FAIL') {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        res.status(200).json(result[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { login };
