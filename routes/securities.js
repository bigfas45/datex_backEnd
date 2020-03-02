const express = require('express');
const router = express.Router();


const {
    symbols, securityData, secSymById, secSymByIdMcap, securityMcap, secSymByIdTtrades, 
    totalTrade, secDealsById, totalDeals, performanceStartByDate, 
    performanceStart, performanceEndByDate, performanceEnd, performanceEndByDateSecurity,
     performanceStartByDateSecurity, performanceEndSecurity, performanceStartSecurity, totalBidsById, totalBids,totalOffers, totalOffersById} = require('../controllers/securities');

router.get('/security/symbol',  symbols);
router.get('/security/:secId',  securityData);
router.get('/security/chart/:secId',  securityData);
router.get('/security/mcap/:secIdMcap',  securityMcap);
router.get('/security/totalTrade/:secIdTtrades',  totalTrade);
router.get('/security/totalDeals/:secDealsId',  totalDeals);
router.get('/security/totalBids/:totalBidsId',  totalBids);
router.get('/security/totalOffers/:totalOffersId',  totalOffers);

router.get('/security/performanceStart/:performanceStartDate',  performanceStart);

router.get('/security/performanceEnd/:performanceEndDate',  performanceEnd);

router.get('/security/performanceEndSecurity/:performanceEndDateSecurity/:performanceEndDateSecurity2',  performanceEndSecurity);
router.get('/security/performanceStartSecurity/:performanceStartDateSecurity',  performanceStartSecurity);






router.param('secId', secSymById);
router.param('secIdMcap', secSymByIdMcap);
router.param('secIdTtrades', secSymByIdTtrades);
router.param('secDealsId', secDealsById);
router.param('totalBidsId', totalBidsById);
router.param('totalOffersId', totalOffersById);
router.param('performanceStartDate', performanceStartByDate);
router.param('performanceEndDate', performanceEndByDate);
router.param('performanceEndDateSecurity', performanceEndByDateSecurity);
router.param('performanceEndDateSecurity2', performanceEndByDateSecurity);

router.param('performanceStartDateSecurity', performanceStartByDateSecurity);




module.exports = router;
