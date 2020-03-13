const express = require("express");
const router = express.Router();

const { create, reportById, read, remove, update , list, listRelated, listSecurity, file} = require("../controllers/annualreports");
const { userById } = require("../controllers/user");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");

router.get("/nasd/annualreport/:reportId", read);

router.post(
  "/nasd/annualreport/create/:userId",
  requireSignin,
  isAdmin,
  isAuth,
  create
);
router.delete(
  "/nasd/annualreport/:reportId/:userId",
  requireSignin,
  isAdmin,
  isAuth,
  remove
);
router.put(
    "/nasd/annualreport/:reportId/:userId",
    requireSignin,
    isAdmin,
    isAuth,
    update
  );
  

  router.get('/nasd/annualreport', list);
  router.get('/nasd/annualreport/related/:reportId', listRelated);
  router.get("/nasd/annualreport/security", listSecurity);
  router.get('/nasd/annualreport/report/:reportId', file);

router.param("userId", userById);
router.param("reportId", reportById);

module.exports = router;
