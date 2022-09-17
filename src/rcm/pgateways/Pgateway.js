/** ****************************************
    Module: Pgategay
    Description: Main class ofPgateway
******************************************* */

const { PGATEWAY_STATUS } = require('../../constants');

/**
 * Provides an interface to the provider gateways of the application
 */
class Pgateway {
    constructor(type) {
        this.type = type; // One of: paypal, stripe...
    }

    /**
     * pay interface. Must be implemented.
     */
    pay = async () => {
        throw new Error('Method \'pay()\' must be implemented.');
    }

    /**
     * reimburse interface. Must be implemented.
     */
    reimburse = async () => {
        throw new Error('Method \'reimburse()\' must be implemented.');
    }

    /**
     * Retrieve the Pgateway schema. This migth be loaded as singleton or from config
     * @returns Schema
     */
    getSchema = () => ({
        id: { type: Number, required: true, unique: true },
        name: { type: String, required: true, unique: true },
        type: { type: String, required: true },
        status: {
            type: String,
            required: true,
            enum: PGATEWAY_STATUS,
        },
        client_id: { type: String, required: true }, // Provide by the back and stored encrypted
        client_secret: { type: String, required: true }, // Provide by the back and stored encrypted
        apiKey: { type: String, required: false }, // Provide by the back and stored encrypted
        creation_date: { type: Date, required: true },
        last_modified_date: { type: Date, required: false },
    })
}

module.exports = Pgateway;
