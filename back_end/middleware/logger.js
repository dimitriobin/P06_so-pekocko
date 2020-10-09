const winston = require('winston');

exports.logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: {
        service: 'so-pekocko'
    },
    transports: [
        new winston.transports.File({
            filename: './activity/error.log',
            level: 'error',
            format: winston.format.json()
        }),
        new winston.transports.Http({
            level: 'warn',
            format: winston.format.json()
        }),
        new winston.transports.Console({
            level: 'info',
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            )
        })
    ],
});