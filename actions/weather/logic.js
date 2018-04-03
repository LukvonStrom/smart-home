const util = require("../../utils/util");
const utel = require('util');
const wunderground = require('wunderground')('89a4b93cce43dc43', 'DL');

// http://api.wunderground.com/api/89a4b93cce43dc43/conditions/q/48.820000,8.930000.json
const query = {lat: 48.820000, lng: 8.930000};

const focast = utel.promisify(wunderground.forecast10day);
const cconditions = utel.promisify(wunderground.conditions);


module.exports = async () => {
    return new Promise(resolve => {
        let forcast = await focast(query);
        let forecast = forcast.forecast.simpleforecast.forecastday[1];

        const condition = await cconditions(query);
        const conditions = condition.current_observation;
        resolve({
            temp: util.av(forecast.high.celsius, conditions.temp_c),
            feelslike: util.av(forecast.low.celsius, conditions.feelslike_c),
            wind: util.av(forecast.avewind.kph, conditions.wind_kph),
            humidity: util.av(forecast.avehumidity, conditions.relative_humidity),
            weather: conditions.weather,
            pressure: conditions.pressure_mb,
            downfall: util.av(forecast.qpf_allday.mm, conditions.precip_today_metric)
        });
    });
};
