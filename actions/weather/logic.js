const util = require("../../utils/util");
const promiser = (require('util')).promisify;
const wunderground = require('wunderground')('89a4b93cce43dc43', 'DL');

// http://api.wunderground.com/api/89a4b93cce43dc43/conditions/q/48.820000,8.930000.json
const query = {/*lat: 48.820000, lng: 8.930000*/ pws: 'IRUTESHE14'};

const round_average = false;

module.exports = async () => {
    return new Promise(async resolve => {
        const conditions = (await (promiser(wunderground.conditions))(query)).current_observation;

        if(round_average){
            let forecast = (await (promiser(wunderground.forecast10day))(query)).forecast.simpleforecast.forecastday[1];
            finish(
                util.av(forecast.high.celsius, conditions.temp_c),
                util.av(forecast.low.celsius, conditions.feelslike_c),
                util.av(forecast.avewind.kph, conditions.wind_kph),
                util.av(forecast.avehumidity, conditions.relative_humidity),
                conditions.weather,
                conditions.pressure_mb,
                util.av(forecast.qpf_allday.mm, conditions.precip_today_metric),
                resolve
            );
        } else{
            finish(
                conditions.temp_c,
                conditions.feelslike_c,
                conditions.wind_kph,
                conditions.relative_humidity,
                conditions.weather,
                conditions.pressure_mb,
                conditions.precip_today_metric,
                resolve
            );
        }


    });
};

function finish(_temp, _feelslike, _wind, _humidity, _weather, _pressure, _downfall, resolve){
    resolve({
        temp: _temp,
        feelslike: _feelslike,
        wind: _wind,
        humidity: _humidity,
        weather: _weather,
        pressure: _pressure,
        downfall: _downfall
    });
}