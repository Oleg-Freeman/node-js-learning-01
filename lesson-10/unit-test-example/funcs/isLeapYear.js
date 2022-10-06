// const moment = require('moment')
// const dayjs = require('dayjs')

const isLeapYear = (year) => {
    if (year === undefined) {
        throw new Error('year must exist');
    }

    if (typeof year !== 'number') {
        throw new Error('year must be number');
    }

    if (!Number.isInteger(year)) {
        throw new Error('year must be integer');
    }

    if (year < 45) {
        throw new Error('year must be greater than 45');
    }

    const date = new Date(year, 1, 29);
    const day = date.getDate();

    return day === 29;
};

module.exports = isLeapYear;
