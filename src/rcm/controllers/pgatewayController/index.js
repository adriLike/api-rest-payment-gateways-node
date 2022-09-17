/** ****************************************
    Module: PgatewayController
    Description: Allows to handle persistanece of the pgateways in the system
******************************************* */

const moment = require('moment');
const pgatewayModel = require('../../models/PgatewayModel');
const mErrors = require('../../../modules/errors');

/**
 * Get all pgateways
 * @param {*} req Request of middleware
 * @returns Object with: {data: []}
 */
module.exports.getAll = async (req) => {
    const { query } = req;
    const result = await pgatewayModel.getAll(query);

    if (!result || !result[0] || result[0].data.length < 1) {
        return result;
    }
    return result[0];
};

/**
 * Get a pgateway by id
 * @param {*} id Param id
 * @returns Object with: {data: {}}
 */
module.exports.get = async (id) => {
    const result = await pgatewayModel.get(id);

    if (!result) {
        throw new mErrors.FuncErrors('gatewayNotFound');
    }
    return result;
};

/**
 * Get the number pgateway
 * @returns Object with: {data: <Number>}
 */
module.exports.getCount = async () => {
    const result = await pgatewayModel.getCount();
    return result;
};

/**
 * Save a pgateway in the system
 * @param {*} data Object to save
 * @returns Object with: {data: {}}
 */
module.exports.new = async (data) => {
    const document = { ...data };
    document.creation_date = moment().toISOString();

    let pgateway;
    try {
        pgateway = await pgatewayModel.save(document);
    } catch (err) {
        if (err.code === 11000) {
            throw new mErrors.FuncErrors('resourceAlreadyExists', err.message);
        } else {
            throw err;
        }
    }

    return pgateway;
};

/**
 * put a pgateway in the system
 * @param {*} data Object to put
 * @returns Object with: {data: {}}
 */
module.exports.put = async (id, data) => {
    const document = { ...data };
    document.last_modified_date = moment().toISOString();

    const pgateway = await pgatewayModel.update(id, document);

    if (!pgateway) {
        throw new mErrors.FuncErrors('resourceNotFound');
    }
    return pgateway;
};

/**
 * Updates the status of a pgateway in the system
 * @param {*} data Object to put
 * @returns Object with: {data: {}}
 */
module.exports.patchStatus = async (id, state) => {
    const document = { status: state };
    document.last_modified_date = moment().toISOString();

    const pgateway = await pgatewayModel.update(id, document);

    if (!pgateway) {
        throw new mErrors.FuncErrors('resourceNotFound');
    }
    return { status: pgateway.status };
};

/**
 * Delete a pgateway by id
 * @param {*} id Param id
 * @returns No content
 */
module.exports.delete = async (id) => {
    const oldpgateway = await pgatewayModel.get(id);
    if (!oldpgateway) {
        throw new mErrors.FuncErrors('resourceNotFound');
    }

    const result = await pgatewayModel.delete(id);
    if (!result) {
        throw new mErrors.FuncErrors('resourceNotDelete');
    }

    return result;
};
