const init = require('./logic');

module.exports = async (req, res) => {
    let result = await Promise.all([init("J2"), init("9c")]);
    res.json({status: result});
};