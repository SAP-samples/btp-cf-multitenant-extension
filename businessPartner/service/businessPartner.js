/* eslint-disable max-len */

const {businessPartnerService} = require('@sap/cloud-sdk-op-vdm-business-partner-service');
const {businessPartnerApi} = businessPartnerService();

/**
 * Get Business Partner
 * @param {string} token JWT TOKEN with tenant ID to isolate tenant specific Destinations
 * @return {Promise<any>}
 */
const getBusinessPartner = async (token) => {
    // TODO: filter for identifying new business partners
    const resultPromise = await businessPartnerApi.requestBuilder().getAll().filter(businessPartnerApi.schema.SEARCH_TERM_1.equals('VERIFIED'))
        .execute({destinationName: 's4h', jwt: token}, {useCache: true});
    return resultPromise;
};


module.exports = getBusinessPartner;
