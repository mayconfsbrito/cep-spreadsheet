const cepModel = require('../models/Cep');

exports.run = callback => {
  cepModel.findCEPs();
  cepModel.onDrain(callback);
};
