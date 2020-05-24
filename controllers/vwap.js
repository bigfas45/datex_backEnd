const mysql = require('mysql');
const db = require('../models/mysql')
const db2 = require('../models/mysql2')
const datetime = require('node-datetime');
var moment = require('moment');
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const {errorHandler} = require('../hlepers/dbErrorHandler');



exports.getDailyEod = (req, res) => {
    var dt = datetime.create();
    dt.offsetInDays(0);
    var formatted = dt.format('Ymd');
    console.log(formatted);
    let sql = "SELECT `EXTERNAL TICKET` as externalTicker ,`TO MEMBER` as toMember, `TO ACCOUNT` as toAccount, `TO REFERENCE` as toReference, `TO FREEZE ID` as toFreezeId, `FROM MEMBER` as fromMember, `FROM ACCOUNT` as fromAccount, `FROM REFERENCE` as fromReference, `FROM FREEZE ID` as fromFreezeId, `SYMBOL` , `VOLUME`,`PRICE`,`TRADE DATE` as tradeDate, `TRADE TIME` as tradeTime, `SETTLEMENT DATE` as settlementDate, `TOTAL VALUE` as totalValue, `INTEREST VALUE` as interestValue, `TRADE STATUS`as tradeStatus, `NEW EXTERNAL TICKET` as newExternalTicket, `AMEND TIME` as AmendTime, `st` FROM `data2` WHERE `TRADE DATE` =?";
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


exports.getSecurityToTraded = (req, res) => {
    let sql = "SELECT security_to_traded.`COL 1` as id ,security_to_traded.`COL 3` as secName ,security_to_traded.`COL 11` as secSym, prices.closeprice , prices.refprice FROM `security_to_traded` INNER JOIN prices ON prices.security_code = security_to_traded.`COL 1`";

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




exports.secById = (req, res, next, id) => {
    var dt = datetime.create();
    dt.offsetInDays(0);
    var formatted = dt.format('Ymd');
    console.log(formatted);
    let sql = "SELECT data.`SYMBOL`,COUNT(*) as count,SUM(`VOLUME`) as volume ,(`PRICE`/10000) as price,SUM(`TOTAL VALUE`/10000) as value FROM data WHERE SYMBOL=? AND `TRADE DATE`=? GROUP BY data.`SYMBOL`"
    let query = db.query(sql, [id, formatted], (err, results) => {
        if (err || !results) {
            return res.status(400).json({
                error: 'not found'
            });
        }
        req.security = results;
        next();
    });
    
};

exports.secTrade = (req, res) => {
    return res.json(req.security);
    next();
};



exports.tradeSum = (req, res) => {
    var dt = datetime.create();
    dt.offsetInDays(0);
    var formatted = dt.format('Ymd');
    console.log(formatted);
    let sql = "SELECT COUNT(*) as count,SUM(`VOLUME`) as volume ,(`PRICE`/10000) as price,SUM(`TOTAL VALUE`/10000) as value FROM data WHERE `TRADE DATE`=? ";

    let query = db.query(sql, [formatted], (err, results) => {
        if (err || !results) {
            return res.status(400).json({
                error: 'not found'
            });
        }else{
            return res.json(results)
        }
    });
}



exports.uploadVwapPrice2 = (req, res) => {
    let sql = "SELECT security_to_traded.`COL 1` as id ,security_to_traded.`COL 3` as secName ,security_to_traded.`COL 11` as secSym, prices.closeprice , prices.refprice FROM `security_to_traded` INNER JOIN prices ON prices.security_code = security_to_traded.`COL 1`";

    let query = db.query(sql, (err, results) => {
        if (err || !results) {
            return res.status(400).json({
                error: 'not found'
            });
        }else{
            for (var j=0; j< results.length; j++){

                console.log(results[j].secSym)

                let symb = results[j].secSym
                
                let sql2 = "SELECT data.`SYMBOL`,COUNT(*) as count,SUM(`VOLUME`) as volume ,(`PRICE`/10000) as price,SUM(`TOTAL VALUE`/10000) as value FROM data WHERE SYMBOL=? AND `TRADE DATE`='20200515' GROUP BY data.`SYMBOL`";
            
                let query2 = db.query(sql2 , [symb] , (err2, results2) => {
                   
                    if (err2 || !results2) {
                        return res.status(400).json({
                            error: 'not found'
                        });
                    }else{
                       
                    }
                    console.log(res.json(results2));
                });
                
                   
            }

          


      
        }
    });
}



// exports.vwapPrice = (req, res, next, id) => {
//     let sql = "SELECT security_to_traded.`COL 1` as id ,security_to_traded.`COL 3` as secName ,security_to_traded.`COL 11` as secSym, prices.closeprice , prices.refprice FROM `security_to_traded` INNER JOIN prices ON prices.security_code = security_to_traded.`COL 1`";
//     let query = db.query(sql, (err, results) => {
//         if (err || !results) {
//             return res.status(400).json({
//                 error: 'not found'
//             });
//         }
//         req.vwap = results;
//         next();
//     });
// }


exports.uploadVwapPrice = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(400).json({ error: "File could not be uploaded" });
      }

      console.log(fields)

     

      

      
  
    
    });

};




