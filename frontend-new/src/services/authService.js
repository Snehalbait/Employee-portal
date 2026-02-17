import API from './api';

export const loginUser = async (data) => {
  try {
    const response = await API.post('/login', data);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: 'Login failed' };
  }
};

export const addEmployee = async (employeeData) => {
  try {
    const response = await API.post('/employees', employeeData);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: 'Add employee failed' };
  }
};

export const getAccessibleRoutes = async () => {
  try {
    const response = await API.get('/routes');
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: 'Failed to fetch routes' };
  }
};
