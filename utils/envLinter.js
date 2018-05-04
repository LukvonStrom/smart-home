const {Joi} = require('celebrate');

class EnvError extends Error {}

function checker() {
    const schema = Joi.object({
        SERVER_PORT: Joi.number()
            .min(2)
            .required(),
        ENVIRONMENT: Joi.string()
            .regex(/^(development|production)$/)
            .error(new EnvError('ENVIRONMENT is neither development nor production')),
        LIGHTIFY_PASS: Joi.string().alphanum(),
        LIGHTIFY_SNUMBER: Joi.string().alphanum(),
        LIGHTIFY_UNAME: Joi.string().email(),
        LIGHITFY_LIP: Joi.number(),
        IFTTT_KEY: Joi.string(),
        SENTRY_DSN: Joi.string()
    });

    const envcheckresult = Joi.validate(process.env, schema, {allowUnknown: true});

    if (envcheckresult.error) {
        console.log('The Configuration lying in `./.env` is malformed. See:');
        if (envcheckresult.error instanceof EnvError) {
            console.error(envcheckresult.error);
        } else {
            console.error(envcheckresult.error.details[0].message);
        }
        process.exit(1);
    }

}

module.exports = checker;