/** ****************************************
    Module: Payment Routes
******************************************* */

const express = require('express');

const router = express.Router();
const mAuthorization = require('../../../modules/authorization');
const mFormatter = require('../../../modules/formatter');
const validate = require('../../../modules/validation');

// Controllers
const endpoint = require('./endpoints');

// Routes
router.post('/:id/pay', mAuthorization.authorize, mFormatter.paramIdToInt, endpoint.payValidation, validate, endpoint.pay);
router.post('/:id/reimburse', mAuthorization.authorize, mFormatter.paramIdToInt, endpoint.reimburseValidation, validate, endpoint.reimburse);
router.post('/:id/partialReimburse', mAuthorization.authorize, mFormatter.paramIdToInt, endpoint.partialReimburseValidation, validate, endpoint.partialReimburse);

module.exports = router;
