// console.log('Olá mundo')
// const moment = require('moment');

// const dataAtual = moment();
// const dataFormatada = dataAtual.format('DD/MM/YYYY HH:mm')
// console.log(dataFormatada);

// Importação de módulo externo
const dateUtils = require('./dateUtils');
console.log(dateUtils.getCurrentDate());
console.log(dateUtils.getNextMonth());
