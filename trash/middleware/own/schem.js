let check = require('../check_correct');

function schematic (data, next) {
    if(!check('telegram')) return next();

}

module.exports = schematic;