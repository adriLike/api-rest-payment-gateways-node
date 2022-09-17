/** ****************************************
    Module: Routes
    Description: Load all API endpoints
******************************************* */

// Load libraries
const pgatewayRoutes = require('./pgatewayRoutes');
const paymentRoutes = require('./paymentRoutes');

module.exports.initRoutes = (app) => {
    app.use('/pgateway', pgatewayRoutes);
    app.use('/payment', paymentRoutes);
};
