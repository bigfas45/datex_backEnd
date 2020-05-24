const express = require('express');
const router = express.Router();


const {getDailyEod, getSecurityToTraded, secById, secTrade, tradeSum, uploadVwapPrice} = require('../controllers/vwap');

const {requireSignin, isAuth, isAdmin} = require('../controllers/auth');

router.get('/vwap/eod/:userId', requireSignin , getDailyEod);

router.get('/vwap/get/sec' , getSecurityToTraded);

router.get('/vwap/sec/trade/:secId' , secTrade);

router.get('/vwap/trade/sum' , tradeSum);
router.post('/vwap/price/upload' , uploadVwapPrice);


router.param('secId', secById);




module.exports = router;