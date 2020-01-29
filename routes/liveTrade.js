const express = require('express');
const router = express.Router();


const {liveTrade, security_to_traded, secSymById, secById,vwap, secVwap} = require('../controllers/liveTrade');


router.get('/live',liveTrade);
router.get('/security_to_traded/:secSym', security_to_traded);
router.get('/vwap/:secId', vwap);
router.get('/secVwap', secVwap);


router.param('secSym', secSymById);
router.param('secId', secById);
module.exports = router;