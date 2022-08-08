require('dotenv').config();

const {tokenManager, globalHttpClient} = require('./services/helpers');
const {app} = require('./app');

const {PORT} = process.env;

function setupGlobalHttpClient() {
  globalHttpClient.setDefaultHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${tokenManager.getToken()}`,
  });
}

function startApplication() {
  app.listen(parseInt(PORT), () => {
    console.log(`Spotiphy is up on port ${PORT}`);
  });
}

tokenManager.loadToken()
  .then(setupGlobalHttpClient)
  .then(startApplication)
  .catch(err => {console.error(err.message)});
