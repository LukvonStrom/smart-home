const logic = require('./logic');

module.exports = async (req, res) => {
    let result = await logic();
    res.json({dust: result});
};