'use-strict';

const express = require('express');

const app = express();
const xsenv = require('@sap/xsenv');
const logging = require('@sap/logging');
const bodyParser = require('body-parser');
const passport = require('passport');
const xssec = require('@sap/xssec');
const multer = require('multer');

if (process.env.NODE_ENV === 'dev') xsenv.loadEnv();

const services = xsenv.getServices({
  uaa: { name: 'ga-shareduaa' },
});

const port = process.env.PORT || 3001;
passport.use('JWT', new xssec.JWTStrategy(services.uaa));
const multerMemoryStore = multer({ storage: multer.memoryStorage() });

// Logging Middleware
const appContext = logging.createAppContext();
app.use(logging.middleware({
  appContext,
  logNetwork: true,
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Security Middleware
app.use(passport.initialize());
app.use(passport.authenticate('JWT', {
  session: false,
}));

app.get('/', (req, res) => {
  res.send('hello');
});

/**
 *  Various routes
 *
 */
const imageRouter = require('./routes/imageRoute')();
const titleRouter = require('./routes/titleRoute')();
const mentorRouter = require('./routes/mentorRoute')();
app.use('/api/v1', multerMemoryStore.single('att'), imageRouter);
app.use('/api/v1', titleRouter);
app.use('/api/v1', mentorRouter);
app.listen(port, () => {
  console.info(`Server running on port: ${port}`);
});
