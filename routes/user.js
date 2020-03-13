const express = require('express');
const router = express.Router();


const {userById, read, update, list, remove,userByIdGet, update2, allUsers} = require('../controllers/user');

const {requireSignin, isAuth, isAdmin} = require('../controllers/auth');
const {mailById} = require('../controllers/mail');


router.get('/secret/:userId', requireSignin , isAuth, isAdmin, (req, res) => {
    res.json({
        user: req.profile
    });
});

router.get('/user/:userId', requireSignin , read);

router.put('/user/:userId', requireSignin , isAuth, update);

router.put('/user/:userIdD/:userId', requireSignin , isAuth, update2);


router.get('/users/:userId', requireSignin,isAuth, list);

router.get('/users/maillist/:mailId/:userId', requireSignin,isAuth, allUsers);


router.delete('/users/delete/:userIdD/:userId', requireSignin , isAuth , remove);


router.param('userId', userById)
router.param('mailId', mailById)
router.param('userIdD', userByIdGet)

module.exports = router;