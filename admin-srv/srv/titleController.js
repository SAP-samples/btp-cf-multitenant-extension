/* eslint-disable quotes */
const hanaClient = require('../utility/service-manager');
const executeQuery = require('../utility/sql');

const createTitle = async (req, logger) => {
  try {
    const tenantId = req.authInfo.getZoneId();
    const client = await hanaClient(tenantId, logger);
    console.log(req.body);
    const title = req.body.title;
    const query = `UPDATE "EF.configuration" SET TITLE='${title}' where ID=(SELECT TOP 1 ID FROM "EF.configuration")`;
    const data = await executeQuery(query, client);
    return data;
  } catch (e) {
    logger.error(e);
    throw e;
  }
};
const getTitle = async (req, logger) => {
  try {
    const tenantId = req.authInfo.getZoneId();
    const client = await hanaClient(tenantId, logger);
    const query = `SELECT TITLE FROM "EF.configuration" where ID=(SELECT TOP 1 ID FROM "EF.configuration")`;
    const data = await executeQuery(query, client);
    return data;
  } catch (e) {
    logger.error(e);
    throw e;
  }
};

module.exports = {
  createTitle,
  getTitle
};
