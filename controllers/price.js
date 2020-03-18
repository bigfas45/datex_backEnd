const Price = require('../models/price');
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const {errorHandler} = require('../hlepers/dbErrorHandler');
const db = require("../models/mysql");
const csv = require('fast-csv');




exports.priceById = (req, res, next, id) => {
    Price.findById(id)
    .populate("security")
    .exec((err, price) => {
      if (err || !price) {
        return res.status(400).json({
          error: " Price not found"
        });
      }
      req.price = price;
      next();
    });
  };

  exports.read = (req, res)  => {
    return res.json(req.price);
    next();
};


exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields) => {
     
      // check for all fields
      const {security, Ref_Price,Open_Price } = fields;
      if (!security || !Ref_Price || !Open_Price) {
        return res.status(400).json({
          error: " All fields are required "
        });
      }
      let price = new Price(fields);
      price.save((err, result) => {
        if (err) {
          return res.status(400).json({ error: errorHandler(err) });
        }
        res.json(result);
      });
    });
  };
  


  exports.update = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields) => {
    
      let price = req.price;
      price = _.extend(price, fields);
  
    
  
      price.save((err, result) => {
        if (err) {
          return res.status(400).json({ error: errorHandler(err) });
        }
        res.json(result);
      });
    });
  };


  exports.list = (req, res) => {
    let order = req.query.order ? req.query.order : "asc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  
    Price.find()
      .populate("security")
      .sort([[sortBy, order]])
      .exec((err, price) => {
        if (err) {
          return res.status(400).json({
            err
          });
        }
        res.json(price);
      });
  };




  exports.listSecurity = (req, res) => {
    Price.distinct("security", {}, (err, security)  => {
        if (err) {
            return res.status(400).json({
                error: "security not found"
            });
        }
        res.json(security)
    })
}


exports.vwap = (req, res) => {

  let stream = fs.createReadStream("controllers/W_security.csv");
  let myData = [];
  let csvStream = csv
      .parse()
      .on("data", function (data) {
          myData.push(data);
      })
      .on("end", function () {
      myData.shift();
     
          let query = 'INSERT INTO `W_security` (`symbol`, `trade_value`, `market_capitization`, `isin`, `par`, `instrument_type`, `symbol_code`, `no_of_dematerlisation`, `sector`, `phone`, `address`, `emails`, `registrar`, `board_members`, `website`) VALUES ?';
          db.query(query, [myData], (error, response) => {
            console.log(error || response);
            res.json(response)
          });
     
       });
  
  stream.pipe(csvStream);

}

  
