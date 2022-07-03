const db = require('../dbConfig')

module.exports = {
    getCountByDate,
    getCumulativeByDate,
    getDates,
};

//cases endpoints

function getCountByDate(date) {

    return db('cases')
        .where('date', date)
        .orderBy('location')
        .orderBy('variant')
        .select('location', 'variant', 'num_sequences as count')
}


function getCumulativeByDate(date) {
    return db('cases')
        .where('date', '<=', date)
        .orderBy('location')
        .orderBy('variant')
        .select('location', 'variant', 'num_sequences as count')


}

// dates endpoint

function getDates() {
    return db('cases')
        .select('date')
        .groupBy('date')
        .orderBy('date', 'desc')
}