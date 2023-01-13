const express = require('express');

const { createMentor, getMentor } = require('../srv/mentorController');

const mentorRouter = () => {
  const router = express.Router();
  router.route('/mentor').post(async (req, res) => {
    const logger = req.loggingContext.getLogger('/Application/Network');
    createMentor(req, logger).then((result) => {
      res.status(201).send('Mentor Created');
    }).catch((err) => {
      logger.error(err);
      res.status(500).send(err.message);
    });
  });
  router.route('/mentor').get(async (req, res) => {
    const logger = req.loggingContext.getLogger('/Application/Network');
    getMentor(req, logger).then((result) => {
      res.status(200).send(result);
    }).catch((err) => {
      logger.error(err);
      res.status(500).send(err.message);
    });
  });
  return router;
};

module.exports = mentorRouter;
