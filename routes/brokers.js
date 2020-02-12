const express = require('express');
const router = express.Router();


const { brokers, brokers2, brokersTopTen , dateTopTenByDate1, brokersTrades, codeById, brokersTradeSell, codeSellById, brokersTradeDaily, codeDailyById} = require('../controllers/brokers');

router.get('/brokers',brokers);
router.get('/brokers2',brokers2);
router.get('/brokers/TopTen/:dateTopTen/:dateTopTen1',  brokersTopTen);
router.get('/brokers/Trades/:code',brokersTrades);

router.get('/brokers/Trades/sell/:codeSell',brokersTradeSell);

router.get('/brokers/Trades/daily/:codeDaily',brokersTradeDaily);



router.param('dateTopTen', dateTopTenByDate1);
router.param('dateTopTen1', dateTopTenByDate1);
router.param('code', codeById);
router.param('codeSell', codeSellById);
router.param('codeDaily', codeDailyById);



module.exports = router;