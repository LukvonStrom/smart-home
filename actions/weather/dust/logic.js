const request = require("request-promise-native");
const utils = require('../../../utils/util');
let urls = ['http://api.luftdaten.info/v1/sensor/2598/', 'http://api.luftdaten.info/v1/sensor/2003/', 'http://api.luftdaten.info/v1/sensor/185/'];
let o = {p1: [], p2: []};


module.exports = async () => {

    await Promise.all(
        urls.map(async (url) => {
                let data = await request({
                        method: 'GET',
                        uri: url,
                        headers:
                            {'Content-Type': 'application/json'},
                        json: true
                });
                [0, 1].map(x => {
                    [1, 2].map(n => o[`p${n}`].push(data[x].sensordatavalues[n].value))
                })

            }));
    return {p1: utils.m(o.p1), p2: utils.m(o.p2)};
};