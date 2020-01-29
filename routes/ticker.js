const express = require('express');
const router = express.Router();


const {ticker, usi, MarketIndexT,MarketIndexY, liveTrade, participantsLogin} = require('../controllers/ticker');




router.get('/ticker',ticker);
router.get('/MarketIndexT',MarketIndexT);
router.get('/MarketIndexY',MarketIndexY);
router.get('/liveTrade',liveTrade);
router.get('/participantsLogin',participantsLogin);


router.get('/usi',usi);



module.exports = router;