/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
const executeQuery = require('../utility/sql.js');
const hanaClient = require('../utility/service-manager.js');
const upadteBusinessPartner = require('./updateBusinessPartner');
const MAX_RETRY = 3;
const getMentorList = async (tenantId, logger) => {
    const client = await hanaClient(tenantId, logger);
    const query = `SELECT * FROM "EF.mentor"`;
    const data = await executeQuery(query, client);
    return data;
};

const getFranchiseMentorAssignment = async (tenantId, logger) => {
    const client = await hanaClient(tenantId, logger);
    const query = `select EF.BUSINESSPARTNERID, EF.BUSINESSPARTNERNAME, M.NAME as MENTORNAME, M.EXPERIENCE , M.EMAIL
    from "EF.franchise" as EF LEFT JOIN "EF.mentor" as M on M.MENTORID=EF.MENTORID where M.MENTORID is not NULL`;
    const data = await executeQuery(query, client);
    return data;
};

const mentorFranchiseAsignment = async (tenantId, logger, mapping, user, time, jwt) => {
    return new Promise((resolve, reject)=>{
        updateRemoteSystem(logger, mapping, jwt).then(async (result)=> {
            logger.info('Updated Remote System:', result);
            const client = await hanaClient(tenantId, logger);
            const query = `UPDATE "EF.franchise" set MENTORID='${mapping.MENTORID}',UPDATED_BY='${user}',UPDATED_ON='${time}' where BUSINESSPARTNERID='${mapping.BPID}'`;
            const data = await executeQuery(query, client);
            resolve(data);
        }).catch((error)=>{
            logger.error(`Failed to write to remote system, Aborting Operation`, error);
            reject(error);
        });
    });
};

const updateRemoteSystem = (logger, mapping, jwt) =>{
    return new Promise(async (resolve, reject)=>{
        try {
            const s4Update = await upadteBusinessPartner(jwt, mapping.BPID, mapping.MENTORNAME, logger);
            logger.info(`Updated Remote System`, s4Update);
            resolve(s4Update);
        } catch (error) {
            logger.error(`Failed to update remote system in Attempt ${MAX_RETRY}`, error);
            reject(error);
        }
    });
};

module.exports = {
    getMentorList,
    getFranchiseMentorAssignment,
    mentorFranchiseAsignment,
};
