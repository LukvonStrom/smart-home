module.exports = async (req, res) => {
    res.json({status: process.env.song});
};