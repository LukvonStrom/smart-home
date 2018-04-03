const request = require("request-promise-native");
const n = require('../../../utils/util').n;

function returnoptions(securityToken, id, power) {
    let options = {
        method: 'GET',
        headers: {authorization: securityToken}
    };

    if (id === 'all') {
        options.url = 'https://eu.lightify-api.org/lightify/services/device/all/set';
    } else {
        options.url = 'https://eu.lightify-api.org/lightify/services/device/set';
    }

    options.qs = {};
    options.qs.onoff = n(power);
    if (id !== 'all') options.qs.idx = id;

    return options;
}


module.exports = async (securityToken, id, power) => {
    let device_action = await request(returnoptions(securityToken, id, power));
    return device_action.returnCode;
};
