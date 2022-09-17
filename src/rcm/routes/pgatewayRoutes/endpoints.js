/** ****************************************
    Module: Pgateway Routes Enpoints
******************************************* */
/* eslint-disable max-len */

// Load libraries
const { body, param } = require('express-validator/check');
const pgatewayController = require('../../controllers/pgatewayController');
const response = require('../../../modules/response');
const { PGATEWAY_STATUS } = require('../../../constants');

/**
 * Get all pgateways
 * @param {*} req Request of middleware
 * @param {*} res Response of middleware
 * @param {*} next Express next
 */
module.exports.getAll = (req, res, next) => {
    response.standardListPromise(pgatewayController.getAll(req), req, res, next);
};

module.exports.getValidation = [
    param('id').isNumeric(),
];

/**
 * Get a pgateway by id
 * @param {*} req Request of middleware
 * @param {*} res Response of middleware
 * @param {*} next Express next
 */
module.exports.get = (req, res, next) => {
    const { id } = req.params;

    response.standardDataPromise(pgatewayController.get(id), req, res, next);
};

/**
 * Get the number of pgateway in the system
 * @param {*} req Request of middleware
 * @param {*} res Response of middleware
 * @param {*} next Express next
 */
module.exports.getCount = (req, res, next) => {
    response.standardDataPromise(pgatewayController.getCount(), req, res, next);
};

module.exports.newValidation = [
    body('id').isNumeric(),
    body('name').isString(),
    body('type').isString(),
    body('status').isString().isIn(PGATEWAY_STATUS),
    body('client_id').isString(),
    body('client_secret').isString(),
    body('apiKey').isString(),
];

/**
 * Save a pgateway in the system
 * @param {*} req Request of middleware
 * @param {*} res Response of middleware
 * @param {*} next Express next
 */
module.exports.new = (req, res, next) => {
    const data = req.validatedBody;

    response.standardDataPromise(pgatewayController.new(data), req, res, next);
};

module.exports.putValidation = [
    body('name').isString(),
    body('type').isString(),
    body('status').isString().isIn(PGATEWAY_STATUS),
    body('client_id').isString(),
    body('client_secret').isString(),
    body('apiKey').isString(),
];

/**
 * put a pgateway in the system
 * @param {*} req Request of middleware
 * @param {*} res Response of middleware
 * @param {*} next Express next
 */
module.exports.put = (req, res, next) => {
    const { id } = req.params;
    const data = req.validatedBody;

    response.standardDataPromise(pgatewayController.put(id, data), req, res, next);
};

module.exports.patchStatusValidation = [
    param('id').isNumeric(),
    param('state').isString().isIn(PGATEWAY_STATUS),
];

/**
 * Update the status of a pgateway in the system
 * @param {*} req Request of middleware
 * @param {*} res Response of middleware
 * @param {*} next Express next
 */
module.exports.patchStatus = (req, res, next) => {
    const { id, state } = req.params;

    response.standardDataPromise(pgatewayController.patchStatus(id, state), req, res, next);
};

module.exports.deleteValidation = [
    param('id').isNumeric(),
];

/**
 * Delete a pgateway in the system
 * @param {*} req Request of middleware
 * @param {*} res Response of middleware
 * @param {*} next Express next
 */
module.exports.delete = (req, res, next) => {
    const { id } = req.params;

    response.standardDeletePromise(pgatewayController.delete(id), req, res, next);
};
