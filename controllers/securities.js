const mysql = require('mysql');
const db = require('../models/mysql');
const db2 = require('../models/mysql2');
const datetime = require('node-datetime');

exports.symbols = (req, res) => {
  let sql =
    'SELECT `COL 11` as symbol,  `COL 3` as securityName  FROM security_to_traded';
  let query = db.query(sql, (err, results) => {
    if (err || !results) {
      return res.status(400).json({
        error: 'not found',
      });
    } else {
      return res.json(results);
    }
  });
};

exports.secSymById = (req, res, next, id) => {
  let sql =
    'SELECT * FROM `market_activity_sheet` WHERE `SYMBOL`=? ORDER BY DATE ASC ';
  let query = db.query(sql, [id], (err, results) => {
    if (err || !results) {
      return res.status(400).json({
        error: 'not found',
      });
    }
    req.security = results;
    next();
  });
};

exports.securityData = (req, res) => {
  return res.json(req.security);
  next();
};

exports.secSymByIdMcap = (req, res, next, id) => {
  let sql =
    'SELECT `Date`, `Security`, `Issued Shares`*`Close Price` as mcap  FROM `general_market_summary` WHERE `Security`=? ORDER BY Date DESC LIMIT 1';
  let query = db.query(sql, [id], (err, results) => {
    if (err || !results) {
      return res.status(400).json({
        error: 'not found',
      });
    }
    req.security = results;
    next();
  });
};

exports.securityMcap = (req, res) => {
  return res.json(req.security);
  next();
};

exports.secSymByIdTtrades = (req, res, next, id) => {
  let sql =
    'SELECT `SYMBOL`, SUM(`DEALS`) as sumOfVolume FROM `market_activity_sheet` WHERE `SYMBOL`=?';
  let query = db.query(sql, [id], (err, results) => {
    if (err || !results) {
      return res.status(400).json({
        error: 'not found',
      });
    }
    req.security = results;
    next();
  });
};

exports.totalTrade = (req, res) => {
  return res.json(req.security);
  next();
};

exports.secDealsById = (req, res, next, id) => {
  let sql =
    'SELECT `SYMBOL`, SUM(`VOLUME`) as sumOfDeals FROM `market_activity_sheet` WHERE `SYMBOL`=?';
  let query = db.query(sql, [id], (err, results) => {
    if (err || !results) {
      return res.status(400).json({
        error: 'not found',
      });
    }
    req.security = results;
    next();
  });
};

exports.totalDeals = (req, res) => {
  return res.json(req.security);
  next();
};

exports.performanceStartByDate = (req, res, next, id) => {
  let sql = 'SELECT * FROM `market_snapshot` WHERE `present_date`=?';
  let query = db.query(sql, id, (err, results) => {
    if (err || !results) {
      return res.status(400).json({
        error: 'not found',
      });
    }
    req.security = results;
    next();
  });
};

exports.performanceStart = (req, res) => {
  return res.json(req.security);
  next();
};

exports.performanceEndByDate = (req, res, next, id) => {
  let sql = 'SELECT * FROM `market_snapshot` WHERE `present_date`=?';
  let query = db.query(sql, id, (err, results) => {
    if (err || !results) {
      return res.status(400).json({
        error: 'not found',
      });
    }
    req.security = results;
    next();
  });
};

exports.performanceEnd = (req, res) => {
  return res.json(req.security);
  next();
};

exports.performanceStartByDateSecurity = (req, res, next, id) => {
  let sql =
    "SELECT general_market_summary.Date, general_market_summary.Security, general_market_summary.`Open Price` as openprice , general_market_summary.`Close Price` as closeprice, general_market_summary_2.Date, general_market_summary_2.Security, general_market_summary_2.`Open Price` as openprice , general_market_summary_2.`Close Price` as closeprice, market_activity_sheet.SYMBOL , SUM(market_activity_sheet.VOLUME) FROM `general_market_summary` LEFT JOIN general_market_summary_2 ON general_market_summary.Security = general_market_summary_2.Security RIGHT JOIN market_activity_sheet ON market_activity_sheet.SYMBOL = general_market_summary.Security WHERE general_market_summary.Date='2019-07-01' AND general_market_summary_2.Date = '2019-09-30' AND market_activity_sheet.DATE BETWEEN '2019-07-01' AND '2019-09-30' GROUP By general_market_summary.Security ORDER BY general_market_summary.Security";
  let query = db.query(sql, id, (err, results) => {
    if (err || !results) {
      return res.status(400).json({
        error: 'not found',
      });
    }
    req.security = results;
    next();
  });
};

