/* eslint-disable max-len */
const express = require('express');
const localBusinessPartner = require('../service/loadLocalBP');
const {checkAndInsertNewBP} = require('../service/insertNewBP');

// eslint-disable-next-line max-len
const businessPartnerService = require('../service/businessPartner.js');

const remoteCall = () => {
    // eslint-disable-next-line new-cap
    const router = express.Router();
    router.route('/remote/bp').get((req, res) => {
        const logger = req.loggingContext.getLogger('/Application/Network');
        logger.info('-->> Remote Call');
        const jwt = req.authInfo?.getAppToken();
        businessPartnerService(jwt).then((result) => {
            res.send(result);
        }).catch((err) => {
            logger.error('Business Partner Remote Call Failed', err);
            console.log(err);
            res.send(err);
        });
    });
    router.route('/new/bp').get( async (req, res) => {
        const logger = req.loggingContext.getLogger('/Application/Network');
        logger.info('-->> Remote Call');
        const jwt = req.authInfo?.getAppToken();
        try{
        const local = await localBusinessPartner.getAllLocalBusinessPartners(req.authInfo.getZoneId(), logger);
        const remoteBP = await businessPartnerService(jwt);
        // Comment this section after local testing.
        // const json = require('./tempBP.json');
        // const remoteBP = json;
        checkAndInsertNewBP(local, remoteBP, logger, req?.user?.id || 'TechnicalUser',
        req.authInfo.getZoneId())
            .then((result) => {
                logger.info(`${result} - Business Partners Inserted`);
                res.status(result >0 ? 201 : 200).send(`${result} - Business Partners Inserted`);
            }).catch((error)=>{
                logger.error('Business Partner insertion Call Failed', error);
                console.log(error);
                res.status(500).send(error);
            }); 
        }catch(e){
            console.log(e);
            res.status(500).send('Internal Server Error');
        }
       
    });

    return router;
};

module.exports = remoteCall;
