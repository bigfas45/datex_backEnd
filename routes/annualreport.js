const express = require("express");
const router = express.Router();

const { create, reportById, read, remove, update } = require("../controllers/annualreports");
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
  

router.param("userId", userById);
router.param("reportId", reportById);

module.exports = router;
