const AlertEmitter = require('events').EventEmitter;

let emitter = new AlertEmitter();
const setup = require('./botsetup');
const bot = setup.b;
const store = setup.s;

let shutdown_gif = ['rftarkt7Ki2Gs', '3rgXBS3LvMFPEaumrK', 'xT8qBvH1pAhtfSx52U', 'zM0Pxyso8qd4A', "PuA5fNsawXc1G", "uV844j4QUGDC0", "cyMFOr96n1AJy"];
let boot_gif = ["HaPQIylwA3UvS", "WZj3l2HIRubde", '7sVAgQVGEm58I', 'DldE66bBW3qwM', 'ZWbeEcbeo0cKI', 'xUySTwI1AoIbf57QKk', '3oriOgivJPodK8Qg9O', '26h0poAzDM5h8gHWE', 'l0ErV7rlVdFEzE4lG'];
let interwebs_gif = ['9J7tdYltWyXIY','IwTWTsUzmIicM','3otOKlQbXcD80ayJ9e','Rb6unv0ddpPCo','oirLISmToyoeI','m12EDnP8xGLy8','7AuafiRoyMK1G','8EmeieJAGjvUI','tfXmOrWy8NQqI','PD9hjqdeidgqY','Xumi4QKYocrLi'];

emitter.on('alert', msg => {
    let values = store.value();
    values.forEach((chat_id) => {
        if (msg.verbose && chat_id.verbose) {
            setTimeout(() => bot.telegram.sendMessage(chat_id.id, `<b>Alert Verbose: </b> <pre>${msg.msg}</pre>`, {parse_mode: 'HTML'}), 100);
            return true;
        }

        if (msg.verbose && !chat_id.verbose) return;

        setTimeout(() => bot.telegram.sendMessage(chat_id.id, `<b>Alert: </b><pre>${msg.msg}</pre>`, {parse_mode: 'HTML'}), 20);
    })
});

emitter.on('shutdown', () => shuffle_fun_gif(shutdown_gif, 'ShutDown'));
emitter.on('boot', () => shuffle_fun_gif(boot_gif, 'Booting'));
emitter.on('interwebs', () => shuffle_fun_gif(interwebs_gif, 'Internet Link Up Again'));


function shuffle_fun_gif(array, msg){
    store.value().forEach((chat_id) => setTimeout(() => bot.telegram.sendDocument(chat_id.id, `https://media.giphy.com/media/${array[Math.floor(Math.random() * array.length)]}/giphy.gif`, {caption: msg}), 20));
}

module.exports = {
    emi: (msg) => emitter.emit('alert', msg),
    s: () => emitter.emit('shutdown'),
    b: () => emitter.emit('boot'),
    i: () => emitter.emit('interwebs')
};