import winston, { transports } from "winston";
import config from "./config.js"

// Custom logger Options
const customLevelsOptions = {
    levels: {
        debug: 0,
        http: 1,
        info: 2,
        warning: 3,
        error: 4,
        fatal: 5
    },
    colors: {
        fatal: 'red',
        error: 'yellow',
        warning: 'magenta',
        info: 'green',
        debug: 'cyan'
    }
}

winston.addColors(customLevelsOptions.colors)

//Logger de desarrollo
const devLogger = winston.createLogger({
    //Configuramos los levels 
    levels: customLevelsOptions.levels,
    transports: [
        new winston.transports.Console({
            level: "debug",
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelsOptions.colors }), 
                winston.format.simple()
            )
        })
    ]
})

//Logger de producción
const prodLogger = winston.createLogger({
    //Configuramos los levels 
    levels: customLevelsOptions.levels,
    // Declaramos transport
    transports: [
        new winston.transports.File({ filename: './errors.log', level: "info" })
    ]
})


export const addLogger = (request, response, next) => {
    if (config.environment === 'production') {
        request.logger = prodLogger;
        //Creamos los loggers de modo producción
        request.logger.info(`${request.method} en ${request.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
        request.logger.warning(`${request.method} en ${request.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
        request.logger.error(`${request.method} en ${request.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
        request.logger.fatal(`${request.method} en ${request.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
    } else {
        request.logger = devLogger;
        //Creamos los loggers de modo desarrollo
        request.logger.debug(`${request.method} en ${request.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
        request.logger.http(`${request.method} en ${request.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
        request.logger.info(`${request.method} en ${request.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
        request.logger.warning(`${request.method} en ${request.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
        request.logger.error(`${request.method} en ${request.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
        request.logger.fatal(`${request.method} en ${request.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
    }

    next()
}