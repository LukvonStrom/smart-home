module.exports = () => {
    process.stdin.resume();
    function exitHandler() {
        alerter.s();
        setTimeout(() => {
            process.exit();
        }, 1000)

    }

    process.on('exit', exitHandler.bind(null, {}));
    process.on('SIGINT', exitHandler.bind(null, {}));
    process.on('uncaughtException', exitHandler.bind(null, {}));
};