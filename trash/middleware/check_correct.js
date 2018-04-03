let topic_array = ['telegram', 'dust', 'weather', 'tplink', 'spotify', 'lightify', 'lightify-local', 'ifttt', 'doorbell', 'camera', 'calendar'];

function check(topic_string) {
    if(!topic_array.indexOf(topic_string)){
        return false;
    }
    return true;
}

module.exports = check;

