/* eslint-disable max-len */
const createInstanceManager = require('@sap/instance-manager').create;
const xsenv = require('@sap/xsenv');

const services = xsenv.getServices({
  sm: { name: 'es-sm' },
});

// const credentials = require('./temp.json');

let options = services.sm;
options = Object.assign(options, { service: 'hana', plan: 'hdi-shared' });
/**
 *  Creates HDI container Instance
 * @param {string} tenantId
 * @return {object}
 */
const createHDI = (tenantId, logger) => new Promise((resolve, reject) => {
  createInstanceManager(options, (err, instanceManager) => {
    if (err) {
      logger.error(err);
      reject(err);
    }
    instanceManager.create(tenantId, {}, (err2, instance) => {
      if (err2) {
        logger.error('Create error:', err2.message);
        instanceManager.delete(tenantId, (err3, deletedInstance) => {
          if (err3) {
            logger.error('Create error:', err3.message);
            throw err;
          }
          logger.info(deletedInstance);
          reject(deletedInstance);
        });
      }
      logger.info(instance);
      resolve(instance);
    });
  });
});
const deleteHDI = (tenantId, logger) => new Promise((resolve, reject) => {
  createInstanceManager(options, (err, instanceManager) => {
    if (err) {
      logger.error(err);
      reject(err);
    }
    instanceManager.delete(tenantId, (err2, instance) => {
      if (err2) {
        logger.error('Create error:', err2.message);
        throw err2;
      }
      logger.info(instance);
      resolve(instance);
    });
  });
});
module.exports = { createHDI, deleteHDI };
