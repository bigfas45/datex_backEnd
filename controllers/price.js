const Price = require('../models/price');
const UploadFile = require('../models/uploadFile');

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


exports.fileById = (req, res, next, id) => {
  UploadFile.findById(id)

  .exec((err, file) => {
    if (err || !file) {
      return res.status(400).json({
        error: " file not found"
      });
    }
    req.file = file;
    next();
  });
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
  var filePath = req.file.file.path;
  var fileName = req.file.file.name;
  var contentType = req.file.file.contentType;
  let stream = fs.createReadStream(filePath);
  let myData = [];
  let csvStream = csv
      .parse()
      .on("data", function (data) {
          myData.push(data);
      })
      .on("end", function () {
      myData.shift();
     
          let query = 'INSERT INTO `data` (`id`, `EXTERNAL TICKET`, `TO MEMBER`, `TO ACCOUNT`, `TO REFERENCE`, `TO FREEZE ID`, `FROM MEMBER`, `FROM ACCOUNT`, `FROM REFERENCE`, `FROM FREEZE ID`, `SYMBOL`, `VOLUME`, `PRICE`, `TRADE DATE`, `TRADE TIME`, `SETTLEMENT DATE`, `TOTAL VALUE`, `INTEREST VALUE`, `TRADE STATUS`, `NEW EXTERNAL TICKET`, `AMEND TIME`, `st`)  VALUES ?';
          db.query(query, [myData], (error, response) => {
            console.log(error || response);
            res.json(response)
          });
     
       });
  
  stream.pipe(csvStream);

}


exports.fileUpload = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: "File could not be uploaded" });
    }
    // check for all fields
    const { name, file } = fields;

    if (!name) {
      return res.status(400).json({
        error: " All fields are required "
      });
    }

    let uploadFile = new UploadFile(fields);
    if (files.file) {
      console.log("FILES PHOTO", files.file);
      uploadFile.file.data = fs.readFileSync(files.file.path, "utf8");
      uploadFile.file.contentType = files.file.type;
      uploadFile.file.path = files.file.path;
      uploadFile.file.name = files.file.name;
    }

    uploadFile.save((err, result) => {
      if (err) {
        return res.status(400).json({ error: errorHandler(err) });
      }
      res.json(result);
    });
  });
};
  
