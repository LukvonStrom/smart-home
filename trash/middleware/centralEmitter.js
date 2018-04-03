const EventEmitter = require('events');
const Middleware = require('./Middleware');
const middleware = new Middleware();

class CentralEmitter extends EventEmitter {}

const centralEmitter = new CentralEmitter();

centralEmitter.on('hook', (topic, payload) => {
    middleware.run({topic: topic, payload: payload});
});


middleware.use(function(data, next) {
    data.payload.msg += ' World';
    next();
});

middleware.use(function(data, next) {
    data.payload.msg += ' !!!';
    console.log(data.payload.msg);
    next();
});

centralEmitter.emit('hook', 'telegram', {msg: 'i bims'});
