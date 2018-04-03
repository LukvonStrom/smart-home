const request = require("request-promise-native");

module.exports = async () => {
    const req = await request({
        method: 'POST',
        url: 'https://eu.lightify-api.org/lightify/services/session',
        headers: {'content-type': 'application/json'},
        body: {password: process.env.LIGHTIFY_PASS,
               serialnumber: process.env.LIGHTIFY_SNUMBER,
               username: process.env.LIGHTIFY_UNAME},
        json: true
    });
    return req.securityToken;
};


