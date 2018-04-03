class Middleware {
    constructor() {
        this.middlewares = [];
    }
    use(fn) {
        this.middlewares.push(fn);
    }
    executeMiddleware(data, done) {
        this.middlewares.reduceRight((done, next) => () => next(data, done), done)(data);
    }
    run(data) {
        this.executeMiddleware(data, done => console.log(data));
    }
}
module.exports = Middleware;