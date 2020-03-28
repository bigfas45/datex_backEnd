const mysql = require('mysql');
const db = require('../models/mysql')
const db2 = require('../models/mysql2')
const datetime = require('node-datetime');
var moment = require('moment');

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
