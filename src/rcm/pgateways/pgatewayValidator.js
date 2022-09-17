/** ****************************************
    Module: PgategayValidator
    Description: Provides validation functions related to @see Pgateway
******************************************* */

const { ACTIVE_STATUS } = require('../../constants');
const mErrors = require('../../modules/errors');
const { logger } = require('../../../libs');

/**
 * Throw @see invalidProvider if provider recovered does not exist
 * @param {*} pgateway Providers' controller
 */
const checkProviderExist = (pgateway) => {
    if (pgateway === undefined) throw new mErrors.FuncErrors('invalidProvider');
};

/**
 * Throw @see notAvailibleAction if provider is not active
 * @param {String} status Provider status
 */
const checkPgatewayIsActive = (status) => {
    if (status !== ACTIVE_STATUS) throw new mErrors.FuncErrors('notAvailibleAction');
};

/**
 * Throw @see invalidFunctionInProvider if provider does not implement
 * requested operation.
 * @param {Array<String>} validValues Provider functions allowed
 * @param {String} operation Current function to call. Ex: pay
 */
const checkFunctionInProvider = (validValues, operation) => {
    if (!validValues.includes(operation)) {
        logger.error(`Action: ${operation} is not supported`);
        throw new mErrors.FuncErrors('invalidFunctionInProvider');
    }
};

/**
 * Check that the provider is up to use. If not, throw an error.
 * @param {*} pgateway Providers' controller
 * @param {String} status Provider status
 * @param {String} operation Current function to call. Ex: pay
 */
module.exports.checkProvider = (pgateway, status, operation) => {
    checkProviderExist(pgateway);
    checkPgatewayIsActive(status);
    checkFunctionInProvider(Object.keys(pgateway), operation);
};
