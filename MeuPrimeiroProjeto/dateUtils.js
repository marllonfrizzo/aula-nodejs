const moment = require('moment');

function getCurrentDate() {
    const data = moment();
    return data.format('DD/MM/YYYY HH:mm');
}

function getNextMonth() {
    const data = moment();
    return data.add(1, 'month').format('MMMM');
}

module.exports = {
    getCurrentDate,
    getNextMonth
};