exports.performanceStartSecurity = (req, res) => {
  return res.json(req.security);
  next();
};

exports.performanceEndByDateSecurity = (req, res, next, date) => {
  let date1 = req.params.performanceEndDateSecurity;
  let date2 = req.params.performanceEndDateSecurity2;

  let sql =
    'SELECT general_market_summary.Date as Date1, general_market_summary.Security, general_market_summary.`Security Name` as security_name, general_market_summary.`Open Price` as openprice , general_market_summary.`Close Price` as closeprice, general_market_summary_2.Date, general_market_summary_2.Security, general_market_summary_2.`Open Price` as openprice2 , general_market_summary_2.`Close Price` as closeprice2, market_activity_sheet.SYMBOL as symbol2 , SUM(market_activity_sheet.VOLUME) as volume FROM `general_market_summary` LEFT JOIN general_market_summary_2 ON general_market_summary.Security = general_market_summary_2.Security RIGHT JOIN market_activity_sheet ON market_activity_sheet.SYMBOL = general_market_summary.Security WHERE general_market_summary.Date=? AND general_market_summary_2.Date =? AND market_activity_sheet.DATE  BETWEEN ? AND ? GROUP By general_market_summary.Security ORDER BY general_market_summary.Security';
  let query = db.query(sql, [date1, date2, date1, date2], (err, results) => {
    if (err || !results) {
      return res.status(400).json({
        error: 'not found',
      });
    }
    req.security = results;
    next();
  });
};
exports.performanceEndSecurity = (req, res) => {
  return res.json(req.security);
  next();
};

exports.totalBidsById = (req, res, next, id) => {
  let sql =
    'SELECT `symbol`, `bidprice`, `volume` FROM `bids` WHERE symbol=? ORDER BY bidprice DESC';
  let query = db2.query(sql, [id], (err, results) => {
    if (err || !results) {
      return res.status(400).json({
        error: 'not found',
      });
    }
    req.bids = results;

    next();
  });
};

exports.totalBids = (req, res) => {
  return res.json(req.bids);
  next();
};

exports.totalOffersById = (req, res, next, id) => {
  let sql =
    'SELECT `symbol`,`askprice`,`volume` FROM `offers` WHERE `symbol`=? ORDER BY askprice ASC';
  let query = db2.query(sql, [id], (err, results) => {
    if (err || !results) {
      return res.status(400).json({
        error: 'not found',
      });
    }
    req.offers = results;
    next();
  });
};

exports.totalOffers = (req, res) => {
  return res.json(req.offers);
  next();
};

exports.companies = (req, res) => {
  let date = '2020-10-21';
  var dt = datetime.create();
  dt.offsetInDays(-1);
  var formatted = dt.format('Y-m-d');
  var formattedY = dt.format('Y');
  console.log(formattedY);
  let sql =
    'SELECT companies.c_name, companies.`c_symbol`,companies.`norminal_value`,companies.`issued_share_cap`, general_market_summary.`Close Price` as Close_Price , general_market_summary.`52 Week High Price` as HighPrice , general_market_summary.`52 Week Low Price` as LowPrice  FROM `companies` INNER JOIN general_market_summary ON general_market_summary.Security = companies.c_symbol  WHERE general_market_summary.Date=?  GROUP BY companies.c_symbol';
  let query = db.query(sql, [formatted, formattedY], (err, results) => {
    if (err || !results) {
      return res.status(400).json({
        error: 'not found',
      });
    } else {
      return res.json(results);
    }
  });
};

exports.totalCompaniesVolume = (req, res, next, id) => {
  let date = '2020-10-21';
  var dt = datetime.create();
  var formattedY = dt.format('Y');
  console.log(formattedY);
  console.log(id);
  let sql =
    'SELECT `SYMBOL`, SUM(`VOLUME`) as VOLUME , SUM(`DEALS`) as DEALS, SUM(VALUE) as VALUE  FROM `market_activity_sheet` WHERE `SYMBOL`=? AND `DATE`>=?';
  let query = db.query(sql, [id, formattedY], (err, results) => {
    if (err || !results) {
      return res.status(400).json({
        error: 'not found...',
      });
    }
    req.offers = results;
    next();
  });
};

exports.totalVolume = (req, res) => {
  return res.json(req.offers);
  next();
};
