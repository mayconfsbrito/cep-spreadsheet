const dotenv = require('dotenv');
const Crawler = require('crawler');
const fileHelper = require('../helpers/SpreadSheetFileHelper');

dotenv.config({ path: './config.env' });

const timeBetweenRequests = process.env.CRAWLER_TIME_BETWEEN_REQUESTS;
const retriesPerRequest = process.env.CRAWLER_RETRIES_PER_REQUEST;
const cepPrefix = process.env.CRAWLER_CEP_PREFIX;
const url = process.env.CRAWLER_URL;

const getCepFromRequest = res => {
  const { $ } = res;
  return $('.tmptabela')
    .find('td')
    .text();
};

const callbackCrawler = (error, res, done) => {
  if (error) {
    console.log(error);
  } else {
    const { $ } = res;
    let text = $('.tmptabela')
      .find('td')
      .text();
    text = getCepFromRequest(res);
    fileHelper.writeCep(text);
  }
  done();
};

const crawler = new Crawler({
  rateLimit: timeBetweenRequests,
  retries: retriesPerRequest,
  callback: callbackCrawler
});

exports.findCEPs = () => {
  let cepSuffix = null;
  let cep = null;

  crawler.on('request', function(options) {
    console.log(`${options.form.relaxation}`);
  });

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 1000; i++) {
    cepSuffix = `000${i}`.slice(-3);
    cep = `${cepPrefix}-${cepSuffix}`;
    crawler.queue({
      url,
      method: 'POST',
      form: {
        relaxation: cep,
        tipoCEP: 'ALL',
        semelhante: 'N'
      }
    });
  }
};

exports.onDrain = callback => {
  crawler.on('drain', callback);
};
