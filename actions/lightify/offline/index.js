const lightify = require('node-lightify').lightify;
let connection = new lightify(process.env.LIGHTIFY_LIP);
// const bn = require('../../../utils/util').bn;

connection.connect().then(() => {
    return connection.discover();
}).then((data) => {
    /* data.result.forEach((device) => {
         let flip = true;
         console.log(device.status);
         connection.nodeOnOff(device.mac, true, false);
         /*setTimeout(() => {
             connection.nodeOnOff(device.mac, (flip !== false), false);
         }, 1000);
     });*/
    let flip = true;
    //connection.nodeOnOff(data.result[1].mac, (flip !== false), true);

    connection.nodeOnOff(data.result[0].mac, false, true);

    //sendToggle(true, data.result, connection);

    connection.dispose();
}).catch((e) => {
    console.log(e);
});

function sendToggle(state, devices, connection) {
    devices.forEach((device, index) => {
        setTimeout(function () {
            connection.nodeOnOff(device.mac, state, false);
        }, 5000 * index);

    })
}