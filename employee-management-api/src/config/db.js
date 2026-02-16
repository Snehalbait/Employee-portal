const sql = require('mssql');

const config = {
  server: '(localdb)\\MSSQLLocalDB',
  database: 'YourDatabaseName',
  options: {
    trustServerCertificate: true
  },
  authentication: {
    type: 'ntlm',
    options: {
      domain: '',
      userName: '',
      password: ''
    }
  }
};

sql.connect(config)
  .then(() => console.log('Connected'))
  .catch(err => console.log(err));
