'use-strict';

// dependencies for the multitenancyHandler

const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const logging = require('@sap/logging');
const xsenv = require('@sap/xsenv');
const xssec = require('@sap/xssec');
const passport = require('passport');
const hdbext = require('@sap/hdbext');

const appContext = logging.createAppContext();
const app = express();
const port = process.env.PORT || 3002;
const server = http.createServer(app);

if (process.env.NODE_ENV === 'dev') xsenv.loadEnv();

const services = xsenv.getServices({
  uaa: { name: 'ga-shareduaa' },
});
const hanaOptions = xsenv.getServices({
  hana: { name: 'easyfranchise-tenant-hdiconatiner' },
});
console.log(hanaOptions.hana);
passport.use('JWT', new xssec.JWTStrategy(services.uaa));
app.use(passport.initialize());
app.use(passport.authenticate('JWT', {
  session: false,
}));
// HANA Middleware Initialization
app.use(hdbext.middleware(hanaOptions.hana));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(logging.middleware({ appContext, logNetwork: true }));
const saasRoute = require('./routes/saasRoute')();
const dependecyRoute = require('./routes/dependencyRouter')();

app.use('/', saasRoute);
app.use('/', dependecyRoute);
app.get('/', (req, res) => {
  const logger = req.loggingContext.getLogger('/Application/*');
  logger.info('Hello from Provisioning service....🟢');
  res.status(200).send('Hello for Provisioning Service 🟢 ');
});


server.listen(port, () => {
  console.info(`Server Running now at post: ${port}`);
});
