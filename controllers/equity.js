const mysql = require('mysql');
const db = require('../models/mysql')
const db2 = require('../models/mysql2')
const datetime = require('node-datetime');
var moment = require('moment');


exports.equity = (req, res) => {
   
    let sql = "SELECT * FROM `market_activity_sheet` ORDER BY DATE DESC";
    let query = db.query(sql, (err, results) => {
        if (err || !results) {
            return res.status(400).json({
                error: 'not found'
            });
        }else{
            return res.json(results);
        }
    });
    
};



exports.priceList = (req, res) => {
   
    let sql = "SELECT `Security`,`Ref Price` as RefPrice,`Date`, `Bid Depth` as BidDepth,`Bid Price` as BidPrice, `Offer Price` as OfferPrice, `Offer Depth` as OfferDepth, `Close Price` as ClosePrice, `52 Week High Price` as T52WeekHighPrice, `52 Week Low Price` as T52WeekLowPrice FROM general_market_summary WHERE Date > curdate() - interval (dayofmonth(curdate()) - 1) day - interval 48 month ORDER BY DATE DESC ";
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


exports.dateByDate1 = (req, res, next, date ) => {
    let date1 = req.params.date1
    let date2 = req.params.date2

    console.log("date1" , date1);
    console.log("date2" , date2);

    
    
let sql = "SELECT `DATE`,`SECURITY`,`SYMBOL`,`CLOSE_PRICE`,SUM(`DEALS`) as sumDeals,SUM(`VOLUME`) as sumVolume,SUM(`VALUE`) as sumValue,MAX(`CLOSE_PRICE`) as MAX_CLOSE_PRICE,MIN(`CLOSE_PRICE`) as MIN_CLOSE_PRICE FROM market_activity_sheet WHERE `DATE` BETWEEN ? AND ? GROUP BY `SECURITY`"
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

exports.monthlySummary = (req, res) => {
    return res.json(req.security);
    next();
};


exports.yearSummary = (req, res) => {
    var startYearDay = new Date(new Date().getFullYear(), 0, 1);
    var endYearDay = new Date(new Date().getFullYear(), 0, 366);

    var momentDate1 = moment(startYearDay)
    var momentDate2= moment(endYearDay)

    var start = (momentDate1.format("YYYY-MM-DD"));
    var end = (momentDate2.format("YYYY-MM-DD"));

    console.log("start", start)
   



   
    let sql = "SELECT `DATE`,`SECURITY`,`SYMBOL`,`CLOSE_PRICE`,SUM(`DEALS`) as sumDeals,SUM(`VOLUME`) as sumVolume,SUM(`VALUE`) as sumValue,MAX(`CLOSE_PRICE`) as MAX_CLOSE_PRICE,MIN(`CLOSE_PRICE`) as MIN_CLOSE_PRICE FROM market_activity_sheet WHERE `DATE` BETWEEN ? AND ? GROUP BY `SECURITY`"
    let query = db.query(sql,[start,end], (err, results) => {
        if (err || !results) {
            return res.status(400).json({
                error: 'not found'
            });
        }else{
            return res.json(results)
        }
    });
    
};



exports.dateByDate1Y = (req, res, next, date ) => {
    let date1 = req.params.date1Y
    let date2 = req.params.date2Y

    console.log("date1" , date1);
    console.log("date2" , date2);

    
    
    let sql = "SELECT `DATE`,`SECURITY`,`SYMBOL`,`CLOSE_PRICE`,SUM(`DEALS`) as sumDeals,SUM(`VOLUME`) as sumVolume,SUM(`VALUE`) as sumValue,MAX(`CLOSE_PRICE`) as MAX_CLOSE_PRICE,MIN(`CLOSE_PRICE`) as MIN_CLOSE_PRICE FROM market_activity_sheet WHERE `DATE` BETWEEN ? AND ? GROUP BY `SECURITY`"
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

exports.yearSummaryY = (req, res) => {
    return res.json(req.security);
    next();
};




