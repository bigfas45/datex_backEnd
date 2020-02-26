const express = require('express');
const router = express.Router();


const {equity, priceList, monthlySummary, dateByDate1, yearSummary, yearSummaryY, dateByDate1Y, corporate_action, bonds} = require('../controllers/equity');


router.get('/equity',equity);
router.get('/equity/priceList',priceList);

router.get('/equity/monthly/:date1/:date2',  monthlySummary);
router.get('/equity/year',  yearSummary);

router.get('/equity/year/:date1Y/:date2Y',  yearSummaryY);
router.get('/equity/corporate_action',  corporate_action);
router.get('/equity/bonds',  bonds);

router.param('date1', dateByDate1);
router.param('date2', dateByDate1);

router.param('date1Y', dateByDate1Y);
router.param('date2Y', dateByDate1Y);


module.exports = router;