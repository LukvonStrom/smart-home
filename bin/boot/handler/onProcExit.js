module.exports = (alertEmitter) => {
    process.stdin.resume();
    function exitHandler() {
        alertEmitter.s();
        setTimeout(() => {
            process.exit();
        }, 1000)

    }

    process.on('exit', exitHandler.bind(null, {}));
    process.on('SIGINT', exitHandler.bind(null, {}));
    process.on('uncaughtException', exitHandler.bind(null, {}));
};