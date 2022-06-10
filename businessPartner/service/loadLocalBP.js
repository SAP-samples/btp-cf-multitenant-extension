/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
const executeQuery = require('../utility/sql.js');
const hanaClient = require('../utility/service-manager.js');
const getAllLocalBusinessPartners = async (tenantId, logger) => {
    const client = await hanaClient(tenantId, logger);
    const query = `SELECT * FROM "EF.franchise"`;
    logger.info('Executing query: ', query);
    const data = await executeQuery(query, client);
    console.log(data);
    return data;
};

/**
 * Function to insert new business partners into tenant DB
 * @param {array} bp array of business partners
 * @param {string} tenantId Tenant Id
 * @param {object} logger logging object
 */
const insertNewBP = async (bp, tenantId, logger) =>{
    const client = await hanaClient(tenantId, logger);
    const stmt = client.prepare('Insert into "EF.franchise" (BUSINESSPARTNERID, BUSINESSPARTNERNAME, UPDATED_BY, UPDATED_ON) values (?,?,?,?)');
    return new Promise((resolve, reject) => {
        try {
            stmt.execBatch(bp, (err, rows)=>{
                if (err) reject(err);
                logger.info('Inserted new BP', rows);
                resolve(rows);
            });
        } catch (err) {
            reject(err);
        }
    });
};

const getNewBusinessPartners = async (tenantId, logger) => {
    const client = await hanaClient(tenantId, logger);
    const query = `SELECT * FROM "EF.franchise" where MENTORID is NULL`;
    const data = await executeQuery(query, client);
    return data;
};

module.exports = {
    getAllLocalBusinessPartners,
    insertNewBP,
    getNewBusinessPartners,
};
