const securityToken = require('./modules/lightify-login');
const devices = require('./modules/lightify-get-devices');
const logout = require('./modules/lightify-logout');
const power = require('./modules/lightify-change-power');

const utils = require('../../utils/util');
const alertEmitter = require("../telegram/alertEmitter");



module.exports = async () => {
    return new Promise(async resolve => {
        let secToken = await securityToken();

        let device_array = await devices(secToken);

        let devices_counter = 0;

        let arr = [];

        device_array.forEach((light) => {
            let status = utils.bn(light.on);
            arr.push({id: light.deviceId, power: status});
            power(secToken, light.deviceId, status);
            alertEmitter.emi({
                msg: utils.sc(utils.r(light.name), ' angeschaltet: ', utils.b(light.on !== 1)),
                verbose: false
            });
            devices_counter++;
        });

        setTimeout(async () => {
            let logout_success = await logout(secToken);
            console.log('ausgeloggt:', utils.b(logout_success))
            resolve(arr);
        }, 1324 * devices_counter)
    });
};
