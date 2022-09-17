/* eslint-disable no-use-before-define */

/** ****************************************
    Module: MongoDB
    Description: Connection to MongoDB, reconnection, error handling...
******************************************* */
const mongoose = require('mongoose');
const config = require('../../src/modules/config').getConfig();
const { logger } = require('../index');

/**
 * Init mongoose connection
 * @returns null
 */
function getDBConnection() {
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection.db;
    }

    mongoose.connection.close();
    initConnection();

    return null;
}

/**
 * Return the connection to mongo
 * @returns @see mongoose.connection
 */
function initConnection() {
    const uri = `mongodb://${config.interface_to_connect.mongodb.host}:${config.interface_to_connect.mongodb.port}/${config.interface_to_connect.mongodb.database}`;

    const options = {
        user: config.interface_to_connect.mongodb.username,
        pass: config.interface_to_connect.mongodb.password,
        keepAlive: true,
        useNewUrlParser: true,
    };

    (function mongooseConnection() {
        mongoose.connect(uri, options).catch((e) => {
            if (e.name === 'MongoNetworkError') {
                mongoose.connection.close();
                setTimeout(mongooseConnection, process.env.MONGODB_RECONNECTION_TIME);
            }
        });
    }());

    mongoose.connection.on('connected', () => {
        logger.info(`MongoDB connection established ${uri}`);
    });
    mongoose.connection.on('reconnected', () => { logger.info('MongoDB reconnected established'); });
    mongoose.connection.on('error', (error) => { logger.info(`MongoDB error ${error}`); });
    mongoose.connection.on('disconnected', () => { logger.info('MongoDB disconnected'); });
    mongoose.connection.on('close', () => { logger.info('MongoDB close'); });
    mongoose.connection.on('fullsetup', () => { logger.info('MongoDB fullsetup'); });
    mongoose.connection.on('all', () => { logger.info('MongoDB connecting to a replica set'); });
    mongoose.connection.on('reconnectFailed', () => { logger.info('MongoDB reconnectFailed'); });
    mongoose.connection.on('reconnectTries', () => { logger.info('MongoDB reconnectTries'); });

    return mongoose.connection;
}

/**
 * Return mongoose instance already connected.
 * @returns @see mongoose
 */
function getMongooseConnection() {
    return mongoose;
}

/**
 * Allows to return field from mongo in a pipeline
 * aggregating filters
 * @param {*} collectionName Collection name to recover data
 * @param {*} query query to be executed
 * @returns Array<Object>
 */
async function findAllAndCount(collectionName, query) {
    if (!getDBConnection()) {
        return 'MongoDB Connection lost';
    }
    const collection = getDBConnection().collection(collectionName);

    const pipelines = [];

    // Pipeline filters
    pipelines.push({ $match: query.filters });

    // Pipeline sort
    if (query.projection && query.projection.sort) {
        pipelines.push({ $sort: query.projection.sort });
    }

    // Pipeline lookup and unwind
    if (query.lookup) {
        pipelines.push(query.lookup);
        pipelines.push(query.unwind);
    }

    // Pipeline group and count
    pipelines.push({
        $group: {
            _id: null,
            data: { $push: '$$ROOT' },
            count: { $sum: 1 },
        },
    });

    // Pipeline projection (limit, skip)
    let data;
    const limit = query.projection && query.projection.limit ? query.projection.limit : 0;
    const skip = query.projection && query.projection.skip ? query.projection.skip : 0;

    if (limit > 0 && skip > 0) {
        data = { $slice: ['$data', skip, limit] };
    } else if (limit > 0) {
        data = { $slice: ['$data', limit] };
    } else if (skip > 0) {
        data = { $slice: ['$data', skip, '$count'] };
    } else { data = '$data'; }

    pipelines.push({
        $project: {
            count: 1,
            data,
            limit: { $literal: limit.toString() },
            skip: { $literal: skip.toString() },
        },
    });

    // Pipeline projection (fields)
    if (query.projection && query.projection.fields) {
        const pipelineProjectionFields = {
            $project: {
                count: 1,
            },
        };

        const fields = Object.keys(query.projection.fields);
        fields.forEach((field) => {
            pipelineProjectionFields.$project[`data.${field}`] = 1; // Added to projection
        });
        pipelines.push(pipelineProjectionFields);
    }

    // Pipeline projection (hideFields)
    if (query.projection && query.projection.hideFields) {
        const pipelineProjectionHideFields = {
            $project: {
            },
        };

        const hideFields = Object.keys(query.projection.hideFields);
        hideFields.forEach((field) => {
            pipelineProjectionHideFields.$project[`data.${field}`] = 0; // Added to projection
        });
        pipelines.push(pipelineProjectionHideFields);
    }

    // Execute aggregate command in mongodb
    return collection.aggregate(pipelines).toArray();
}

module.exports.initConnection = initConnection;
module.exports.getDBConnection = getDBConnection;
module.exports.getMongooseConnection = getMongooseConnection;
module.exports.findAllAndCount = findAllAndCount;

process.on('to_close_connections', () => {
    logger.error('[MongoDB] Closing connection...');

    mongoose.disconnect()
        .then(() => logger.info('[MongoDB] Connection closed'))
        .catch((error) => logger.error(`[MongoDB] Error closing connections: ${error}`));
});
