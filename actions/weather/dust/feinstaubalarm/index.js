const sharedLogic = require('../../../../utils/sharedLogic');

module.exports = (req, res) => sharedLogic(res, require('./logic'),'status');