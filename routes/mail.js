const express = require('express');
const router = express.Router();


const {create, list,file,mailById, mailtest,sendEmailToAllMarketParticiapnt,update,read} = require('../controllers/mail');
const { userById } = require("../controllers/user");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
router.post('/mail/:userId', requireSignin, isAuth, isAdmin ,create);
router.get('/mail/list', list);
router.get('/mail/file/:mailId', file);
router.get('/mail/mailtest/:mailId/:userId', requireSignin,isAuth, mailtest);
router.get('/mail/sendEmailToAllMarketParticiapnt/:mailId/:userId', requireSignin,isAuth, sendEmailToAllMarketParticiapnt);
router.put(
    "/mail/:mailId/:userId",
    requireSignin,
    isAdmin,
    isAuth,
    update
  );

  router.get("/mail/:mailId", read);



router.param("userId", userById);
router.param("mailId", mailById);
module.exports = router;sendEmailToAllMarketParticiapnt