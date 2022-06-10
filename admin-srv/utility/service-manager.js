/* eslint-disable max-len */
const createInstanceManager = require('@sap/instance-manager');
const xsenv = require('@sap/xsenv');
const hanaClient = require('@sap/hana-client');

const smCredentials = xsenv.getServices({
  sm: { name: 'es-sm' },
});

let options = smCredentials.sm;
options = Object.assign(options, { service: 'hana', plan: 'hdi-shared' });

/**
 * Returns HDI connection Object
 * @param {string} tenantId  - tenant id
 * @param {object} logger    - logger object
 * @returns {Object} - HDI connection Object
 */

const getHDICredentials = async (tenantId, logger) => {
  console.log(tenantId);
  return new Promise((resolve, reject) => {
    console.time('connectionpool');
    try {
      createInstanceManager.create(options, (err, instanceManager) => {
        if (err) {
          logger.error('Error in getting Connection Manager', err);
          reject(err);
        } else {
          instanceManager.get(tenantId, (err1, credentials) => {
            try {
              if (err1) {
                logger.error('Error in getting Connection Credentials', err1);
                reject(err1);
              } else if (credentials) {
                console.timeEnd('connectionpool');
                const conn = hanaClient.createConnection();
                conn.connect(credentials.credentials, (err2) => {
                  if (err2) {
                    logger.error('Error in connecting to HDI container', err2);
                    reject(err2);
                  } else {
                    logger.info(`HDI connection established for tenant ${tenantId}`);
                    console.timeEnd('connectionpool');
                    conn.exec(`SET SCHEMA ${credentials.credentials.schema}`, (err3, result) => {
                      if (err3) {
                        logger.error('Error in setting schema', err3);
                        reject(err3);
                      } else {
                        resolve(conn);
                      }
                    });
                  }
                });
              } else {
                reject(new Error(`No credentials found for tenant:: ${tenantId}`));
              }
            } catch (e) {
              reject(e);
            }
          });
        }
      });
    } catch (error) {
      logger.error('Error in getting Connection Manager', error);
      reject(error);
    }
  });
};

module.exports = getHDICredentials;
