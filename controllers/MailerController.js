const mailerModel = require('../models/Mailer');

exports.run = () => {
  mailerModel.sendCEPsEmail();
};
