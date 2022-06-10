/* eslint-disable max-len */
const axios = require('axios');

/**
 * 
 * @param {object} dbCredentials database credentials 
 * @param {string} tenantId 
 * @param {object} logger 
 * @returns {object} dbHandler
 */
const dbHandler = async (dbCredentials, tenantId, logger) => {
  try {
    Object.assign(dbCredentials, { id: tenantId });
    const options = {
      method: 'POST',
      data: dbCredentials,
      url: `${process.env.db_api_url}/v1/deploy/to/instance`,
      headers: {
        Authorization: `Basic ${Buffer.from(`${process.env.db_api_user}:${process.env.db_api_password}`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
    };
    const res = await axios(options);
    logger.info(`HDI Container created for Tenant ${tenantId}`);
    return res;
  } catch (err) {
    logger.error(err);
    return err;
  }
};

module.exports = { dbHandler };
