const express = require('express');
const router = express.Router();


const {symbols, securityData, secSymById, secSymByIdMcap, securityMcap, secSymByIdTtrades, totalTrade, secDealsById, totalDeals, performanceStartByDate, performanceStart, performanceEndByDate, performanceEnd} = require('../controllers/securities');

router.get('/security/symbol',  symbols);
router.get('/security/:secId',  securityData);
router.get('/security/chart/:secId',  securityData);
router.get('/security/mcap/:secIdMcap',  securityMcap);
router.get('/security/totalTrade/:secIdTtrades',  totalTrade);
router.get('/security/totalDeals/:secDealsId',  totalDeals);
router.get('/security/performanceStart/:performanceStartDate',  performanceStart);

router.get('/security/performanceEnd/:performanceEndDate',  performanceEnd);







router.param('secId', secSymById);
router.param('secIdMcap', secSymByIdMcap);
router.param('secIdTtrades', secSymByIdTtrades);
router.param('secDealsId', secDealsById);
router.param('performanceStartDate', performanceStartByDate);
router.param('performanceEndDate', performanceEndByDate);


module.exports = router;
