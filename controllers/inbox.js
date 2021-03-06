const mysql = require('mysql');
const db = require('../models/mysql')
const db2 = require('../models/mysql2')
const datetime = require('node-datetime');



exports.inboxDate = (req, res) => {
   
    let sql = "SELECT DISTINCT `Date` FROM `general_market_summary` ORDER BY Date DESC LIMIT 7";
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



exports.dateId = (req, res, next, id) => {
    let sql = "SELECT Date, `Security Name` as securityName ,`Security`,`Open Price` as open,`Close Price` as close,`52 Week High Price` I52WH,`52 Week Low Price` as I52WL FROM `general_market_summary` WHERE `Date`=?";
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

exports.getInbox = (req, res) => {
    return res.json(req.security);
    next();
};


exports.dateId2 = (req, res, next, id) => {
    let date1 = req.params.date2
    let date2 = req.params.date3
    let sql = "SELECT market_activity_sheet.SECURITY, market_activity_sheet.SYMBOL, market_activity_sheet.CLOSE_PRICE, market_activity_sheet.DEALS, market_activity_sheet.VOLUME, market_activity_sheet.VALUE , general_market_summary.`Ref Price` as refprice FROM `market_activity_sheet` INNER JOIN security_to_traded ON market_activity_sheet.SYMBOL=security_to_traded.`COL 11` INNER JOIN general_market_summary ON security_to_traded.`COL 11` = general_market_summary.Security WHERE market_activity_sheet.`DATE`=? AND general_market_summary.Date=? ";
    let query = db.query(sql, [date1,date2], (err, results) => {
        if (err || !results) {
            return res.status(400).json({
                error: 'not found'
            });
        }
        req.security = results;
        next();
    });
    
};

exports.getInboxTradeReport = (req, res) => {
    return res.json(req.security);
    next();
};