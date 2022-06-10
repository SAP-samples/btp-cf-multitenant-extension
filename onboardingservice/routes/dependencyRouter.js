/* eslint-disable max-len */
const express = require('express');
const xsenv = require('@sap/xsenv');

// List of re-use dependent services
const services = xsenv.getServices({
  connectivity: { name: 'gaconn' },
  destination: { name: 'destination' },
});
const dependencyRoute = () => {
  // eslint-disable-next-line new-cap
  const saasRoute = express.Router();
  saasRoute.route('/callback/v1.0/dependencies')
    .get((req, res) => {
      const logger = req.loggingContext.getLogger('/Application');
      try {
        const dependencies = [];
        dependencies.push({ xsappname: services.connectivity.xsappname });
        dependencies.push({ xsappname: services.destination.xsappname });
        // Creating dependency to be injected into saas provisioning service
        logger.info(dependencies);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(dependencies));
      } catch (err) {
        logger.error(err);
        res.status(500).send(err);
      }
    });

  return saasRoute;
};

module.exports = dependencyRoute;
