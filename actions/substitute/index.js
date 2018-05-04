const init = require('./logic');
const sharedLogic = require('../../utils/sharedLogic');

module.exports = (req, res) => sharedLogic(res, async () => await Promise.all([init("J2"), init("9c")]),'substitute_status');