/** ****************************************
    Module: Pgateway Routes
******************************************* */

const express = require('express');

const router = express.Router();
const mAuthorization = require('../../../modules/authorization');
const mFormatter = require('../../../modules/formatter');
const validate = require('../../../modules/validation');

// Controllers
const endpoint = require('./endpoints');

// CRUD
router.get('/', mAuthorization.authorize, endpoint.getAll);
router.get('/count', mAuthorization.authorize, endpoint.getCount);
router.get('/:id', mAuthorization.authorize, mFormatter.paramIdToInt, endpoint.getValidation, validate, endpoint.get);
router.post('/', mAuthorization.authorize, endpoint.newValidation, validate, endpoint.new);
router.put('/:id', mAuthorization.authorize, mFormatter.paramIdToInt, endpoint.putValidation, validate, endpoint.put);
router.patch('/:id/status/:state', mAuthorization.authorize, mFormatter.paramIdToInt, endpoint.patchStatusValidation, validate, endpoint.patchStatus);
router.delete('/:id', mAuthorization.authorize, mFormatter.paramIdToInt, endpoint.deleteValidation, validate, endpoint.delete);

module.exports = router;
