/** ****************************************
    Module: Logger
******************************************* */

const { logger } = require('../../../libs');

function loadMainLogger() {
    const loggerConfig = {
        application_global_config: {
            logging: {
                console: {
                    level: process.env.PGATEWAY_LOG_LEVEL,
                    enablePrettyStandardOut: true,
                },
                enableSourceInfo: false,
            },
        },
    };

    const loggerName = process.env.PROJECT_NAME;
    logger.setupLogger(loggerConfig, loggerName);
}

// Middleware to create log children from Logger module
function createLogChildren(req, res, next) {
    const log = logger.mainLogger.child({ method: `${req.method} ${req.originalUrl}` });
    req.log = log;

    next();
}

function logRequest(req, res, next) {
    if (process.env.PGATEWAY_API_LOG_FULL_REQUEST) {
        req.log.info(`[URL] ${req.method} ${req.originalUrl}. [BODY] ${JSON.stringify(req.body)}`);
    } else {
        req.log.debug(`[URL] ${req.method} ${req.originalUrl}`);
    }
    next();
}

module.exports.loadMainLogger = loadMainLogger;
module.exports.createLogChildren = createLogChildren;
module.exports.logRequest = logRequest;
