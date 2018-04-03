const request = require("request-promise-native");

module.exports = async (securityToken) => {
    const devices = await request({
        method: 'GET',
        url: 'https://eu.lightify-api.org/lightify/services/devices',
        headers: {devicetype: 'LIGHT', authorization: securityToken}
    });

    return JSON.parse(devices);
};