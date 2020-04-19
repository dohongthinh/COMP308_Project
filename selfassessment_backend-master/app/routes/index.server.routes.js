const index= require('../controller/index.server.controller');

// Define the routes module' method
module.exports = function(app) {
	
  app.get('/', index.home);
  app.post('/predict', index.predictEmergency);
  app.post('/predictResult', index.result);
 
};