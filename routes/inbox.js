const express = require('express');
const router = express.Router();


const {inboxDate, dateId, getInbox, dateId2, getInboxTradeReport} = require('../controllers/inbox');


router.get('/inboxDate',inboxDate);
router.get('/getInbox/:date', getInbox);
router.get('/getInboxTradeReport/:date2/:date3', getInboxTradeReport);


router.param('date', dateId);
router.param('date2', dateId2);
router.param('date3', dateId2);

module.exports = router;