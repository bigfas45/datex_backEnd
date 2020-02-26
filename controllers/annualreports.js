const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const Annualreport = require("../models/annualreport");
const { errorHandler } = require("../hlepers/dbErrorHandler");

exports.reportById = (req, res, next, id) => {
  Annualreport.findById(id).exec((err, annualreport) => {
    if (err || !annualreport) {
      return res.status(400).json({
        error: " Report not found"
      });
    }
    req.annualreport = annualreport;
    next();
  });
};

exports.read = (req, res) => {
  req.annualreport.file = undefined;
  return res.json(req.annualreport);
};

exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: "File could not be uploaded" });
    }
    // check for all fields
    const { company, year, filename, security, file } = fields;

    if (!company || !year || !filename || !security) {
      return res.status(400).json({
        error: " All fields are required "
      });
    }

    let annualreport = new Annualreport(fields);
    if (files.file) {
      console.log("FILES PHOTO", files.file);
      annualreport.file.data = fs.readFileSync(files.file.path);
      annualreport.file.contentType = files.file.type;
    }

    annualreport.save((err, result) => {
      if (err) {
        return res.status(400).json({ error: errorHandler(err) });
      }
      res.json(result);
    });
  });
};

exports.remove = (req, res) => {
  let annualreport = req.annualreport;
  annualreport.remove((err, deletedReport) => {
    if (err) {
      return res.status(400).json({ error: errorHandler(err) });
    }
    res.json({
      message: "Report deleted succesfully"
    });
  });
};

exports.update = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: "File could not be uploaded" });
    }
    // check for all fields
    // const { company, year, filename, security, file } = fields;

    // if (!company || !year || !filename || !security) {
    //   return res.status(400).json({
    //     error: " All fields are required "
    //   });
    // }

    let annualreport = req.annualreport;
    annualreport = _.extend(annualreport, fields);

    if (files.file) {
      console.log("FILES PHOTO", files.file);
      annualreport.file.data = fs.readFileSync(files.file.path);
      annualreport.file.contentType = files.file.type;
    }

    annualreport.save((err, result) => {
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
  let limit = req.query.limit ? parseInt(req.query.limit) : 100;

  Annualreport.find()
    .select("-file")
    .populate("security")
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, reports) => {
      if (err) {
        return res.status(400).json({
          error: "Report not found"
        });
      }
      res.json(reports);
    });
};

/**
 * it will find the annual report nased on the req report security
 */


exports.listRelated = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 100;

  Annualreport.find({_id: {$ne: req.annualreport}, security: req.annualreport.security})
  .limit(limit)
  .populate('category', '_id, symbol')
  .exec((err, report) => {
    if (err) {
      return res.status(400).json({
        error: "Report not found"
      });
    }
    res.json(report)
  })
}


exports.listSecurity = (req, res) => {
  Annualreport.distinct("security", {}, (err, report) => {
    if (err) {
      return res.status(400).json({
        error: "Report not found"
      });
    }
    res.json(report);
  });
};


exports.file = (req, res, next) => {
  if(req.annualreport.file.data){
    res.set('Content-Type', req.annualreport.file.contentType)
    return res.send(req.annualreport.file.data);
  }
  next();
};

