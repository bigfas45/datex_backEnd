const express = require('express');
const router = express.Router();


const { create, participantById, update, list } = require('../controllers/participant');
const {userById} = require('../controllers/user');

const {requireSignin, isAuth, isAdmin} = require('../controllers/auth');



router.post('/nasd/participant/create/:userId', requireSignin , isAuth, isAdmin, create);
router.put('/nasd/participant/create/:participantId/:userId', requireSignin , isAuth, isAdmin, update);
router.get('/nasd/participant/', list);




router.param('userId', userById)
router.param('participantId', participantById)

module.exports = router;