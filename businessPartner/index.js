'use-strict';
const express = require('express');

const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const xsenv = require('@sap/xsenv');
const logging = require('@sap/logging');
const bodyParser = require('body-parser');
const passport = require('passport');
const xssec = require('@sap/xssec');

if (process.env.NODE_ENV === 'dev') xsenv.loadEnv();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


const services = xsenv.getServices({
    uaa: {name: 'ga-shareduaa'},
});


const port = process.env.PORT || 3001;
passport.use('JWT', new xssec.JWTStrategy(services.uaa));

// Logging Middleware
const appContext = logging.createAppContext();
app.use(logging.middleware({
    appContext: appContext,
    logNetwork: true,
}));

app.use(bodyParser.urlencoded({extended: true}));
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
const bpRemote = require('./routes/bpRemoteRoute')();
const newBusinessPartners = require('./routes/newBusinessPartnerRoute')();
const mentors = require('./routes/mentorRoute')();
app.use('/api/v1', bpRemote);
app.use('/api/v1', newBusinessPartners);
app.use('/api/v1', mentors);
app.listen(port, () => {
    console.info('Server running on port: ' + port);
});


