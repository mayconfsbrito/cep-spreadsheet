const cepController = require('./controllers/CepController');
const mailerController = require('./controllers/MailerController');

/**
 * To run this program you will need to create the config.env file with your own configuration.
 * You can use copy and change the file config_EXAMPLE.env to config.env and set your configuration.
 *
 */
cepController.run(() => {
  mailerController.run();
});
