const express = require('express');
const router = express.Router();


const {getDailyEod} = require('../controllers/vwap');

const {requireSignin, isAuth, isAdmin} = require('../controllers/auth');

router.get('/vwap/eod/:userId', requireSignin , getDailyEod);


module.exports = router;