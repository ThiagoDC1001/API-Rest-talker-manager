const validateToken = require('./tokenMiddleware');
const validateName = require('./nameMiddleware');
const validateAge = require('./ageMiddleware');
const validateTalk = require('./talkMiddlewareA');
const validateWatchedAt = require('./watchedAtMiddleware');
const validateRate = require('./rateMiddleware');

module.exports = {
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
};