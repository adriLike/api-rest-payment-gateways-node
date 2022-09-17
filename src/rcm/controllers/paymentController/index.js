/** ****************************************
    Module: PaymentController
    Description: Provide the functionality of the pgateways
******************************************* */

/* eslint-disable no-use-before-define */
const { ProviderManager } = require('../../pgateways/ProviderManager');
const pgatewayController = require('../pgatewayController');
const pgatewayValidator = require('../../pgateways/pgatewayValidator');
const { logger } = require('../../../../libs');

/**
 * Pay controller that will execute pay function from corresponding Pgateway
 * as strategy.
 * @param {Number} id Pgateway id
 * @param {Object} data Needed data to complet a pay
 * @returns Pay action response.
 */
module.exports.pay = async (id, data) => {
    const { pgateway, config } = await getStrategy(id, 'pay');
    return pgateway.pay(data, config);
};

/**
 * Reimburse controller that will execute pay function from corresponding Pgateway
 * as strategy.
 * @param {Number} id Pgateway id
 * @param {Object} data Needed data to complet a reimburse
 * @returns Reimburse action response.
 */
module.exports.reimburse = async (id, data) => {
    const { pgateway, config } = await getStrategy(id, 'reimburse');
    return pgateway.reimburse(data, config);
};

/**
 * PartialReimburse controller that will execute pay function from corresponding Pgateway
 * as strategy.
 * @param {Number} id Pgateway id
 * @param {Object} data Needed data to complet a partialReimburse
 * @returns PartialReimburse action response.
 */
module.exports.partialReimburse = async (id, data) => {
    const { pgateway, config } = await getStrategy(id, 'partialReimburse');
    return pgateway.partialReimburse(data, config);
};

// PRIVATE
/**
 * Load the correct Pgateway depending on the type configured
 * and check that the provider is up to use.
 * @param {*} id
 * @param {*} operation
 * @returns
 */
const getStrategy = async (id, operation) => {
    const config = await pgatewayController.get(id);

    // Recover the pgateway by the config type and recover it as strategy
    const pgateway = ProviderManager().getInstance().get(config.type);

    logger.info(`Trying to execute ${operation} action in provider: ${config.name}, of type: ${config.type}`);
    pgatewayValidator.checkProvider(pgateway, config.status, operation);
    return { pgateway, config };
};
