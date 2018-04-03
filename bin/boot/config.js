const fs = require('fs');
const dotenv = require('dotenv');
const linter = require('../../utils/envLinter');

module.exports = () => {
    if (!fs.existsSync('./.env') && fs.existsSync('./.env.example')) {
        console.warn('You forgot renaming the file .env.example to .env. Exiting now.');
        process.exit(1);
    }

    if (process.env.CI) {
        dotenv.config({
            path: './.env.test'
        });
    } else {
        dotenv.config({
            path: './.env'
        });
        linter();
    }
};
