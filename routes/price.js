const express = require('express');
const router = express.Router();


const {
    create,
    priceById,
    update,
    list,
    listSecurity,
    read,
    vwap,
    fileUpload,
    fileById,
    fileList,
    file,
    updateFileUpload,
    remove,
    eodread,
    eodDelete
} = require('../controllers/price');
const {userById} = require("../controllers/user");
const {requireSignin, isAuth, isAdmin} = require("../controllers/auth");

router.post('/price/:userId', requireSignin, isAuth, isAdmin, create);
router.get("/price/:priceId", read);


router.put('/price/:priceId/:userId', requireSignin, isAuth, isAdmin, update);

router.get('/price/list/:userId', requireSignin, isAuth, isAdmin, list);
router.get('/price/security', listSecurity);
router.get('/price/eod/upload/:fileId', vwap);

router.post('/price/file/upload/:userId', requireSignin, isAuth, isAdmin, fileUpload);
router.get('/price/file/list/:userId', requireSignin, isAuth, isAdmin, fileList);
router.get('/price/file/:fileId', file);
router.put('/price/file/upload/:fileId/:userId', requireSignin, isAuth, isAdmin, updateFileUpload);
router.delete("/price/file/upload/:fileId/:userId", requireSignin, isAdmin, isAuth, remove);
router.get("/price/file/upload/:fileId", eodread);
router.get("/price/eod/delete/:userId",requireSignin, isAdmin, isAuth, eodDelete);


router.param('userId', userById);
router.param('priceId', priceById);
router.param('fileId', fileById);


module.exports = router;
