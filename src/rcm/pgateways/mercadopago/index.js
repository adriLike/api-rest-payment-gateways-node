/** ****************************************
    Module: Mercadopago
    Description: Extend of @see Pgategay to implement custom functionality
******************************************* */

/* eslint-disable no-unused-vars */
const Pgateway = require('../Pgateway');
const { MPAGO } = require('../../../constants');
const { utils } = require('../../../utils');
const { logger } = require('../../../../libs');

/**
 * Provide a class to operate with Mercadopago payment gateway
 *
 * @class Mpago
 * @extends {Pgateway}
 */
class Mpago extends Pgateway {
    constructor() {
        super(MPAGO);
    }

    pay = async (data, config) => {
        // Should implement Mercadopago/other lib SDK for real pay
        logger.info(`Executing ${MPAGO} payment for order: ${data.orderId}, with amount: ${data.amount}`);
        const response = await utils.getPayMockResponse(data, MPAGO);
        return response;
    }

    reimburse = async (data, config) => {
        // Should implement Mercadopago/other lib SDK for real reimburse
        logger.info(`Executing ${MPAGO} reimburse for order: ${data.orderId}, with amount: ${data.amount}`);
        const response = await utils.getReimburseMockResponse(data, MPAGO);
        return response;
    }
}

module.exports = Mpago;
