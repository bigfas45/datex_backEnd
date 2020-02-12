const mysql = require('mysql');
const db = require('../models/mysql')
const db2 = require('../models/mysql2')
const datetime = require('node-datetime');
var moment = require('moment');


exports.brokers = (req, res) => {
    var startYearDay = new Date(new Date().getFullYear(), 0, 1);
    var momentDate1 = moment(startYearDay)
    var start = (momentDate1.format("YYYY"));
    let sql = "SELECT dealing_member.`member_name`,dealing_member.`member_code` ,data1.`TO MEMBER`,COUNT(*) toCount, SUM(data1.`TOTAL VALUE`/10000) as toValue, SUM(data1.`VOLUME`) as toVolume FROM data as data1 INNER JOIN dealing_member ON data1.`TO MEMBER`= dealing_member.member_code WHERE data1.`TRADE DATE` >= ? GROUP BY data1.`TO MEMBER`";
    let query = db.query(sql, [start], (err, results) => {
        if (err || !results) {
            return res.status(400).json({
                error: 'not found'
            });
        }else{
            return res.json(results);
        }
    });
};

exports.brokers2 = (req, res) => {
    var startYearDay = new Date(new Date().getFullYear(), 0, 1);
    var momentDate1 = moment(startYearDay)
    var start = (momentDate1.format("YYYY"));
    let sql = "SELECT dealing_member.`member_name` as from_member_name,dealing_member.`member_code` ,data1.`FROM MEMBER`,COUNT(*) fromCount, SUM(data1.`TOTAL VALUE`/10000) as fromValue, SUM(data1.`VOLUME`) as fromVolume FROM data as data1 INNER JOIN dealing_member ON data1.`FROM MEMBER`= dealing_member.member_code WHERE data1.`TRADE DATE` >= ? GROUP BY data1.`FROM MEMBER` ";
    let query = db.query(sql, [start], (err, results) => {
        if (err || !results) {
            return res.status(400).json({
                error: 'not found'
            });
        }else{
            return res.json(results);
        }
    });
};

exports.dateTopTenByDate1 = (req, res, next ) => {
    let date1 = req.params.dateTopTen
    let date2 = req.params.dateTopTen1
    console.log("date1" , date1);
    console.log("date2" , date2);
    
let sql = "SELECT data.`TO MEMBER` toMember,COUNT(*) count ,SUM(`TOTAL VALUE`/10000) AS y,SUM(`VOLUME`) as volume ,dealing_member.member_name  FROM data INNER JOIN dealing_member ON data.`TO MEMBER`= dealing_member.member_code WHERE `TRADE DATE` BETWEEN ? AND ? GROUP BY data.`TO MEMBER` ORDER BY y DESC"
    let query = db.query(sql, [date1 , date2], (err, results) => {
      
        if (err || !results) {
            return res.status(400).json({
                error: 'not found'
            });
        }

            
        req.security = results;
      
    next();
        
    });
};

exports.brokersTopTen = (req, res) => {
    return res.json(req.security);
    next();
};




exports.codeById = (req, res, next, code ) => {
    var startYearDay = new Date(new Date().getFullYear(), 0, 1);
    var momentDate1 = moment(startYearDay)
    var date = (momentDate1.format("YYYY"));
    let sql = " SELECT data.`TO MEMBER` as tomember ,(`TOTAL VALUE`/10000) as value ,(`VOLUME`),dealing_member.member_name,(`PRICE`/10000) as price,`TRADE DATE` as date,`SYMBOL`,`TO ACCOUNT`,`FROM ACCOUNT`,`FROM MEMBER` as frommemebr FROM data  INNER JOIN dealing_member ON data.`TO MEMBER`= dealing_member.member_code WHERE `TRADE DATE` >= ? AND  `TO MEMBER` =? ORDER BY `data`.`VOLUME` ASC";
    let query = db.query(sql, [date , code], (err, results) => {
      
        if (err || !results) {
            return res.status(400).json({
                error: 'not found'
            });
        }

            
        req.security = results;
      
    next();
        
    });
};

exports.brokersTrades = (req, res) => {
    return res.json(req.security);
    next();
};



exports.codeSellById = (req, res, next, codeSell ) => {
    var startYearDay = new Date(new Date().getFullYear(), 0, 1);
    var momentDate1 = moment(startYearDay)
    var date = (momentDate1.format("YYYY"));
    let sql = "SELECT data.`FROM MEMBER` as frommember,(`TOTAL VALUE`/10000) as value,(`VOLUME`),dealing_member.member_name,(`PRICE`/10000) as price,`TRADE DATE` as date,`SYMBOL`,`TO ACCOUNT`,`TO MEMBER` as tomember  FROM data INNER JOIN dealing_member ON data.`FROM MEMBER`= dealing_member.member_code WHERE `TRADE DATE` >= ? AND  `FROM MEMBER` =?  ORDER BY `data`.`VOLUME` ASC";
    let query = db.query(sql, [date , codeSell], (err, results) => {
      
        if (err || !results) {
            return res.status(400).json({
                error: 'not found'
            });
        }

            
        req.security = results;
      
    next();
        
    });
};

exports.brokersTradeSell = (req, res) => {
    return res.json(req.security);
    next();
};


exports.codeDailyById = (req, res, next, codeSell ) => {
    var startYearDay = new Date(new Date());
    var momentDate1 = moment(startYearDay)
    var date = (momentDate1.format("YYYYMMDD"));
    console.log(date);
    let sql = "SELECT data.`TO MEMBER` as tomember,(`TOTAL VALUE`/10000) value,(`VOLUME`),dealing_member.member_name,(`PRICE`/10000) as price,`TRADE DATE` as date,`SYMBOL`,`TO ACCOUNT`,`FROM ACCOUNT`,`FROM MEMBER` as frommeber,`TRADE TIME` FROM data  INNER JOIN dealing_member ON data.`TO MEMBER`= dealing_member.member_code WHERE `TRADE DATE` = ? AND  `TO MEMBER` = ?  ORDER BY `data`.`VOLUME` ASC";
    let query = db.query(sql, [codeSell], (err, results) => {
      
        if (err || !results) {
            return res.status(400).json({
                error: 'not found'
            });
        }

            
        req.security = results;
      
    next();
        
    });
};

exports.brokersTradeDaily = (req, res) => {
    return res.json(req.security);
    next();
};

