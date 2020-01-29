const express = require('express');
const router = express.Router();


const {indexMarketStatus} = require('../controllers/indexMarketStatus');




router.get('/indexMarketStatus',indexMarketStatus)


module.exports = router;