/* eslint-disable quotes */
const { v4: uuidv4 } = require('uuid');
const executeQuery = require('../utility/sql');
const hanaClient = require('../utility/service-manager');

const uploadImage = async (req, logger) => {
  try {
    const tenantId = req.authInfo.getZoneId();
    const client = await hanaClient(tenantId, logger);
    logger.info(req?.file?.buffer);
    const buff = req.file.buffer;
    const id = uuidv4();
    let statement = client.prepare(`INSERT INTO "EF.configuration" (ID, FILE_CONTENT) values (?, ?)`);
    return new Promise((resolve, reject) => {
      client.exec(`SELECT COUNT(*) AS COUNT FROM "EF.configuration"`, (error2, rs1) => {
        if (error2) {
          logger.error(error2);
          reject(error2);
        }
        console.log(rs1);
        if (rs1[0].COUNT === 0) {
          statement.exec([id.toString(), buff], (err1, rs) => {
            if (err1) {
              logger.error(err1);
              reject(err1);
              return;
            }
            logger.info(rs);
            resolve(rs);
          });
        } else {
          statement = client.prepare(`UPDATE "EF.configuration" SET FILE_CONTENT=? where ID=(SELECT TOP 1 ID FROM "EF.configuration")`);
          statement.exec([buff], (err1, rs) => {
            if (err1) {
              logger.error(err1);
              reject(err1);
              return;
            }
            logger.info(rs);
            resolve(rs);
          });
        }
      });
    });
  } catch (e) {
    logger.error(e);
    throw e;
  }
};
const updateImage = async (req, logger) => {
  try {
    const tenantId = req.authInfo.getZoneId();
    const client = await hanaClient(tenantId, logger);
    const buff = req.file.buffer;
    const statement = client.prepare(`UPDATE "EF.configuration" SET FILE_CONTENT=? where ID=(SELECT TOP 1 ID FROM "EF.configuration")`);
    return new Promise((resolve, reject) => {
      statement.exec([buff], (err1, rs) => {
        if (err1) {
          logger.error(err1);
          reject(err1);
          return;
        }
        logger.info(rs);
        resolve(rs);
      });
    });
  } catch (e) {
    logger.error(e);
    throw e;
  }
};
const getImage = async (req, logger) => {
  try {
    const tenantId = req.authInfo.getZoneId();
    const client = await hanaClient(tenantId, logger);
    const query = `SELECT * FROM "EF.configuration" where ID=(SELECT TOP 1 ID FROM "EF.configuration")`;
    const data = await executeQuery(query, client);
    return data;
  } catch (e) {
    logger.error(e);
    throw e;
  }
};

module.exports = {
  uploadImage,
  updateImage,
  getImage,
};
