const obj = Object.freeze({
    UWEATHER: "update_weather",
    UDUST: "update_dust",
    TPLUG: "toggle_plug",
    UFSALARM: "update_feinstaub_alarm",
    USPOTIFY: "update_spotify",
    USUBSTITUTE: "update_substitute",
    // UCALENDAR: "update_calendar"
});

global.ifttt = obj;
module.exports = obj;
