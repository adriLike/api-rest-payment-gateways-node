/** ****************************************
    Module: PgatewayModel
    Description: Allows to handle persistanece of the pgateways in the system
******************************************* */

const mongoose = require('../../../../libs/mongodb').getMongooseConnection();
const mMongoDB = require('../../../../libs/mongodb');
const { mongodbUtils } = require('../../../utils');
const Pgateway = require('../../pgateways/Pgateway');

const pgatewayInstance = new Pgateway();
const { PGATEWAY_COLLECTION_NAME } = require('../../../constants.js');

const schema = new mongoose.Schema(pgatewayInstance.getSchema(), { unique: true });

schema.loadClass(Pgateway);
const Model = mongoose.model('Pgateway', schema, PGATEWAY_COLLECTION_NAME);
module.exports.Model = Model;

/**
 * Get all Pgateway
 * @param {*} query Query with different filters o fields
 * @returns Object with: {data: []}
 */
module.exports.getAll = async (query = {}) => {
    const mongoQuery = {};
    mongodbUtils.generateMongoProjection(mongoQuery, query);
    mongodbUtils.generateMongoFilters(mongoQuery, query);

    return mMongoDB.findAllAndCount(PGATEWAY_COLLECTION_NAME, mongoQuery);
};

/**
 * Get a Pgateway by id
 * @param {*} id Param id
 * @returns Object with: {data: {}}
 */
module.exports.get = async (id) => {
    const query = { id };
    const result = Model.findOne(query);
    return result;
};

/**
 * Get the number Pgateway
 * @returns Object with: {data: <Number>}
 */
module.exports.getCount = async () => {
    const result = Model.count();
    return result;
};

/**
 * Save a Pgateway in the system
 * @param {*} document Object to save
 * @returns Object with: {data: {}}
 */
module.exports.save = async (document) => {
    const model = new Model(document);
    const result = model.save();
    return result;
};

/**
 * Update a Pgateway in the system by id
 * @param {*} id Param id to identify Pgateway to update
 * @param {*} document Object to update
 * @returns Object with: {data: {}}
 */
module.exports.update = async (id, document) => {
    const result = Model
        .findOneAndUpdate(
            { id },
            document,
            { new: true },
        );
    return result;
};

/**
 * Delete a Pgateway by id
 * @param {*} id Param id
 * @returns Object with: {data: {}}
 */
module.exports.delete = async (id) => {
    const result = await Model.remove({ id });
    return result;
};
