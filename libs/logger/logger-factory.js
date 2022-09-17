/** ****************************************
    Module: logger-factory
******************************************* */
const bunyan = require('bunyan');
const BunyanPrettystream = require('bunyan-prettystream');

// Globa vars
let mainLogger;

function createLogger(options) {
    const loggerName = options.loggerName || 'process';
    const loggerEnableSourceInfo = false;
    const consoleEnablePrettyStandardOut = options.consoleEnablePrettyStandardOut || true;
    const consoleLogLevel = options.consoleLogLevel || 'debug';
    const logFilePathAndName = options.logFilePathAndName || 'defaultLogFile.log';
    const logFileLevel = options.logFileLevel || null;
    const logFileRotatingPeriod = options.logFileRotatingPeriod || '1d';
    const logFileRotatingCount = options.logFileRotatingCount || 7;

    const lastIndexOfDotfileLog = logFilePathAndName.lastIndexOf('.');
    const extensionFileLog = logFilePathAndName.substring(
        lastIndexOfDotfileLog + 1,
        logFilePathAndName.length,
    );
    const logErrorFilePathAndName = `${logFilePathAndName.substring(0, lastIndexOfDotfileLog)}_warn-err.${extensionFileLog}`;
    const loggerStreams = [];
    let logger = null;

    // Log stream to console (optional level="none")
    if (consoleLogLevel && consoleLogLevel !== 'none') {
        let streamConsole = process.stdout;

        // PrettyStream only for development environment
        if (consoleEnablePrettyStandardOut) {
            const prettyStdout = new BunyanPrettystream();
            prettyStdout.pipe(process.stdout);
            streamConsole = prettyStdout;
        }

        loggerStreams.push({
            name: 'console',
            stream: streamConsole,
            level: consoleLogLevel,
            serializers: bunyan.stdSerializers,
        });
    }

    // Log stream to files (optional level="none")
    if (logFileLevel && logFileLevel !== 'none') {
        loggerStreams.push({
            type: 'rotating-file',
            name: 'rotating_file_stream',
            path: logFilePathAndName,
            level: logFileLevel,
            period: logFileRotatingPeriod,
            count: logFileRotatingCount,
        });
        loggerStreams.push({
            type: 'rotating-file',
            name: 'rotating_file_error_stream',
            path: logErrorFilePathAndName,
            level: 'warn',
            period: logFileRotatingPeriod,
            count: logFileRotatingCount,
        });
    }

    // Creating logger with all streams
    logger = bunyan.createLogger({
        name: loggerName,
        streams: loggerStreams,
        src: loggerEnableSourceInfo,
    });

    return logger;
}

function createMainLogger(options) {
    // if (!mainLogger) {
    mainLogger = createLogger(options || {});
    // }
    return mainLogger;
}

/* eslint-disable no-param-reassign */
function createMainLoggerFromConfig(applicationConfig, loggerName) {
    let loggerOptions = {};

    if (loggerName) {
        loggerOptions.loggerName = loggerName;
    }

    if (applicationConfig && applicationConfig.application_global_config
        && applicationConfig.application_global_config.logging) {
        // General
        const globalConfig = applicationConfig.application_global_config;
        const loggerEnableSourceInfo = globalConfig.logging.enableSourceInfo;

        if (!loggerOptions.loggerName) {
            loggerName = globalConfig.logging.logger_name;
        }

        // Console
        let consoleEnablePrettyStandardOut;
        let consoleLogLevel;

        if (globalConfig.logging.console) {
            consoleEnablePrettyStandardOut = globalConfig.logging.console.enablePrettyStandardOut;
            consoleLogLevel = globalConfig.logging.console.level;
        }

        loggerOptions = {
            loggerName,
            loggerEnableSourceInfo,
            consoleEnablePrettyStandardOut,
            consoleLogLevel,
        };
    }

    return createMainLogger(loggerOptions);
}

function getMainLogger() {
    if (!mainLogger) {
        return createMainLogger();
    }
    return mainLogger;
}

module.exports.createMainLogger = createMainLogger;
module.exports.getMainLogger = getMainLogger;
module.exports.createMainLoggerFromConfig = createMainLoggerFromConfig;
