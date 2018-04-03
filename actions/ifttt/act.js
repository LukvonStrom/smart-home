const request = require('request-promise-native');

module.exports = async (trigger_name, formData) => {
    if(!(trigger_name in ifttt)) return;
    let options = {method: 'POST', headers: {'Content-Type': 'application/json' }};
    options.push({url: `https://maker.ifttt.com/trigger/${ifttt[trigger_name]}/with/key/${process.env.IFTTT_KEY}`});
    if(formData !== null) options.push({formData: {"value1" : formData[0], "value2" : formData[1], "value3" : formData[2]}});

    await request(options);
};
