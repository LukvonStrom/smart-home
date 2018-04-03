const Telegraf = require('telegraf');
const bot = new Telegraf('534257328:AAF9xLbCC0fBqjy33Q52JA2g5MdBL3wKouo');
const low = require('lowdb');
const FileStore = require('lowdb/adapters/FileSync');
const db = low(new FileStore('db.json'));
db.defaults({users: []}).write();
const store = db.get('users');

bot.command('start', ctx => {
    return test(false, ctx);
});

bot.command('start_verbose', ctx => {
    return test(true, ctx)
});

function test(v, ctx) {
    console.log('verbose:', v, ctx.chat.id);
    let record = store.find({id: ctx.chat.id});
    (record.value() != null) ? record.assign({verbose: v}).write() : store.push({id: ctx.chat.id, verbose: v}).write();
    return ctx.reply(`Für ${v ? 'ausfühliche' : ''} Updates registriert.`);
}


bot.command('stop', ctx => {
    console.log('logged out', ctx.chat.id);
    store.remove({id: ctx.chat.id}).write();
});

bot.startPolling();

module.exports = {b: bot, s: store};