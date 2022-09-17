require('dotenv').config();

const express = require('express');
const helmet = require('helmet');

const app = express();
const server = require('http').createServer(app);
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const { logger } = require('./libs');
const mMongoDB = require('./libs/mongodb/index');
const mLog = require('./src/modules/logger');
const mConfig = require('./src/modules/config');
const constants = require('./src/constants');
const mErrors = require('./src/modules/errors');

// Load configurations
const config = mConfig.getConfig();
mLog.loadMainLogger();

// Load connections
mMongoDB.initConnection();

// Declaration of the all routes
const routes = require('./src/rcm/routes');

// Middleware
app.use(helmet({
    noCache: true,
}));
// parse incoming request body and append data to `req.body`
app.use(bodyParser.json({ limit: constants.LIMIT_SIZE_JSON }));
app.use(mErrors.parseError);
app.use(expressValidator({}));
app.use(bodyParser.urlencoded({ limit: constants.LIMIT_SIZE_JSON, extended: true }));

app.use(mLog.createLogChildren);
app.use(mLog.logRequest);
routes.initRoutes(app);

app.use(mErrors.pageNotFound); // Handle response 404 for non-existent endpoints
app.use(mErrors.errorHandler); // add custom error handler middleware as the last middleware

// Start server listening
server.listen(config.server.port, config.server.internal_ip, () => {
    logger.info(`Express listening on port ${config.server.port}`);
});

// Events
process.on('SIGINT', () => {
    process.emit('to_close_connections'); // Closing databases connections
    process.exit(0);
});
