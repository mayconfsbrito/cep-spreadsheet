const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const spreadsheetFilePath = './test-data.csv';

const csvWriter = createCsvWriter({
  path: spreadsheetFilePath,
  header: [{ id: 'cep', title: 'CEP' }],
  encoding: 'latin1'
});

exports.writeCep = text => {
  if (text) {
    const data = [{ cep: text }];
    csvWriter.writeRecords(data);
  }
};

exports.getFilePath = () => {
  return spreadsheetFilePath;
};
