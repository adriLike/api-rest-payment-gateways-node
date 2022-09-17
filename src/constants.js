/** ****************************************
    Module: Constants
******************************************* */

const PGATEWAY_COLLECTION_NAME = 'pgateway';
const PAYPAL = 'paypal';
const STRIPE = 'stripe';
const MPAGO = 'mercadopago';

const ACTIVE_STATUS = 'active';
const DISABLED_STATUS = 'disabled';
const SUSPENDED_STATUS = 'suspended';
const CANCELLED_STATUS = 'cancelled';

const PGATEWAY_STATUS = [
    ACTIVE_STATUS,
    DISABLED_STATUS,
    SUSPENDED_STATUS,
    CANCELLED_STATUS,
];

module.exports = {
    PGATEWAY_COLLECTION_NAME,
    PAYPAL,
    STRIPE,
    MPAGO,
    ACTIVE_STATUS,
    DISABLED_STATUS,
    SUSPENDED_STATUS,
    CANCELLED_STATUS,
    PGATEWAY_STATUS,
};
