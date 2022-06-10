/* eslint-disable max-len */
const express = require('express');
const cfenv = require('cfenv');

const appEnv = cfenv.getAppEnv();

const xsenv = require('@sap/xsenv');

const services = xsenv.getServices({
  uaa: { tag: 'xsuaa' },
  registry: { tag: 'SaaS' },
  sm: { name: 'es-sm' },
  hana: { name: 'easyfranchise-tenant-hdiconatiner' },
});

// const cfRouteHandler = require('../srv/cfRouteHandler');
const { handleHDICreation, handleHDIDeletion } = require('../srv/hdiController');
const { dbHandler } = require('../utility/dbHandler');

const saasRoute = () => {
  // eslint-disable-next-line new-cap
  const Router = express.Router();
  Router.route('/callback/v1.0/tenants/*')
    .put((req, res) => {
      const logger = req.loggingContext.getLogger('/Application');
      logger.info('>>>>>>>>>>>>>>>>>>>', appEnv.app.application_uris);
      const tenantHost = `${req.body.subscribedSubdomain}-${appEnv.app.space_name.toLowerCase().replace(/_/g, '-')}-` + 'approuter';
      logger.info('>>>>>>>>>>>>>>>>>>>', tenantHost);
      const tenantUrl = `https://${tenantHost}${/\.(.*)/gm.exec(appEnv.app.application_uris[0])[0]}`;
      logger.info(`-->>>>> ${tenantUrl}`);
      // TODO: Add logic to create Tenant DB
      // logic to Create Route
      // cfRouteHandler.createRoute(tenantHost, services.registry.appName)
      //   .then(
      //     (result) => {
      //       logger.info(result);
      //       res.status(200).send(tenantUrl);
      //     },
      //     (err) => {
      //       logger.log(err.stack);
      //       res.status(500).send(err.message);
      //     },
      //   );
      handleHDICreation(req.body.subscribedTenantId, logger).then((data) => {
        logger.info('HDI CONTAINER CREATED');
        dbHandler(data, req.body.subscribedTenantId, logger).then((dbData) => {
          logger.info(` ----------------------- DB CREATED: ${req.body.subscribedSubdomain}  -----------------------`);
          const conn = req.db;
          conn.exec(`SET SCHEMA ${services.hana.schema}`, (err, result) => {
            if (err) {
              logger.error('Error in Setting Default Scehema', err);
              res.status(500).send('Error Storing Teant METADATA', err);
            }
            logger.info(result);
            conn.exec(`INSERT INTO "EF.tenant" (TENANTID, SUBACCOUNTID) VALUES('${req.body.subscribedTenantId}',
            '${req.body.subscribedSubdomain}')`, (dberror, dbresult) => {
              if (dberror) {
                logger.error('Error in Inserting Tenant', dberror);
                res.status(500).send('Error Storing Tennat METADATA', dberror);
              }
              logger.info(' ----------------------- Tenant Metadata stored -----------------------');
              res.status(200).send(tenantUrl);
            });
          });
        }).catch((err) => {
          logger.error(err);
          res.status(500).send(err.message);
        });
      }).catch((err) => {
        logger.error(err);
        res.status(500).send(err.message);
      });
    }).delete((req, res) => {
      try {
        const logger = req.loggingContext.getLogger('/Application');
        const tenantHost = `${req.body.subscribedSubdomain}-${appEnv.app.space_name.toLowerCase().replace(/_/g, '-')}-approuter`;
        const tenantUrl = `https://${tenantHost}${/\.(.*)/gm.exec(appEnv.app.application_uris[0])[0]}`;
        logger.info('-->> Unsubscribe', req.body.subscribedSubdomain, req.body.subscribedTenantId, tenantHost);
        handleHDIDeletion(req.body.subscribedTenantId, logger).then((data) => {
          const conn = req.db;
          conn.exec(`SET SCHEMA ${services.hana.schema}`, (err, result) => {
            if (err) {
              logger.error('Error in Setting Default Scehema', err);
              res.status(500).send('Error in fetching Teant METADATA', err);
            }
            logger.info(result);
            conn.exec(`DELETE FROM "EF.tenant" WHERE TENANTID='${req.body.subscribedTenantId}'`, (dberror, dbresult) => {
              if (dberror) {
                logger.error('Error in Inserting Tenant', dberror);
                res.status(500).send('Error Deleting Tennat METADATA', dberror);
              }
              logger.info(' ----------------------- Tenant Metadata Deleted -----------------------');
              res.status(200).send('Success');
            });
          });
        }).catch((error) => {
          logger.error(error);
          res.status(500).send(error);
        });
      } catch (error) {
        res.status(500).send('Unsubscribe call failed', error);
      }
    });

  return Router;
};

module.exports = saasRoute;
