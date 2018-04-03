const util = require("../../utils/util");
const utel = require('util');
const wunderground = require('wunderground')('89a4b93cce43dc43', 'DL');

// http://api.wunderground.com/api/89a4b93cce43dc43/conditions/q/48.820000,8.930000.json
const query = {/*lat: 48.820000, lng: 8.930000*/ pws: 'IRUTESHE14'};

const focast = utel.promisify(wunderground.forecast10day);
const cconditions = utel.promisify(wunderground.conditions);

const round_average = false;

module.exports = async () => {
    return new Promise(async resolve => {
        const conditions = (await cconditions(query)).current_observation;

        if(round_average){
            let forecast = (await focast(query)).forecast.simpleforecast.forecastday[1];
            resolve({
                temp: util.av(forecast.high.celsius, conditions.temp_c),
                feelslike: util.av(forecast.low.celsius, conditions.feelslike_c),
                wind: util.av(forecast.avewind.kph, conditions.wind_kph),
                humidity: util.av(forecast.avehumidity, conditions.relative_humidity),
                weather: conditions.weather,
                pressure: conditions.pressure_mb,
                downfall: util.av(forecast.qpf_allday.mm, conditions.precip_today_metric)
            });
        } else{
            resolve({
                temp: conditions.temp_c,
                feelslike: conditions.feelslike_c,
                wind: conditions.wind_kph,
                humidity: conditions.relative_humidity,
                weather: conditions.weather,
                pressure: conditions.pressure_mb,
                downfall: conditions.precip_today_metric
            });
        }


    });
};
