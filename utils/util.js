function localize_boolean(value) {
    if (value) return 'ja';
    return 'nein';

}

function invert_boolean(boolean) {
    return !boolean;
}

function rename_device(devicename) {
    let mapping = {
        'A60TW 01': 'Tischlampe',
        'A60TW 02': 'Ganglampe',
        'SurfaceTW 01': 'Deckenlampe'
    };

    return devicename.replace(devicename, mapping[devicename]);
}

function num_to_bool(bool) {
    if (bool) {
        return 1;
    }
    return 0;
}

function bool_to_num(num) {
    return num === 0;
}

function median(values) {
    values.sort(function (a, b) {
        return a - b;
    });
    let half = Math.floor(values.length / 2);
    if (values.length % 2) {
        return values[half];
    } else {
        return (values[half - 1] + values[half]) / 2.0;
    }
}

function average(val1, val2) {
    return ((parseInt(val1) + parseInt(val2)) / 2);
}

function stringcombiner(){
    let i;
    let sum = "";/*
    for (i = 0; i < arguments.length; i++) {
        sum.append(arguments[i]);
    }*/
    for(let argument of arguments){
        sum += argument;
    }
    return sum;
}

module.exports = {
    av: average,
    b: localize_boolean,
    bn: bool_to_num,
    ib: invert_boolean,
    m: median,
    n: num_to_bool,
    r: rename_device,
    sc: stringcombiner
};