const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  db: {
    host: process.env.DB_HOST,
    name: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    userName: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
  rpc: {
    timeToRequest: '30 * * * * *',
    infuraId: process.env.RPC_INFURA_ID || '0c1f1141b70e434e99e5d4072a65c7d5',
  },
  server: {
    port: process.env.APP_PORT || 8080,
  },
};
