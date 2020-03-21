const express = require('express');
const router = express.Router();


const {create, priceById, update,list,listSecurity,read,vwap,fileUpload, fileById} = require('../controllers/price');
const { userById } = require("../controllers/user");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");

router.post('/price/:userId',requireSignin,isAuth,isAdmin, create);
router.get("/price/:priceId", read);


router.put('/price/:priceId/:userId',requireSignin,isAuth,isAdmin, update);

router.get('/price/list/:userId',requireSignin,isAuth,isAdmin, list);
router.get('/price/security', listSecurity);
router.get('/price/eod/upload/:fileId', vwap);

router.post('/price/file/upload/:userId',requireSignin,isAuth,isAdmin, fileUpload);



router.param('userId', userById);
router.param('priceId', priceById);
router.param('fileId', fileById);



module.exports = router;