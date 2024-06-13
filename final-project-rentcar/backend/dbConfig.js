const oracledb = require('oracledb');

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
oracledb.initOracleClient({ libDir: "C:\\instanclient\\instantclient_19_23" });

// Assuming you have your database configuration in a separate file or constants
const dbConfig = {
    user: "pandawa",
    password: "12345678",
    connectString: "localhost/xe",
    externalAuth: false,
};

// Initialize connection pool
async function initialize() {
  try {
    await oracledb.createPool(dbConfig);
    console.log('OracleDB pool created successfully');
  } catch (err) {
    console.error('Error initializing OracleDB pool: ', err);
  }
}

// Call initialize function somewhere in your application, like at startup
initialize();
module.exports = oracledb;
