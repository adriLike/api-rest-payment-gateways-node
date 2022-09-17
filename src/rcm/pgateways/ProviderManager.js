/** ****************************************
    Module: ProviderManager
    Description: Singleton class that allows to load a @see Pgateway as strategy
******************************************* */

const Paypal = require('./paypal');
const Stripe = require('./stripe');
const Mercadopago = require('./mercadopago');

/**
 * Implements strategy pattern to recover a requested Pgateway
 * @returns @see Pgateway
 */
class Manager {
    constructor() {
        this.pgateways = [new Paypal(), new Stripe(), new Mercadopago()]; // By default
    }

    /**
     * Retrieve a Pgateway
     */
    get(type) {
        return this.pgateways.find((pgateway) => pgateway.type === type);
    }
}

/**
 * Singleton class to recover a Pgateway
 * @returns @see Pgateway
 */
module.exports.ProviderManager = () => {
    let instance;

    function createInstance() {
        const manager = new Manager();
        return manager;
    }

    return {
        getInstance() {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        },
    };
};
