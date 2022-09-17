/** ****************************************
    Module: Payment Routes Enpoints
******************************************* */
const { param, body } = require('express-validator/check');
const paymentController = require('../../controllers/paymentController');
const response = require('../../../modules/response');

module.exports.payValidation = [
    param('id').isNumeric(),
    body('orderId').isString(),
    body('amount').isFloat(),
    body('currency').isString(),
];

/**
 * Pay functionality
 * @param {*} req Request of middleware
 * @param {*} res Response of middleware
 * @param {*} next Express next
 */
module.exports.pay = (req, res, next) => {
    const { id } = req.params;
    const data = req.validatedBody;

    response.standardDataPromise(paymentController.pay(id, data), req, res, next);
};

module.exports.reimburseValidation = [
    param('id').isNumeric(),
    body('orderId').isString(),
    body('amount').isFloat(),
    body('currency').isString(),
];

/**
 * Reimburse functionality
 * @param {*} req Request of middleware
 * @param {*} res Response of middleware
 * @param {*} next Express next
 */
module.exports.reimburse = (req, res, next) => {
    const { id } = req.params;
    const data = req.validatedBody;

    response.standardDataPromise(paymentController.reimburse(id, data), req, res, next);
};

module.exports.partialReimburseValidation = [
    param('id').isNumeric(),
    body('orderId').isString(),
    body('amount').isFloat(),
    body('currency').isString(),
];

/**
 * PartialReimburse functionality
 * @param {*} req Request of middleware
 * @param {*} res Response of middleware
 * @param {*} next Express next
 */
module.exports.partialReimburse = (req, res, next) => {
    const { id } = req.params;
    const data = req.validatedBody;

    response.standardDataPromise(paymentController.partialReimburse(id, data), req, res, next);
};
