/** ****************************************
    Module: Paypal
    Description: Extend of @see Pgategay to implement custom functionality
******************************************* */

/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
const Pgateway = require('../Pgateway');
const { PAYPAL } = require('../../../constants');
const { utils } = require('../../../utils');
const { logger } = require('../../../../libs');
/**
 * Provide a class to operate with Paypal payment gateway
 *
 * @class Paypal
 * @extends {Pgateway}
 */
class Paypal extends Pgateway {
    constructor() {
        super(PAYPAL);
    }

    pay = async (data, config) => {
        // Should implement Paypal/other lib SDK for real pay
        logger.info(`Executing ${PAYPAL} payment for order: ${data.orderId}, with amount: ${data.amount}`);
        const response = await utils.getPayMockResponse(data, PAYPAL);
        return response;
    }

    reimburse = async (data, config) => {
        // Should implement Paypal/other lib SDK for real reimburse
        logger.info(`Executing ${PAYPAL} reimburse for order: ${data.orderId}, with amount: ${data.amount}`);
        const response = await utils.getReimburseMockResponse(data, PAYPAL);
        return response;
    }

    partialReimburse = async (data, config) => {
        // Should implement Paypal/other lib SDK for real partial reimburse
        logger.info(`Executing ${PAYPAL} partialReimburse for order: ${data.orderId}, with amount: ${data.amount}`);
        const response = await utils.getReimburseMockResponse(data, PAYPAL);
        return response;
    }
}

module.exports = Paypal;
