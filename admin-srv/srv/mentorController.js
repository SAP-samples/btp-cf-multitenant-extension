/* eslint-disable quotes */
const hanaClient = require('../utility/service-manager');
const executeQuery = require('../utility/sql');
const { v4: uuidv4 } = require('uuid');
const createMentor = async (req, logger) => {
  try {
    const tenantId = req.authInfo.getZoneId();
    const client = await hanaClient(tenantId, logger);
    console.log(req.body);
    const body = req.body;
    const query = `INSERT INTO "EF.mentor" values('${uuidv4()}', '${body.name}','${body.email}',${parseInt(body.phone)},${parseInt(body.experiance)})`;
    const data = await executeQuery(query, client);
    return data;
  } catch (e) {
    logger.error(e);
    throw e;
  }
};
const getMentor = async (req, logger) => {
  try {
    const tenantId = req.authInfo.getZoneId();
    const client = await hanaClient(tenantId, logger);
    const query = `SELECT * FROM "EF.mentor"`;
    const data = await executeQuery(query, client);
    return data;
  } catch (e) {
    logger.error(e);
    throw e;
  }
};

module.exports = {
  createMentor,
  getMentor
};
