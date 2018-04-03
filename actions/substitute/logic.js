const Client = require('dsbclient');
const client = new Client(157962, 'Rutesheim2016');
const request = require("request-promise-native");
const cheerio = require('cheerio');

module.exports = class_id => {
    return new Promise(resolvef => {
        client.fetch().then((data) => {
            let date = new Date().getDay();
            let num = 0;
            if (date === 0 || date === 5 || date === 6) num = 1;

            return data.timetables[num].src;
        }).then(dot => {
            return request({method: 'GET', url: dot})
        }).then(req => {
            return new Promise(resolve => {
                resolve(cheerio.load(req));
            });
        }).then($ => {
            let result_buffer = [];
            return new Promise(resolve => {
                $("td").removeAttr("style");

                $("table:not(.info):not(.mon_head) tr:not(:has(>th))").each(function(index) {
                    let element = $(this).html().replace(new RegExp('<td class="list" align="center">', 'g'), '').split('</td>');
                    if(element[0].includes(class_id)){result_buffer.push({'Ausfall': replacews(element, 1) + ". Stunde", 'Lehrer': replacews(element, 2).replace('<td class="list">', ''),  'Fachalt': replacews(element, 3), 'Fach': replacews(element, 4), 'Raum': replacews(element, 5)});}
                });
                resolve(result_buffer);
            });
        }).then(dat => {
            resolvef(dat);
        });
    });
};

function replacews(element, number){
    return element[number].replace(/&#xA0;/g, "-");
}