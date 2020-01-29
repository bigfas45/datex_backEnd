const mysql = require('mysql');
const db = require('../models/mysql')
const db2 = require('../models/mysql2')
const datetime = require('node-datetime');


exports.liveTrade = (req, res) => {
    var dt = datetime.create();
    dt.offsetInDays(0);
    var formatted = dt.format('Ymd');
    console.log(formatted);
    let sql = "SELECT market_report.`Security`  ,COUNT(*) as count ,SUM(`Qty`) totalQty,(`Price`),SUM(`Qty`*`Price`) as value,MAX(`Price`) as highPrice ,MIN(`Price`) as lowPrice,MAX(`Qty`) highestQty,MIN(`Qty`) as lowestQty, security_to_traded.`COL 11` , security_to_traded.`COL 1`, prices.security_code, prices.refprice, prices.closeprice FROM market_report INNER JOIN security_to_traded ON security_to_traded.`COL 11` = market_report.`Security` INNER JOIN prices ON security_to_traded.`COL 1` = prices.security_code WHERE  market_report.`Date`=? GROUP BY market_report.`Security`";
    let query = db.query(sql, [formatted], (err, results) => {
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
    let sql = "SELECT * FROM security_to_traded WHERE `COL 11`=?";
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

exports.security_to_traded = (req, res) => {
    return res.json(req.security);
    next();
};


exports.secById = (req, res, next, id) => {
    let sql = "SELECT security_to_traded.`COL 11` , security_to_traded.`COL 1` , prices.security_code , prices.closeprice, prices.refprice FROM security_to_traded  INNER JOIN prices ON security_to_traded.`COL 1` = prices.security_code WHERE security_to_traded.`COL 11`=? GROUP BY security_to_traded.`COL 11` ASC";
    let query = db.query(sql, [id], (err, results) => {
        if (err || !results) {
            return res.status(400).json({
                error: 'not found'
            });
        }
        req.vwap = results;
        next();
    });
    
};
exports.vwap = (req, res) => {
    return res.json(req.vwap);
    next();
}

exports.secVwap = (req, res) => {
    let sql = "SELECT security_to_traded.`COL 11` , security_to_traded.`COL 1` , prices.security_code , prices.closeprice, prices.refprice FROM security_to_traded INNER JOIN prices ON security_to_traded.`COL 1` = prices.security_code GROUP BY security_to_traded.`COL 11` ASC";
    let query = db.query(sql, (err, results) => {
        if (err || !results) {
            return res.status(400).json({
                error: 'not found'
            });
        }else{
            return res.json(results)
        }
    });
}

