const mysql = require('mysql');
const db = require('../models/mysql')
const db2 = require('../models/mysql2')
const datetime = require('node-datetime');




exports.ticker = (req, res) => {
    let date2 = new Date().getHours();
  if (date2 >= 1 && date2 < 16  ) {
    var dt = datetime.create();
    dt.offsetInDays(-1);
    var formatted = dt.format('Y-m-d');
    console.log(formatted)
  }else{
    var dt = datetime.create();
    dt.offsetInDays(0);
    var formatted = dt.format('Y-m-d');
    console.log(formatted)
  }
    let sql = "SELECT Date, `Security`,`Close Price` as close,`Change Percent` as percent FROM `general_market_summary` WHERE date = ? ";
    let query = db.query(sql, [formatted], (err, results) => {
        if (err || !results) {
            return res.status(400).json({
                error: ' not found'
            });
        }else{
            return res.json(results)
        }
    });
    
};


exports.MarketIndexT = (req, res) => {
    let sql = "SELECT * FROM market_snapshot ORDER BY present_date DESC Limit 1 ";
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


exports.MarketIndexY = (req, res) => {
    let sql = "SELECT * FROM market_snapshot ORDER BY present_date DESC Limit 1,1 ";
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


exports.liveTrade = (req, res) => {
    var dt = datetime.create();
    dt.offsetInDays(0);
    var formatted = dt.format('Ymd');
    console.log(formatted)
    let sql = "SELECT COUNT(*) as tTrade,SUM(`Qty`) as volume ,SUM(`Qty`*`Price`) as value FROM market_report WHERE `Date`= ?";
    let query = db2.query(sql,[formatted], (err, results) => {
        if (err || !results) {
            return res.status(400).json({
                error: 'not found'
            });
        }else{
            return res.json(results)
        }
    });
    
};


exports.participantsLogin = (req, res) => {
    let sql = "SELECT COUNT(*) as tCount FROM dealer_users WHERE `messages`='Logged In'";
    let query = db2.query(sql, (err, results) => {
        if (err || !results) {
            return res.status(400).json({
                error: 'not found'
            });
        }else{
            return res.json(results)
        }
    });
    
};


exports.usi = (req,res) => {
    var array = [];
    let sql = "SELECT * FROM market_snapshot ";
    let query = db.query(sql, (err, results) => {
        if (err || !results) {
            return res.status(400).json({
                error: 'usi not found'
            });
        }else{
            return res.json(results)

         
          

    
       
        }
    });
}



