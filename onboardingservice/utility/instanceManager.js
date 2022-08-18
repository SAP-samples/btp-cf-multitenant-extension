/* eslint-disable max-len */
const createInstanceManager = require('@sap/instance-manager').create;
const xsenv = require('@sap/xsenv');
if (process.env.NODE_ENV === 'test') xsenv.loadEnv();

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
  createInstanceManager(options, async (err, instanceManager) => {
    if (err) {
      logger.error(err);
      reject(err);
    }
    instanceManager.create(tenantId, {}, async (err2, instance) => {
      if (err2) {
        logger.error('Create error:', err2.message);
      //  instanceManager.delete(tenantId, (err3, deletedInstance) => {
      //     if (err3) {
      //       logger.error('Create error:', err3.message);
      //       throw err;
      //     }
      //     logger.info(deletedInstance);
      //     reject(deletedInstance);
      //   });
      reject(err2)
     }
     if(!err2) {
      resolve(instance);
     }  
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
       // throw err2;
        reject(err2);
      }
      if(!err2) {
        logger.info('Instance Deleted');
        resolve('Instance Deleted');
      }
    
    });
  });
});
module.exports = { createHDI, deleteHDI };
