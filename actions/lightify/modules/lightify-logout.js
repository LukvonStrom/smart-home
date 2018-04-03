const request = require("request-promise-native");

module.exports = async (secToken) => {
    const req = await request({
        method: 'DELETE',
        url: 'https://eu.lightify-api.org/lightify/services/session',
        headers: {authorization: secToken},
        json: true
    });
    return req.returnCode === 0;
};
