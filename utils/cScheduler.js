const isOnline = require('is-online');

const request = require("request-promise-native");
const alertEmitter = require("../actions/telegram/alertEmitter");


let timers = [];
let isoff;


    function handle(e){
        if(isoff) return;
        if (e.code === "ECONNREFUSED" || e.code === "ENOTFOUND" || e.code === "ENOENT" || e.code === "ECONNRESET" || e.code === "ETIMEDOUT") {
            console.log('Lost Connection...');
            isoff = true;
            timers.forEach((timer) => {
                clearInterval(timer.stack);
            });

            checker();

        }
    }

    function checker(){
        let ownp = setInterval(() => {
            if (isoff) {
                isOnline({timeout: 250}).then(online => {
                    alertEmitter.i();
                    process.exit();
                }).catch(() => {
                })
            }
        }, 500);
    }

    function catcher(fn){
        if (fn.constructor.name === 'AsyncFunction') {
            async function c() {
                try {
                    await fn();
                } catch (e) {
                    handle(e.error);
                }
            }

            c();
            return;
        }
        try {
            fn();
        } catch (e) {
            handle(e.error);
        }

    }

    function add(fn, t){
        timers.push({stack: setInterval(() => catcher(fn), t*1000), f: fn, int: t*1000});
    }


add(async () => {

    let options = {
        method: 'GET',
        url: 'https://jsonplaceholder.typicode.com/posts/1'
    };
    console.log('r');
    await request(options)
}, 5);


//module.exports = cScheduler;
