/* eslint-disable max-len */

const {businessPartnerService} = require('@sap/cloud-sdk-op-vdm-business-partner-service');
const {businessPartnerApi} = businessPartnerService();

/**
 * Get Business Partner
 * @param {string} token JWT TOKEN with tenant ID to isolate tenant specific Destinations
 * @param {string} busienssPartnerId
 * @param {string} MENTORNAME
 * @param {object} logger
 * @return {Promise<any>}
 */
const upadteBusinessPartner = async (token, busienssPartnerId, MENTORNAME, logger) => {
    logger.info('upadteBusinessPartner', busienssPartnerId, MENTORNAME);
    const bp = businessPartnerApi.entityBuilder().businessPartner(busienssPartnerId).searchTerm1(`Mentor:${MENTORNAME}`).build();
    const resultPromise = await businessPartnerApi.requestBuilder()
        .update(bp).execute({destinationName: 'bupa', jwt: token}, {useCache: true});
    console.log(resultPromise);
    return resultPromise;
};


module.exports = upadteBusinessPartner;
