const express = require('express');
const router = express.Router();


const {userById, read, update, list, remove,userByIdGet, update2} = require('../controllers/user');

const {requireSignin, isAuth, isAdmin} = require('../controllers/auth');

router.get('/secret/:userId', requireSignin , isAuth, isAdmin, (req, res) => {
    res.json({
        user: req.profile
    });
});

router.get('/user/:userId', requireSignin , read);

router.put('/user/:userId', requireSignin , isAuth, update);

router.put('/user/:userIdD/:userId', requireSignin , isAuth, update2);


router.get('/users/:userId', requireSignin,isAuth, list);

router.delete('/users/delete/:userIdD/:userId', requireSignin,isAuth, remove);


router.param('userId', userById)
router.param('userIdD', userByIdGet)

module.exports = router;