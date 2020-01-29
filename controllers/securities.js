const mysql = require('mysql');
const db = require('../models/mysql')
const db2 = require('../models/mysql2')
const datetime = require('node-datetime');


exports.symbols = (req, res) => {
   

    let sql = "SELECT `COL 11` as symbol,  `COL 3` as securityName  FROM security_to_traded"
    let query = db.query(sql, (err, results) => {
        if (err || !results) {
            return res.status(400).json({
                error: 'not found'
            });
        }else{
            return res.json(results)
        }
    });
    
};


exports.secSymById = (req, res, next, id) => {
    let sql = "SELECT * FROM `market_activity_sheet` WHERE `SYMBOL`=? ORDER BY DATE ASC ";
    let query = db.query(sql, [id], (err, results) => {
        if (err || !results) {
            return res.status(400).json({
                error: 'not found'
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
    let sql = "SELECT `Date`, `Security`, `Issued Shares`*`Close Price` as mcap  FROM `general_market_summary` WHERE `Security`=? ORDER BY Date DESC LIMIT 1";
    let query = db.query(sql, [id], (err, results) => {
        if (err || !results) {
            return res.status(400).json({
                error: 'not found'
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
    let sql = "SELECT `SYMBOL`, SUM(`DEALS`) as sumOfVolume FROM `market_activity_sheet` WHERE `SYMBOL`=?";
    let query = db.query(sql, [id], (err, results) => {
        if (err || !results) {
            return res.status(400).json({
                error: 'not found'
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
    let sql = "SELECT `SYMBOL`, SUM(`VOLUME`) as sumOfDeals FROM `market_activity_sheet` WHERE `SYMBOL`=?";
    let query = db.query(sql, [id], (err, results) => {
        if (err || !results) {
            return res.status(400).json({
                error: 'not found'
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
    let sql = "SELECT * FROM `market_snapshot` WHERE `present_date`=?";
    let query = db.query(sql, id, (err, results) => {
      
        if (err || !results) {
            return res.status(400).json({
                error: 'not found'
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
    let sql = "SELECT * FROM `market_snapshot` WHERE `present_date`=?";
    let query = db.query(sql, id, (err, results) => {
      
        if (err || !results) {
            return res.status(400).json({
                error: 'not found'
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