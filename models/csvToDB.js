
const fs = require('fs');
const csv = require('csv-parser');
const formater = require('date-fns/format');
const { ptBR } = require('date-fns/locale');

const db = require('../dbConfig');
const { format } = require('path');

async function csvToDB() {

    console.log('Loading CSV file...');

    let results = [];
    const filePath = `${__dirname}/../covid-variants.csv`;
    fs.createReadStream(filePath, 'utf8')
        .pipe(csv())
        .on('data', (data) => {
            const newDate = formater(
                new Date(data.date),
                'yyyy-MM-dd', {
                locale: ptBR,
            });
            data.date = newDate;

            data.num_sequences = parseInt(data.num_sequences);
            data.perc_sequences = parseFloat(data.perc_sequences);
            data.num_sequences_total = parseInt(data.num_sequences_total);
            results.push(data)
        })
        .on('end', () => {
            console.log('Fulfilling DB...');
            populateDB(results);
        });
}

function populateDB(results) {
    const loadProgressMax = results.length;
    let loadProgress = 0;
    results.forEach((result) => {
        db('cases').insert(result)
            .then(() => {
                //update de load progress
                loadProgress++;

                //show the load progress message each 0.01%
                if (loadProgress % Math.floor(loadProgressMax / 1000) === 0) {
                    process.stdout.write("\r\x1b[K")
                    process.stdout.write(`Progress: ${((loadProgress / loadProgressMax) * 100).toFixed(2)}%`);
                }

                if (loadProgress === loadProgressMax) {
                    console.log('\nFinished insert on Database');
                    console.log('Press Ctrl/Command + C to exit or close the window.');
                }
            })
            .catch(err => {
                console.log(err);
            })
    });
}

module.exports = csvToDB;