const express = require('express');
const router = express.Router();


const {create, securityById, read, remove, update, list} = require('../controllers/security');
const {userById} = require("../controllers/user");
const {requireSignin, isAuth, isAdmin} = require('../controllers/auth');

router.get('/nasd/security/:securityId', read)

router.post('/nasd/security/create/:userId', requireSignin, isAdmin, isAuth, create);

router.put('/nasd/security/:securityId/:userId', requireSignin, isAdmin, isAuth, update);
router.delete('/nasd/security/:securityId/:userId', requireSignin, isAdmin, isAuth, remove);
router.get('/nasd/security', list)





router.param('userId', userById)
router.param('securityId', securityById)

module.exports = router;