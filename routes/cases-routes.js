const express = require('express');

const Cases = require('../models/dbFunctions');

const router = express.Router();

//endpoints for /cases
router.get('/:date/count', (req, res) => {
    //Listar todos os registros da base de dados no dia selecionado,
    //agrupados por país e separados por variante.

    const { date } = req.params;

    Cases.getCountByDate(date)
        .then(data => {
            if (data) {
                if (data.length === 0) {
                    res.status(200).json({ message: 'Good request, but no data for the selected date!' });
                }
                else {
                    const jsonOut = {};
                    data.forEach(element => {
                        if (jsonOut[element.location]) {
                            jsonOut[element.location].push({
                                variant: element.variant,
                                count: element.count
                            });
                        }
                        else {
                            jsonOut[element.location] = [{
                                variant: element.variant,
                                count: element.count
                            }];
                        }
                    });
                    res.status(200).json(jsonOut);
                }
            }
            else {
                res.status(404).json({ message: 'No data found' });
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'Error retrieving data',
                message: err
            });
        });

});

router.get('/:date/cumulative', (req, res) => {
    const { date } = req.params;
    Cases.getCumulativeByDate(date)
        .then(data => {
            if (data) {
                if (data.length === 0) {
                    res.status(200).json({ message: 'Good request, but no data for the selected date!' });
                }
                else {

                    let jsonOut = {};
                    let lastVariant = '';
                    data.forEach(element => {
                        if (jsonOut[element.location]) {
                            jsonOut[element.location].cumulativeAll += element.count;
                            if (element.variant === lastVariant) {
                                jsonOut[element.location].perVariant[jsonOut[element.location].perVariant.length - 1].cumulative += element.count;
                            }
                            else {
                                jsonOut[element.location].perVariant.push({
                                    variant: element.variant,
                                    cumulative: element.count
                                });
                                lastVariant = element.variant;
                            }
                        }
                        else {
                            jsonOut[element.location] = {
                                location: element.location,
                                cumulativeAll: element.count,
                                perVariant: [{
                                    variant: element.variant,
                                    cumulative: element.count
                                }]
                            };
                            lastVariant = element.variant;
                        }

                    });
                    res.status(200).json(jsonOut);
                }
            }
            else {
                res.status(404).json({ message: 'No data found' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: err });
        });

});

module.exports = router;