/* eslint-disable max-len */
const {insertNewBP} = require('../service/loadLocalBP');

/**
 * Compare and insert bp into DB
 * @param {array} localBP local copy of Business Partners
 * @param {array} remoteBP Remote Copy of business Partners
 * @param {object} logger logging object
 * @param {string} user object
 * @param {string} tenant tenant id
 * @return {object} status object
 */
const checkAndInsertNewBP = (localBP, remoteBP, logger, user, tenant) => {
    return new Promise((resolve, reject) => {
        const businessPartnerMap = new Map();
        // creates a map of exhisting business partners
        localBP.forEach((e)=>{
            businessPartnerMap.set(e.BUSINESSPARTNERID, e.BUSINESSPARTNERNAME);
        });
        // compares the local stored and remote business partners
        const newBP = [];
        const timestamp = new Date().toISOString().split('T')[0] + ' ' + new Date().toISOString().split('T')[1].split('Z')[0];
        remoteBP.forEach((e)=>{
            if (!businessPartnerMap.has(e.businessPartner)) {
                newBP.push([e.businessPartner, e.firstName, user, timestamp]);
            }
        });
        logger.info('New BP', newBP);
        // inserts new business partners into DB
        if (newBP.length > 0) {
            insertNewBP(newBP, tenant, logger).then((result)=>{
                resolve(result);
            }).catch((error)=>{
                reject(error);
            });
        } else {
            resolve(0);
        }
    });
};

module.exports = {
    checkAndInsertNewBP,
};
