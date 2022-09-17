/** ****************************************
    Module: Stripe
    Description: Extend of @see Pgategay to implement custom functionality
******************************************* */

/* eslint-disable no-unused-vars */
const Pgateway = require('../Pgateway');
const { STRIPE } = require('../../../constants');
const { utils } = require('../../../utils');
const { logger } = require('../../../../libs');
/**
 * Provide a class to operate with Stripe payment gateway
 *
 * @class Stripe
 * @extends {Pgateway}
 */
class Stripe extends Pgateway {
    constructor() {
        super(STRIPE);
    }

    pay = async (data, config) => {
        // Should implement Stripe/other lib SDK or call API REST for real pay
        logger.info(`Executing ${STRIPE} payment for order: ${data.orderId}, with amount: ${data.amount}`);
        const response = await utils.getPayMockResponse(data, STRIPE);
        return response;
    }

    reimburse = async (data, config) => {
        // Should implement Stripe/other lib SDK or call API REST for real reimburse
        logger.info(`Executing ${STRIPE} reimburse for order: ${data.orderId}, with amount: ${data.amount}`);
        const response = await utils.getReimburseMockResponse(data, STRIPE);
        return response;
    }
}

module.exports = Stripe;
