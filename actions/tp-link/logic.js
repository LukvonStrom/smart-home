const util = require("../../utils/util");
const alertEmitter = require("../telegram/alertEmitter");
const {Client} = require('tplink-smarthome-api');

const client = new Client();

/*
client.startDiscovery().on('device-new', (device) => {
    device.getSysInfo().then((obj) => {
        console.log(obj.relay_state);
    });
    device.setPowerState(false);
});*/

module.exports = async () => {
    let plug = await client.getDevice({host: '192.168.178.80'});
    let sysInfo = await plug.getSysInfo();
    let state = util.ib(sysInfo.relay_state);
    await plug.setPowerState(state);
    alertEmitter.emi({msg: 'Toggled the Plug', verbose: true});
    return state;
};
