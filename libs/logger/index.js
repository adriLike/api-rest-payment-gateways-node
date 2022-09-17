/** ****************************************
    Module: logger
    Description: Provide to a custom logger to the application
******************************************* */

const loggerFactory = require('./logger-factory');

let instance = null;

/**
 * Singleton class that wraps the logger-factory to make it easy to use.
 * Just require this file and call it.
 * It automatically prints line number, file name and method.
 */
class Logger {
    constructor() {
        if (!instance) {
            this.mainLogger = loggerFactory.getMainLogger();
            instance = this;
        }

        return instance;
    }

    setupLogger(appConfig, loggerName) {
        this.mainLogger = loggerFactory.createMainLoggerFromConfig(
            appConfig,
            loggerName,
        );
    }

    trace(message) { this.writeToLogger(message, 'trace'); }

    debug(message) { this.writeToLogger(message, 'debug'); }

    info(message) { this.writeToLogger(message, 'info'); }

    warn(message) { this.writeToLogger(message, 'warn'); }

    error(message) { this.writeToLogger(message, 'error'); }

    fatal(message) { this.writeToLogger(message, 'fatal'); }

    writeToLogger(message, level) {
        this.mainLogger[level](message);
    }
}

module.exports = new Logger();
