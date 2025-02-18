const express = require('express');
const { addreports, viewreports, multiDeletereport, statusupdatereport, deletereport } = require('../../../controller/controllers');

const reportroutes = express.Router();

reportroutes.post('/add-reports',addreports);
reportroutes.get('/view-reports',viewreports);
reportroutes.delete('/delete-reports/:_id',deletereport);
reportroutes.post('/update-reports/:_id',statusupdatereport);
reportroutes.post('/multi-delete-reports',multiDeletereport);


module.exports = reportroutes;