/* eslint-disable max-len */
const express = require('express');
const {getNewBusinessPartners} = require('../service/loadLocalBP');

const newBusinessPartners = () => {
    // eslint-disable-next-line new-cap
    const router = express.Router();
    router.route('/new/notifications').get( async (req, res) => {
        const logger = req.loggingContext.getLogger('/Application/Network');
        const local = await getNewBusinessPartners(req.authInfo.getZoneId(), logger);
        res.send(local);
    });
    return router;
};

module.exports = newBusinessPartners;
