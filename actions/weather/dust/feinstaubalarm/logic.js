const request = require("request-promise-native");

module.exports = async () => {
    const req = await request({
        method: 'GET',
        url: 'http://istheutefeinstaubalarm.rocks/api/alarm',
        json: true
    });
    return req.feinstaubalarm;
};