/* eslint-disable max-len */
const express = require('express');
const {getMentorList, getFranchiseMentorAssignment, mentorFranchiseAsignment} = require('../service/mentorService');

const mentors = () => {
    // eslint-disable-next-line new-cap
    const router = express.Router();
    router.route('/mentors').get( async (req, res) => {
        const logger = req.loggingContext.getLogger('/Application/Network');
        const data = await getMentorList(req.authInfo.getZoneId(), logger);
        res.send(data);
    });
    router.route('/bp/mentors').get( async (req, res) => {
        const logger = req.loggingContext.getLogger('/Application/Network');
        const local = await getFranchiseMentorAssignment(req.authInfo.getZoneId(), logger);
        res.send(local);
    });
    router.route('/bp/mentors').put(async (req, res)=>{
        const data = req.body;
        const jwt = req.authInfo?.getAppToken();
        const logger = req.loggingContext.getLogger('/Application/Network');
        const time = new Date().toISOString().split('T')[0] + ' ' + new Date().toISOString().split('T')[1].split('Z')[0];
        const user = req?.user?.id || 'TechnicalUser';
        const local = await mentorFranchiseAsignment(req.authInfo.getZoneId(), logger, data, user, time, jwt);
        console.log('local', local);
        if (local) {
            res.status(204).send('Mentor Assigned to Franchise');
        } else {
            res.status(500).send('something went wrong');
        }
    });
    return router;
};

module.exports = mentors;
