const mailer = require('nodemailer');
const dotenv = require('dotenv');
const fileHelper = require('../helpers/SpreadSheetFileHelper');

dotenv.config({ path: './config.env' });

const USER = process.env.MAILER_USER;
const PASSWORD = process.env.MAILER_PASSWORD;
const MAILERTO = process.env.MAILER_TO;

const transport = mailer.createTransport({
  service: 'gmail',
  auth: {
    user: USER,
    pass: PASSWORD
  }
});

exports.sendCEPsEmail = () => {
  const message = {
    from: USER,
    to: MAILERTO,
    subject: '[RPA-TESTE-GUPY] Valida CEP',
    text: 'Segue anexo a planilha com os CEPs.',
    attachments: [
      {
        filename: 'Brazilian CEPs.csv',
        path: fileHelper.getFilePath()
      }
    ]
  };
  transport.sendMail(message, err => {
    if (err) {
      console.error(err);
    } else {
      console.log('Email sent!');
    }
  });
};
