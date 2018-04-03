let alertEmitter = require('../telegram/alertEmitter');


module.exports = io => {

    io.on('connection', (socket) => {
        socket.on('songUpdate', (json) => {
            let obj = JSON.stringify(json);
            setTimeout(() => {
                if (obj['playing']) alertEmitter.emi({msg: `${obj['name']} - ${obj['artist']}`, verbose: true});
            }, 2000);
            process.env.song = obj;
        })
    });
};
