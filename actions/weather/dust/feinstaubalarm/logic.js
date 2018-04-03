const request = require("request-promise-native");
const cheerio = require('cheerio');

module.exports = async () => {
    const req = await request({
        method: 'GET',
        url: 'https://www.stuttgart.de/feinstaubalarm/widget/xtrasmall',
        json: true
        });
    let $ = cheerio.load(req);
    return $("body > div").hasClass("alarm-on");
};